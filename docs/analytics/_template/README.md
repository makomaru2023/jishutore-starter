# YYYY年MM月 GA4分析記録（テンプレート）

> このファイルは **テンプレート** です。
> 月初に `_template` フォルダごとコピーして `YYYY-MM/` にし、すべての `YYYY-MM` を当月に置き換えてください。
>
> ```bash
> cp -R docs/analytics/_template docs/analytics/2026-06
> ```

---

このフォルダは **YYYY年MM月（MM月1日〜MM月最終日）** の自主トレ素材庫.jp の GA4 アクセス解析記録です。

## ファイル一覧

| ファイル | 役割 |
|---|---|
| [README.md](./README.md) | このフォルダの説明 |
| [summary.md](./summary.md) | 月次振り返り |
| [pages-top50.md](./pages-top50.md) | 上位50ページの記録 |
| [ga4-export-note.md](./ga4-export-note.md) | データ保存ルール（基本毎月同じ内容でOK） |

## 期間と元データ

- **期間**：YYYY年MM月1日 〜 YYYY年MM月最終日
- **GA4レポート種別**：ページとスクリーン → ページ タイトルとスクリーン クラス
- **総ページ数**：（GA4のサマリー欄に出る件数を記入）
- **元PDFのファイル名**：`YYYY-MM_GA4_ページとスクリーン_上位50.pdf`
- **元CSVのファイル名**：`YYYY-MM_GA4_ページとスクリーン_全XXX件.csv`

## 保存物の分類

| 種類 | 保存先 | 用途 |
|---|---|---|
| PDF（上位40〜50件） | Google Drive | スクショ的な証拠保管 |
| CSV（全件） | Google Drive | 分析用の元データ |
| `summary.md` | このリポジトリ | 月次振り返り |
| `pages-top50.md` | このリポジトリ | 上位ページの記録 |
