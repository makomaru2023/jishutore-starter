# 申し送り：R2 にアップしたイラストをサイトに反映する手順

このドキュメントは、Cloudflare R2 にアップロードした自主トレイラストを「自主トレ素材庫」サイト（`/items`）に反映するための作業手順をまとめたものです。
これまで Claude Code で行っていた作業を、Codex など他のエージェントでも同じようにできるようにするための申し送りです。

---

## 0. 結論（いちばん大事なこと）

**新しいイラストを反映する作業 = `data/items.json` に項目を追記して commit → push するだけ** です。

- 画像ファイル本体は **R2 に置いてある**（Git には含めない）。
- サイトは `data/items.json` を「商品台帳」として読み込み、ビルド時に各イラストのページを生成する。
- だから **R2 にアップ済みのファイルを `items.json` に登録すれば反映完了**。
- 反映後は必ず **commit → main へ push → Vercel 自動デプロイ** まで完遂する。

---

## 1. 全体の流れ

```
[1] イラストを R2 にアップロード（運営者が手動：Cloudflare ダッシュボード等）
        ファイル配置ルール: <tier>/<category>/<ファイル名>.png
        例) premium/plain/air-bike.png      （文字なし版）
            premium/text/air-bike.png       （文字あり版）
        ↓
[2] エージェントが R2 の新規キーを確認
        npx tsx scripts/list-recent-r2.ts   （最近アップされた20件を表示）
        ↓
[3] data/items.json に項目を追記
        1イラストにつき plain（文字なし）と text（文字あり）の2エントリを登録
        日本語タイトル・説明・運動ポイント等もここで記入
        ↓
[4] ローカルで動作確認
        npm run build  （items.json が壊れていないか／型が通るか）
        npm run dev    （/items と /items/<id> を目視確認）
        ↓
[5] commit → git push origin main → Vercel が自動デプロイ
```

> ⚠️ **[1] の R2 アップロード自体はエージェントの作業範囲外**（運営者が事前に行う）。
> エージェントは「すでに R2 に上がっているファイル」を `items.json` に登録するのが仕事。

---

## 2. 関連ファイル / 仕組み

| 種別 | パス | 役割 |
|---|---|---|
| 商品台帳 | `data/items.json` | **ここを編集する。** 全イラストのメタデータ一覧 |
| 型定義 | `src/types/index.ts` | `Item` 型。items.json の各項目の形 |
| 読み込み | `src/lib/items.ts` | items.json を読み、画像URLを組み立てる |
| 一覧ページ | `src/app/items/page.tsx` | `getItems()` で全件表示 |
| 詳細ページ | `src/app/items/[id]/page.tsx` | `generateStaticParams()` で id ごとに静的生成 |
| カード | `src/components/ItemCard.tsx` | 一覧の各カード。画像プレビュー＋ダウンロード |
| 画像プロキシ | `src/app/api/image/route.ts` | R2 から画像を取得して返す（ダウンロード用） |
| R2 確認用 | `scripts/list-recent-r2.ts` | R2 の最近アップされたキーを表示 |
| R2 全件確認 | `scripts/list-r2.ts` | R2 のオブジェクト一覧を表示 |

### 画像が表示・ダウンロードされる仕組み

- **プレビュー画像（一覧・詳細での表示）**
  `src/lib/items.ts` の `getItemImageUrl(previewSrc)` が、`previewSrc`（R2のキー）を
  公開R2ドメインのURLに組み立てる。
  公開ドメイン（`src/lib/items.ts` にハードコード）:
  `https://pub-00b4caa7ca60422fa31c5d5d0d6772c3.r2.dev/<キー>`
  例) `premium/plain/air-bike.png` → `https://pub-...r2.dev/premium/plain/air-bike.png`

- **ダウンロード**
  `items.json` の `fileHref`（`/api/image?key=<URLエンコードしたキー>`）経由。
  `src/app/api/image/route.ts` が R2 認証情報を使ってファイルをストリーム返却する。

---

## 3. 環境変数（`.env.local`）

R2 関連スクリプトの実行に必要。`.env.local` に設定済み（Git には含めない）。

