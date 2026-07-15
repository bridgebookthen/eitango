# eitango

HTML + TypeScript で作ったシンプルな英単語帳アプリです。

## セットアップ

```bash
npm install
npm run build
```

ビルド後、`index.html` をブラウザで開くと利用できます。

## 使い方

- **意味を表示**: 現在の単語の日本語訳を表示
- **次へ**: 次の単語へ移動
- **シャッフル**: 単語順をランダム化して先頭から再開
- **覚えた / まだ**: 学習状況カウントを更新し、次の単語へ進む
- **単語を追加**: 画面下のフォームから英単語と意味を追加（追加分はブラウザに保存）

## ファイルごとの役割

- `/index.html`
  - 画面の骨組み（単語表示、意味表示、操作ボタン、状態表示）
- `/styles.css`
  - 最小限の見た目（カードUI、ボタン、文字サイズなど）
- `/src/main.ts`
  - 画面描画、操作イベント、学習状態管理
- `/src/words.ts`
  - 初期表示で使う英単語データ
- `/tsconfig.json`
  - TypeScript コンパイル設定（`src` -> `dist`）
- `/package.json`
  - プロジェクト情報と npm スクリプト

## スクリプト構造

- `npm run build`
  - TypeScript を `dist/main.js` にコンパイル
- `npm run watch`
  - 変更監視しながら自動コンパイル

## ディレクトリ構造

```text
.
├── dist/            # build 後に生成される JavaScript
├── src/
│   ├── main.ts      # アプリ本体ロジック
│   └── words.ts     # 初期英単語データ
├── index.html       # エントリーページ
├── styles.css       # スタイル
├── package.json
├── tsconfig.json
└── README.md
```
