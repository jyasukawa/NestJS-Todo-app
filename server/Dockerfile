# ベースイメージを指定
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピーし、依存関係をインストール
COPY package*.json ./

RUN npm install

# ソースコードをコピー
COPY . .

# NestJSアプリケーションをビルド
RUN npm run build

# ホストとコンテナ間のポートをバインド
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "start:dev"]
