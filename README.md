# youtube-search-app

## 事前準備

1. Nodejsをインストールします。推奨バージョンはv20.x以上になります。
2. `.env`ファイルをルートディレクトリに作成し、Google Cloud Platformで取得したAPIキーを以下のように指定します。
   ```
   GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
   ```
3. 必要なパッケージをインストールします。
   ```sh
   $ npm install
   ```

## 使用方法

1. 下記コマンドでキーワード検索できます。

   ```sh
   $ npm run search <キーワード>
   ```

   例えば、「犬」を検索する場合：

   ```sh
   $ npm run search 犬
   ```

2. ターミナルに検索結果が出力されます。
3. ルートディレクトリに`search_result.csv`というファイル名で検索結果がCSV形式で出力されます。CSVファイルには、動画のタイトル、URL、再生回数などが含まれます。
