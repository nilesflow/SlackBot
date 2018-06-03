# SlackBot
Slack Bot on AWS - notify to channel on receiving events.

## できること
Event通知を指定したチャンネルに通知  

### 対応イベント
```
channel_created
channel_deleted
channel_rename
channel_archive
channel_unarchive
```

```
group_open
group_close
group_archive
group_unarchive
group_rename
```
※ Bot Userが所属している場合

## 必要なもの・構成
* Slack App の設定
* AWS
  * API Gateway
  * Lambda

※AWSリソースはEvent通知分だけ使用

## セットアップ
```
git clone https://github.com/nilesflow/SlackBot.git`
```
* API Gateway
  * リソースの作成
  * 統合リクエストの設定
  * メソッドレスポンスの設定
  * 統合レスポンスの設定
* Lambda  
  * コードの取得
  ```
  cd Lambda/SlackBot/
  npm i nodefw
  npm run zip
  ```
  * 関数の作成
  * zipコードのアップロード
  * 環境変数の設定
   * OAuth Access Token
   * Bot User OAuth Access Token
  * テストイベントの設定（必要に応じて）
* Slack App
  * Slack App の作成
    * Event Subscription の設定
    * Subscribe to Bot Events の設定
  * Bot User の作成
  * Install App
