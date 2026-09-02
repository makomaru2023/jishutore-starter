"""報酬チェックの出典を一次資料に当て直す機械検査（月次点検用）。

`checklists/weekly-ops.md` の「報酬チェックの改定確認」で毎月回す。
制度の新規発出が無い月でも、出典そのものは腐るのでここだけは毎月見る。

見るのは3つ。

  1. --links   出典URLが生きているか（HTTPステータス）
               ★訂正版が出ると旧URLは消える。2026-08に10か所が死んでいた
  2. --pages   出典の「PDF p.◯」が本当にその条文のページか
               ★2026-09に9項目のずれを検出。中身は正しいのに指し先が隣の区分番号だった
  3. --numbers units の点数・単位数が出典本文に実在するか
               ★「AIの記憶で点数を書かない」の機械側の担保

使い方:
    python3 scripts/fee-checks/kensa-sources.py            # 3つとも
    python3 scripts/fee-checks/kensa-sources.py --links    # 個別に回す
    python3 scripts/fee-checks/kensa-sources.py --pages --numbers

必要なもの: pypdf（`pip3 install --user pypdf`）。
ダウンロードした一次資料は `.fee-source-cache/` に貯める（gitignore済み・消してよい）。
初回は数百MBぶん取りに行くので5〜10分かかる。2回目からはキャッシュを使う。

⚠ 出るのは「候補」であって「誤り」ではない。1件ずつ原本を開いて確かめること。
   よくある偽陽性は README を参照。
"""

import argparse
import glob
import html as htmllib
import json
import os
import pickle
import re
import subprocess
import sys
import unicodedata

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(REPO, "src", "data", "fee-items")
CACHE = os.path.join(REPO, ".fee-source-cache")

# ページ番号つきで参照している資料だけ落とす（HTMLの溶け込み版は別扱い）
PDF_RE = re.compile(r"^https://www\.mhlw\.go\.jp/.+/([^/]+\.pdf)$")
TDOC_RE = re.compile(r"/web/t_doc\?dataId=([0-9a-z]+)[^\"]*pageNo=(\d+)")


def norm(s):
    """全角・空白・ハイフンの揺れを潰す。原本と自作テキストを突き合わせるための前処理。"""
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"[\s　]", "", s)
    for ch in "−－‐―":
        s = s.replace(ch, "-")
    return s


def load_items():
    out = []
    for f in sorted(glob.glob(os.path.join(DATA_DIR, "*.json"))):
        if "conflicts" in os.path.basename(f):
            continue
        d = json.load(open(f, encoding="utf-8"))
        for it in d["items"]:
            out.append((os.path.basename(f)[:-5], it))
    return out


def fetch(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return True
    os.makedirs(os.path.dirname(path), exist_ok=True)
    r = subprocess.run(["curl", "-s", "--max-time", "180", "-o", path, url])
    return r.returncode == 0 and os.path.exists(path) and os.path.getsize(path) > 0


_pages_cache = {}


def pdf_pages(fname, url):
    """PDFを1ページずつテキスト化して返す。抽出に失敗したページは空文字にする。"""
    if fname in _pages_cache:
        return _pages_cache[fname]
    pkl = os.path.join(CACHE, fname + ".pkl")
    if os.path.exists(pkl):
        _pages_cache[fname] = pickle.load(open(pkl, "rb"))
        return _pages_cache[fname]
    pdf = os.path.join(CACHE, fname)
    if not fetch(url, pdf):
        return []
    import pypdf

    reader = pypdf.PdfReader(pdf)
    out = []
    for p in reader.pages:
        try:
            out.append(norm(p.extract_text() or ""))
        except Exception:
            # ★フォント定義が壊れているページがある（様式PDFで実際に出る）。
            #   そのページは空にして先へ進む。ページ番号がずれるほうが困る。
            out.append("")
    pickle.dump(out, open(pkl, "wb"))
    _pages_cache[fname] = out
    return out


_tdoc_cache = {}


def tdoc_text(url):
    m = TDOC_RE.search(url)
    if not m:
        return ""
    key = f"tdoc_{m.group(1)}_{m.group(2)}.html"
    if key in _tdoc_cache:
        return _tdoc_cache[key]
    path = os.path.join(CACHE, key)
    if not fetch(url, path):
        return ""
    raw = open(path, encoding="utf-8", errors="replace").read()
    text = norm(htmllib.unescape(re.sub(r"<[^>]+>", " ", raw)))
    _tdoc_cache[key] = text
    return text


def all_source_urls():
    urls = {}
    for _, it in load_items():
        for s in it.get("sources", []):
            urls.setdefault(s["url"], 0)
            urls[s["url"]] += 1
    return urls


def check_links():
    urls = all_source_urls()
    print(f"=== 検査1：出典URLの生死（{len(urls)}本）===")
    ng = 0
    for u, n in sorted(urls.items()):
        code = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "-I", "--max-time", "30", u],
            capture_output=True,
            text=True,
        ).stdout.strip()
        if code != "200":
            ng += 1
            print(f"  ★{code} {u}（{n}か所で参照）")
    print(f"★死んでいるURL: {ng} 件" + ("" if ng else "（すべて生存）"))
    return ng


