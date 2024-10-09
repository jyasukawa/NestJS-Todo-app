FROM node:16-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# ポートを公開
EXPOSE 8080

# アプリケーションを起動
CMD ["npm", "run", "serve"]