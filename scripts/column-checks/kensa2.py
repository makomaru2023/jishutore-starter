"""検査2：トーン。一文80字超と、語尾3連続を出す。

★共通CTAまで含めた「描画後のHTML」で見る。記事の締めの一文とCTAの2文で
  「ます」が3連続する事故が繰り返し起きている（2026-08-23/24/27）。
⚠ Note / H2 / Figure は抜き出しの対象外なので、それらを挟む箇所は誤検知も出る。
  読者に見える並びで判断すること。

使い方: python3 scripts/column-checks/kensa2.py .next/server/app/column/<slug>.html [...]
"""

import io
import re
import sys

MAX_CHARS = 80
RUN = 3
# 共通CTAの本文の書き出し。ここを見つけて、その直前の文を「記事の締め」とみなす
CTA_MARKS = ("自主トレのイラスト素材を", "自主トレ素材庫Plus", "報酬チェックの記録")

ENDINGS = ["ます", "です", "ません", "でしょう", "ました", "でした", "ください", "はず", "思います", "なります"]


def strip_tags(s):
    s = re.sub(r"<[^>]+>", "", s)
    for old, new in (("&nbsp;", ""), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                     ("&#x27;", "'"), ("&quot;", '"')):
        s = s.replace(old, new)
    return re.sub(r"\s+", "", s)


def ending_of(sentence):
    body = sentence.rstrip("。")
    for e in sorted(ENDINGS, key=len, reverse=True):
        if body.endswith(e):
            return e
    return body[-2:] if len(body) >= 2 else body


def sentences_of(html):
    out = []
    for para in re.findall(r'<p class="jp-text[^"]*">(.*?)</p>', html, flags=re.S):
        for s in re.split(r"(?<=。)", strip_tags(para)):
            if s.strip():
                out.append(s.strip())
    return out


def main(paths):
    problems = 0
    for path in paths:
        html = io.open(path, encoding="utf-8").read()
        sents = sentences_of(html)
        longs = [s for s in sents if len(s) > MAX_CHARS]

        runs, prev, count, start = [], None, 0, 0
        for i, s in enumerate(sents):
            e = ending_of(s)
            if e == prev:
                count += 1
            else:
                if count >= RUN:
                    runs.append((prev, count, start))
                prev, count, start = e, 1, i
        if count >= RUN:
            runs.append((prev, count, start))

        print("=== {} ===".format(path))
        print("  文 {} / 最長 {}字".format(len(sents), max((len(s) for s in sents), default=0)))
        print("  {}字超: {} 件".format(MAX_CHARS, len(longs)))
        for s in longs:
            print("    - ({}字) {}".format(len(s), s))
        print("  語尾{}連続: {} 件".format(RUN, len(runs)))
        for e, c, st in runs:
            print("    - [{}] x{}".format(e, c))
            for s in sents[st:st + c]:
                print("        {}".format(s))
        # ★記事本文の締め（＝共通CTAの直前の一文）だけ別に出す。
        #   CTAは「〜配布しています。」「〜使えます。」と「ます」2つで終わるので、
        #   ★**締めが「ます」だと自動的に3連続**になる。4回踏んでいる。
        #   ⚠ページの最後の文は共通の免責文なので、そこを見ても意味がない。
        closing = None
        for i, sent in enumerate(sents):
            if any(mark in sent for mark in CTA_MARKS):
                closing = sents[i - 1] if i > 0 else None
                break
        if closing:
            tail = ending_of(closing)
            ng = tail == "ます"
            print("  ★本文の締め（CTA直前）: [{}] {}".format(tail, "⚠ NG" if ng else "OK"))
            print("     {}".format(closing))
            if ng:
                print("     → 共通CTAが「ます」2つで終わるので、このままだと3連続になる。")
                print("        「です／でしょう／ません／ました」で終えること。")
        else:
            print("  ★本文の締め: CTAが見つからないので判定できない（CTA_MARKS を確認）")

        problems += len(longs) + len(runs)
        print()
    print("★検査2の要修正: {} 件".format(problems))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
