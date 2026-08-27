"""検査4：非日本語文字の混入チェック。

★目視では絶対に気づけない（ハングルの混入を通算4件踏んでいる）。
  記事を書いた直後に必ず走らせる。置換するときは、走査で出た文字をそのままコピーすること。

使い方: python3 scripts/column-checks/kensa4-chars.py <ファイル...>
"""

import io
import sys
import unicodedata

# 混入していたら事故。日本語の文章に出る理由がない範囲
RANGES = [
    (0x0400, 0x04FF, "キリル"),
    (0x1100, 0x11FF, "ハングル字母"),
    (0xAC00, 0xD7AF, "ハングル"),
    (0x3130, 0x318F, "ハングル互換"),
    (0x0370, 0x03FF, "ギリシャ"),
    (0x0E00, 0x0E7F, "タイ"),
    (0x0600, 0x06FF, "アラビア"),
]


def main(paths):
    total = 0
    for path in paths:
        s = io.open(path, encoding="utf-8").read()
        hits = []
        for i, ch in enumerate(s):
            cp = ord(ch)
            for lo, hi, label in RANGES:
                if lo <= cp <= hi:
                    hits.append((i, ch, cp, label))
        total += len(hits)
        print("  {:<44} {} 件".format(path.split("/")[-1], len(hits)))
        for i, ch, cp, label in hits:
            ctx = s[max(0, i - 25):i + 25].replace("\n", " ")
            print("      位置{} [{}] U+{:04X} {} ({})".format(i, ch, cp, label, unicodedata.name(ch, "?")))
            print("        文脈: {}".format(ctx))
    print("★非日本語文字の混入: {} 件".format(total))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
