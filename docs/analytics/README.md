# 自主トレ素材庫 アクセス解析アーカイブ

ここは「自主トレ素材庫.jp」のGA4データを月次で保存・振り返るためのフォルダです。

## ディレクトリ構成

```
docs/analytics/
├── README.md            ← このファイル（全体インデックス）
├── _template/           ← 月次フォルダの雛形（コピーして使う）
│   ├── README.md
│   ├── summary.md
│   ├── pages-top50.md
│   └── ga4-export-note.md
└── YYYY-MM/             ← 月ごとのレポート
    ├── README.md
    ├── summary.md
    ├── pages-top50.md
    └── ga4-export-note.md
```

## アーカイブされている月

| 月 | リンク |
|---|---|
| 2026-05 | [2026-05/](./2026-05/) |

## 新しい月を追加するときの手順

1. `_template/` フォルダをコピーして `YYYY-MM/` を作る
   ```bash
   cp -R docs/analytics/_template docs/analytics/2026-06
   ```
2. `YYYY-MM/README.md` `summary.md` `pages-top50.md` `ga4-export-note.md` の中身を当月分に書き換える
3. このREADMEの「アーカイブされている月」テーブルにリンクを追加
4. PDF（上位50件）とCSV（全件）は Google Drive へ別途保存：
   `自主トレ素材庫/01_アクセス解析/GA4/YYYY/YYYY-MM/`
5. リポジトリに commit & push

## 設計思想

- **PDFは証拠（スクショ）**：上位40〜50位のスナップショットとしてGoogle Driveに残す
- **CSVは分析の元データ**：全件をCSVで保存。前月比・有料LP分析・404抽出・カテゴリ比較に使う
- **Markdownは振り返りメモ**：このリポジトリには月次サマリーだけを残し、生データはDriveに置く
- **Notionには貼らない**：月次振り返りもMarkdown中心で管理し、検索性とdiff履歴を git で確保