| 変数名 | 用途 |
|---|---|
| `R2_ACCOUNT_ID` | Cloudflare アカウントID |
| `R2_ACCESS_KEY_ID` | R2 アクセスキー |
| `R2_SECRET_ACCESS_KEY` | R2 シークレット |
| `R2_BUCKET_NAME` | バケット名 |

> ※公開プレビュー用の R2 ドメインは環境変数ではなく `src/lib/items.ts` にハードコードされている。
> ※`.env.local` は `.gitignore` 済み。値は運営者に確認すること（このファイルには書かない）。

---

## 4. `data/items.json` の項目仕様

1エントリの例（文字なし版）:

```json
{
  "id": "air-bike-premium",
  "tier": "premium",
  "category": "plain",
  "title": "Air Bike",
  "titleJa": "エアロバイク",
  "previewSrc": "premium/plain/air-bike.png",
  "fileHref": "/api/image?key=premium%2Fplain%2Fair-bike.png",
  "fileName": "air-bike.png",
  "description": "自転車を漕いで両脚を動かす有酸素運動です。…",
  "exercisePoint": "腰が反りすぎないよう、腹部に力を入れた状態で行います。…",
  "targetCondition": "廃用症候群による体力低下、心肺機能の改善が必要な方…",
  "difficulty": "中級（腹筋群にしっかり力が入る方向け）"
}
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | ✅ | **全件で一意。** URLになる（`/items/<id>`）。採番ルールは §5 |
| `tier` | ✅ | 現状はすべて `"premium"` |
| `category` | ✅ | `"plain"`（文字なし）または `"text"`（文字あり） |
| `title` | ✅ | 英語タイトル（ファイル名をベースにした表記） |
| `titleJa` | ✅ | 日本語タイトル。**文字あり版は末尾に `【文字あり】` を付ける** |
| `previewSrc` | ✅ | **R2のキーそのまま**（例 `premium/plain/air-bike.png`）。URLにしない |
| `fileHref` | ✅ | `/api/image?key=<キーをURLエンコード>`。`/` は `%2F` |
| `fileName` | ✅ | 拡張子付きファイル名（例 `air-bike.png`） |
| `description` | 任意 | 運動の説明 |
| `exercisePoint` | 任意 | 指導時のポイント |
| `targetCondition` | 任意 | 対象となる状態・適応 |
| `difficulty` | 任意 | 難易度 |

> `fileHref` のエンコード例：`premium/plain/air-bike.png` → `premium%2Fplain%2Fair-bike.png`
> ファイル名にスペースや括弧が含まれる場合も、各文字を適切にURLエンコードする
> （`src/lib/items.ts` 側は表示時にセグメント単位でエンコードして吸収している）。

---

## 5. `id` の採番ルール

ファイル名（拡張子なし）をベースに、以下のサフィックスを付けて一意化する。

- `tier` が `basic` 以外 → `-<tier>` を付与（現状は常に `-premium`）
- `category` が `text` → さらに `-text` を付与

例（ファイル名 `air-bike`）:

| R2キー | id |
|---|---|
| `premium/plain/air-bike.png` | `air-bike-premium` |
| `premium/text/air-bike.png` | `air-bike-premium-text` |

> このルールは `scripts/items-from-csv.ts` の実装と一致している（§7参照）。
> **1つのイラストにつき plain と text の2エントリを登録する**のが基本。

---

## 6. 実際の作業手順（エージェント向け）

1. **新規キーを確認する**
   ```bash
   npx tsx scripts/list-recent-r2.ts
   ```
   直近20件の `LastModified - キー` が表示される。今回追加したいファイルのキーを控える。
   （全件見たい場合は `npx tsx scripts/list-r2.ts`）

2. **`data/items.json` に追記する**
   - plain と text の2エントリを追加。
   - `id` は §5 のルールで採番。**既存の id と重複しないこと**（重複するとビルドや静的生成で事故る）。
   - `previewSrc` は R2 キーそのまま、`fileHref` はエンコード済みの `/api/image?key=...`。
   - `titleJa` の文字あり版には `【文字あり】` を付ける。
   - 日本語の `description` / `exercisePoint` / `targetCondition` / `difficulty` を作成して記入
     （既存エントリの文体・粒度に合わせる）。

3. **動作確認**
   ```bash
   npm run build   # items.json のJSON崩れ・型崩れ・id重複を検知
   npm run dev     # http://localhost:3000/items と /items/<新id> を確認
   ```

4. **コミット & デプロイ**
   ```bash
   git add data/items.json
   git commit -m "feat: 新規イラスト〇種を追加"
   git push origin main      # Vercel が自動デプロイ
   ```

> 直近の追加コミット例（参考）：`89185ab feat: R8.5バッチの新規イラスト18種（plain/text 合計36点）を追加`
> → このときも変更ファイルは `data/items.json` のみ。

---

## 7. 補助スクリプト（参考・通常は使わない）

`package.json` の `scripts`:
- `dev` / `build` / `start` / `lint`
- `gen:items:csv` → `tsx scripts/items-from-csv.ts`
- `indexnow` → `tsx scripts/indexnow.ts`

`scripts/` 内の各ファイル:

| スクリプト | 内容 | 現状 |
|---|---|---|
| `list-recent-r2.ts` | R2の最近のキー20件を表示 | **使う**（新規キー確認） |
| `indexnow.ts` | Bing/YahooへURL更新を即時通知（IndexNow） | **使う**（新素材の本番反映後に `npm run indexnow -- --items <ID...>`）。鍵は `public/<鍵>.txt` と対で管理。変更のないURLの再送は避ける |
| `list-r2.ts` | R2の全オブジェクト表示 | 使う（全件確認） |
| `items-from-csv.ts` | `data/items-basic-plain-text.csv` → `items.json` 生成 | **注意**：実行すると items.json を**上書き**し、`description` 等の手書きメタデータが消える。通常は使わない |
| `sync-items-from-r2.ts` | R2を走査して items.json を自動生成 | 同上の理由で通常使わない（メタデータが消える） |
| `build-items-from-r2.ts` / `build-items.ts` / `build-items-from-csv.ts` | 旧世代の生成スクリプト | レガシー。`build-items.ts` は環境変数名が古い（`R2_BUCKET` / `R2_PUBLIC_BASE_URL`）ため現状の `.env.local` では動かない |
| `export-items-csv.ts` | items.json → 翻訳用CSV書き出し | 任意 |
| `update-japanese-titles.ts` / `import-translations.ts` | 日本語タイトルの一括更新 | 任意 |
| `generate-zips.ts` | 有料セット用ZIP生成 | 有料商品向け（イラスト反映とは別系統） |

> **重要**：現在の運用では CSV (`data/items-basic-plain-text.csv`) は使っておらず、`data/items.json` を直接編集している。
> `items-from-csv.ts` / `sync-items-from-r2.ts` は items.json を丸ごと再生成してしまい、手書きの日本語メタデータ（`description` 等）が失われるため、**安易に実行しないこと**。

---

## 8. ハマりどころ・注意点

- **id 重複**：同じ id を2つ作るとビルド/静的生成で事故る。plain と text で必ず `-text` を分けること。
- **previewSrc は「キー」、fileHref は「エンコード済みURL」**。混同しない。
- **R2側にファイルが無い id を登録しない**：プレビューが 404 になる。先に `list-recent-r2.ts` で実在を確認。
- **JSON崩れ**：末尾カンマ・引用符抜けに注意。`npm run build` が通れば基本OK。
- **メタデータの上書き事故**：`items-from-csv.ts` / `sync-items-from-r2.ts` を実行しない（§7）。
- **デプロイまで完遂**：変更依頼は commit → main へ push → Vercel 自動デプロイまで必ず行う。

---

## 9. 技術スタック（前提）

- Next.js 14 App Router / TypeScript / Tailwind CSS
- ホスティング：Vercel（main への push で自動デプロイ）
- 画像ストレージ：Cloudflare R2（公開ドメイン経由でプレビュー、`/api/image` 経由でダウンロード）

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