def parse_pages(spec):
    """「52・106」「121-123」「508-509」などのページ指定を、実ページ番号の並びに開く。"""
    out = []
    for part in re.split(r"[・、,]", spec):
        mm = re.search(r"(\d+)\s*(?:[-–〜~]\s*(\d+))?", part)
        if not mm:
            continue
        a = int(mm.group(1))
        b = int(mm.group(2) or mm.group(1))
        out.extend(range(a, b + 1) if b >= a else [a])
    return sorted(dict.fromkeys(out))


def page_refs():
    """sources の page 文字列から「PDF p.◯-◯ + その直後の手がかり」を取り出す。"""
    for domain, it in load_items():
        for s in it.get("sources", []):
            m = PDF_RE.match(s.get("url", ""))
            if not m or not re.search(r"p\.?\s*\d", s.get("page", "") or ""):
                continue
            for seg in re.split(r"(?=PDF\s*p)", s["page"]):
                # ★「p.52・106」のように離れた2ページを1つの参照に書くことがある。
                #   最初の数字だけ見ると、後ろのページにある条文を見落として偽陽性になる。
                mm = re.search(r"p\.?\s*(\d+(?:\s*[-–〜~]\s*\d+)?(?:\s*[・、,]\s*\d+(?:\s*[-–〜~]\s*\d+)?)*)", seg)
                if not mm:
                    continue
                tail = seg[mm.end():]
                yield {
                    "domain": domain,
                    "id": it["id"],
                    "fname": m.group(1),
                    "url": s["url"],
                    "pages": parse_pages(mm.group(1)),
                    "spec": mm.group(1),
                    # 区分番号（A308-3・B001の10 等）と、4文字以上の日本語の塊を手がかりにする。
                    # ★norm() 済みなので英字はASCIIだけを見る。全角込みの広い文字クラスにすると
                    #   「・174」のような中黒＋数字まで区分番号として拾って偽陽性になる。
                    "kubun": re.findall(r"[A-Z][0-9]{3}(?:[-の][0-9]+)?", norm(tail)),
                    "words": [norm(w) for w in re.findall(r"[一-龥ァ-ヶ]{4,}", tail)],
                    "raw": seg.strip(),
                }


def check_pages():
    refs = list(page_refs())
    print(f"=== 検査2：出典ページの位置（{len(refs)}か所）===")
    miss = edge = 0
    for r in refs:
        pages = pdf_pages(r["fname"], r["url"])
        idx = [i for i in r["pages"] if 1 <= i <= len(pages)]
        if not idx:
            miss += 1
            print(f"  ★範囲外 {r['domain']}/{r['id']} {r['fname']} p.{r['spec']}（全{len(pages)}p）")
            continue
        anchors = r["kubun"] + r["words"]
        if not anchors:
            continue
        blob = "".join(pages[i - 1] for i in idx)
        hit_k = [k for k in r["kubun"] if k in blob]
        hit_w = [w for w in r["words"] if w in blob]
        if not hit_k and not hit_w:
            miss += 1
            print(f"  ★不一致 {r['domain']}/{r['id']} {r['fname']} p.{r['spec']} :: {r['raw'][:80]}")
            continue
        if len(idx) > 1:
            per = {i: sum(1 for a in anchors if a in pages[i - 1]) for i in idx}
            if per[idx[0]] == 0 or per[idx[-1]] == 0:
                edge += 1
                print(f"  ・範囲の端が空 {r['domain']}/{r['id']} {r['fname']} p.{r['spec']} {per} :: {r['raw'][:60]}")
    print(f"★指し先が見つからない: {miss} 件 ／ 範囲の端が空（要確認）: {edge} 件")
    return miss


def check_numbers():
    print("=== 検査3：点数・単位数が出典本文に実在するか ===")
    ng = 0
    for domain, it in load_items():
        corpus = ""
        unverifiable = []
        for s in it.get("sources", []):
            u = s.get("url", "")
            if "/web/t_doc" in u:
                corpus += tdoc_text(u)
            elif PDF_RE.match(u):
                corpus += "".join(pdf_pages(PDF_RE.match(u).group(1), u))
            else:
                unverifiable.append(u)
        text = " ".join(
            norm(x.get("condition", "") + x.get("value", "") + x.get("note", "")) for x in it.get("units", [])
        )
        nums = sorted(set(re.findall(r"[\d,]+(?:点|単位)", text)))
        flat = corpus.replace(",", "")
        missing = [n for n in nums if n.replace(",", "") not in flat]
        if missing:
            ng += 1
            tail = f"（本文で確認できない出典 {len(unverifiable)}本）" if unverifiable else ""
            print(f"  ★{domain}/{it['id']}: {missing} / 全{len(nums)}個{tail}")
    print(f"★出典で裏が取れない数字を含む項目: {ng} 件")
    return ng


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--links", action="store_true")
    ap.add_argument("--pages", action="store_true")
    ap.add_argument("--numbers", action="store_true")
    args = ap.parse_args()
    run_all = not (args.links or args.pages or args.numbers)
    total = 0
    if run_all or args.links:
        total += check_links()
    if run_all or args.pages:
        total += check_pages()
    if run_all or args.numbers:
        total += check_numbers()
    print()
    print("⚠ 出たものは候補。原本を開いて1件ずつ確かめること（偽陽性は README 参照）。")
    sys.exit(0)


if __name__ == "__main__":
    main()
