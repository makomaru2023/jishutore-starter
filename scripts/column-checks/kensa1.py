"""検査1：有料層（records / auditPoints / pitfalls）の書き写しチェック。

12文字n-gramを取り、無料層コーパス（requirements + units + name）に無いものが
記事HTMLに出ていないかを見る。

★ヒット数で判定しない。1件ずつ位置と出典を出して確かめること。
  同じ加算を同じ語彙で書く以上、ノイズは必ず出る。

使い方: python3 scripts/column-checks/kensa1.py .next/server/app/column/<slug>.html [...]
"""

import glob
import io
import json
import os
import re
import sys
import unicodedata

N = 12
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def norm(s):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", s))


def build_corpus():
    paid = {}
    free_parts = []
    pattern = os.path.join(ROOT, "src", "data", "fee-items", "*.json")
    for path in sorted(glob.glob(pattern)):
        if path.endswith("-conflicts.json"):
            continue
        data = json.load(io.open(path, encoding="utf-8"))
        domain = data.get("domain", path)
        for item in data.get("items", []):
            free_parts.append(norm(item.get("name", "")))
            for req in item.get("requirements") or []:
                free_parts.append(norm(req))
            for unit in item.get("units") or []:
                for key in ("condition", "value", "note"):
                    if unit.get(key):
                        free_parts.append(norm(unit[key]))
            for field in ("records", "auditPoints", "pitfalls"):
                for line in item.get(field) or []:
                    text = norm(line)
                    for i in range(len(text) - N + 1):
                        paid.setdefault(text[i:i + N], (domain, item.get("id"), field))
    return paid, "".join(free_parts)


def strip_html(html):
    body = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.S)
    return norm(re.sub(r"<[^>]+>", "", body))


def main(paths):
    paid, free = build_corpus()
    print("有料層 12-gram: {:,} 種 / 無料層コーパス: {:,} 字".format(len(paid), len(free)))
    total = 0
    for path in paths:
        text = strip_html(io.open(path, encoding="utf-8").read())
        hits = []
        for i in range(len(text) - N + 1):
            gram = text[i:i + N]
            src = paid.get(gram)
            if src and gram not in free:
                hits.append((i, gram, src))
        print("\n=== {} ===  本文{:,}字 / 生ヒット {} 件".format(path, len(text), len(hits)))
        # 1文字ずらしで大量に出るので、連続するヒットはひとかたまりにまとめる
        merged = []
        for i, gram, src in hits:
            if merged and i <= merged[-1][1] + 1:
                merged[-1][1] = i
                merged[-1][3] += gram[-1]
            else:
                merged.append([i, i, src, gram])
        for start, end, src, frag in merged:
            print("  - 位置{}: [{}]  出典候補={}/{}/{}".format(start, frag, src[0], src[1], src[2]))
            print("    文脈: {}".format(text[max(0, start - 30):end + N + 30]))
        total += len(merged)
    print("\n★要確認の塊: {} 件（0でなければ1件ずつ出典を確かめること）".format(total))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
