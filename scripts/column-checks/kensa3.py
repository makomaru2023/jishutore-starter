"""検査3の機械部分：図解SVGの文字はみ出し判定。

★囲み枠は「文字の中心を横方向に含む rect」から選ぶ。
  y座標だけで決めると段組みで誤検知する（最初の実装で62件の偽陽性が出た）。

⚠ 目視も省かないこと。この判定で見つからないもの（altと図の食い違い、
  本文の「N項目」と枠数の不一致、小さすぎて読めない記号）は毎回ここをすり抜ける。

使い方: python3 scripts/column-checks/kensa3.py public/column/<figure>.svg [...]
"""

import sys
import xml.etree.ElementTree as ET

NS = "{http://www.w3.org/2000/svg}"
MIN_PAD = 2.0


def fnum(v, default=0.0):
    try:
        return float(v)
    except (TypeError, ValueError):
        return default


def text_width(s, size):
    # 日本語は全角、半角英数は0.55倍で概算する
    return sum(size * (0.55 if ord(ch) < 0x2000 else 1.0) for ch in s)


def check(path):
    root = ET.parse(path).getroot()
    vb = [fnum(x) for x in (root.get("viewBox") or "").split()]
    vw, vh = (vb[2], vb[3]) if len(vb) == 4 else (fnum(root.get("width")), fnum(root.get("height")))

    rects = []
    for r in root.iter(NS + "rect"):
        x, y = fnum(r.get("x")), fnum(r.get("y"))
        w, h = fnum(r.get("width")), fnum(r.get("height"))
        if w > 0 and h > 0:
            rects.append((x, y, w, h))

    problems, texts = [], 0
    for t in root.iter(NS + "text"):
        content = "".join(t.itertext()).strip()
        if not content:
            continue
        texts += 1
        size = fnum(t.get("font-size"), 14.0)
        x, y = fnum(t.get("x")), fnum(t.get("y"))
        w = text_width(content, size)
        anchor = t.get("text-anchor", "start")
        if anchor == "middle":
            left, right = x - w / 2, x + w / 2
        elif anchor == "end":
            left, right = x - w, x
        else:
            left, right = x, x + w

        cx = (left + right) / 2
        boxes = [r for r in rects if r[0] <= cx <= r[0] + r[2] and r[1] <= y <= r[1] + r[3]]
        if boxes:
            box = min(boxes, key=lambda r: r[2] * r[3])
            pad_l, pad_r = left - box[0], (box[0] + box[2]) - right
            if pad_l < MIN_PAD or pad_r < MIN_PAD:
                problems.append("枠からはみ出し {:.1f}/{:.1f}px [{}]".format(pad_l, pad_r, content[:28]))
        if left < 0 or right > vw:
            problems.append("画面外 left={:.1f} right={:.1f} (vw={:.0f}) [{}]".format(left, right, vw, content[:28]))
        if y > vh:
            problems.append("縦はみ出し y={:.1f} > vh={:.0f} [{}]".format(y, vh, content[:28]))

    print("=== {} ===".format(path.split("/")[-1]))
    print("  viewBox {:.0f}x{:.0f} / rect {} / text {}".format(vw, vh, len(rects), texts))
    for p in problems:
        print("  ⚠ " + p)
    if not problems:
        print("  OK（はみ出しなし）")
    print()
    return len(problems)


def main(paths):
    total = sum(check(p) for p in paths)
    print("★検査3（機械部分）の要修正: {} 件".format(total))
    print("⚠ altとSVGの文言、本文の「N項目」と枠数は、目視で必ず突き合わせること")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
