# Stripe決済セットアップガイド

このガイドでは、自主トレ素材庫のStripe決済機能をセットアップする手順を説明します。

## 1. 環境変数の設定

`.env.local` ファイルに以下の環境変数を追加してください：

```env
# Stripe
# Stripe 　シークレットキー
STRIPE_SECRET_KEY=sk_live_... (Redacted)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SIJycFoWwVKxcZhvf8rX6RJ8RraqdSUhNBLKovbJzc9PbGSzI4jXRqkK2bWymj3Oj8bvls3Zz5igSLwavz5J62P006vxSNP1G
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

> **重要**: 本番環境では `NEXT_PUBLIC_APP_URL` を実際のドメインに変更してください。

## 2. Stripeダッシュボードで商品と価格を作成

### 2.1 Stripeダッシュボードにログイン

[https://dashboard.stripe.com](https://dashboard.stripe.com) にアクセスしてログインします。

### 2.2 商品を作成

1. 左メニューから「商品カタログ」→「商品」を選択
2. 「商品を追加」ボタンをクリック
3. 以下の3つの商品を作成します：

#### Basic プラン
- **商品名**: Basic プラン
- **説明**: 無料40点を一気に使える基本パック
- **価格**: ¥980
- **支払いタイプ**: 一回限り
- **通貨**: JPY

#### Pro プラン
- **商品名**: Pro プラン
- **説明**: Basicの40点＋別種60点で合計100点の実用パック
- **価格**: ¥1,980
- **支払いタイプ**: 一回限り
- **通貨**: JPY

#### Premium プラン
- **商品名**: Premium プラン
- **説明**: 200点＋以降の新作優先追加の最上位パック
- **価格**: ¥2,980
- **支払いタイプ**: 一回限り
- **通貨**: JPY

### 2.3 価格IDをコピー

各商品を作成後、価格IDをコピーします。価格IDは `price_xxxxxxxxxxxxx` の形式です。

### 2.4 価格IDを更新

`src/app/pricing/page.tsx` ファイルの `priceId` を実際の価格IDに更新してください：

```typescript
const plans = [
    {
        name: "Basic",
        price: "¥980",
        description: "無料40点を一気に使える基本パック",
        features: [...],
        priceId: "price_xxxxxxxxxxxxx", // ← ここを更新
        highlighted: false
    },
    // ... 他のプランも同様に更新
];
```

## 3. Webhookの設定

### 3.1 Webhookエンドポイントを追加

1. Stripeダッシュボードで「開発者」→「Webhook」を選択
2. 「エンドポイントを追加」をクリック
3. 以下の情報を入力：
   - **エンドポイントURL**: `https://your-domain.com/api/webhook`
   - **リッスンするイベント**: 
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

### 3.2 Webhook署名シークレットをコピー

Webhookエンドポイントを作成後、「署名シークレット」をコピーして `.env.local` の `STRIPE_WEBHOOK_SECRET` に設定します。

## 4. テスト

### 4.1 開発サーバーを起動

```bash
npm run dev
```

### 4.2 テスト決済を実行

1. ブラウザで `http://localhost:3000/pricing` にアクセス
2. いずれかのプランの「今すぐはじめる」ボタンをクリック
3. Stripe Checkoutページにリダイレクトされます
4. テストカード番号を使用して決済をテスト：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 任意の未来の日付
   - CVC: 任意の3桁の数字
   - 郵便番号: 任意

### 4.3 Webhookのローカルテスト（オプション）

ローカル環境でWebhookをテストする場合は、Stripe CLIを使用します：

```bash
# Stripe CLIをインストール（Homebrewの場合）
brew install stripe/stripe-cli/stripe

# Stripeにログイン
stripe login

# Webhookをローカルにフォワード
stripe listen --forward-to localhost:3000/api/webhook
```

表示される `whsec_xxxxx` を `.env.local` の `STRIPE_WEBHOOK_SECRET` に設定します。

## 5. 本番環境へのデプロイ

### 5.1 環境変数を設定

デプロイ先（Vercel、Netlifyなど）で以下の環境変数を設定してください：

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL` (本番ドメイン)
- `STRIPE_WEBHOOK_SECRET`

### 5.2 Webhookエンドポイントを更新

Stripeダッシュボードで、Webhookエンドポイントを本番URLに更新します。

## トラブルシューティング

### 決済が完了しない

- ブラウザのコンソールでエラーを確認
- Stripeダッシュボードの「ログ」でエラーを確認
- 環境変数が正しく設定されているか確認

### Webhookが動作しない

- Webhook署名シークレットが正しいか確認
- Stripeダッシュボードの「Webhook」→「イベント」でイベントが送信されているか確認
- サーバーログでエラーを確認

## セキュリティに関する注意事項

> **警告**: 
> - Stripeのシークレットキーは絶対に公開しないでください
> - `.env.local` ファイルはGitにコミットしないでください
> - 本番環境では必ずHTTPSを使用してください
> - 定期的にAPIキーをローテーションしてください

## サポート

問題が発生した場合は、[Stripeドキュメント](https://stripe.com/docs)を参照するか、Stripeサポートにお問い合わせください。
