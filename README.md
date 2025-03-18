arg（アーグ）＝「お客さんの注文」
例：アイスクリーム屋さんで
🍦「バニラ1個、チョコレート2個」と注文する
→ arg = { flavor: "バニラ", count: 1 }

特徴：
お店（サーバー）に「何が欲しいか」を伝えるメモ

データの形が決まっている（「数字しか受け付けない」など）

例）
// アイスクリーム注文関数
export const orderIceCream = mutation({
  args: {
    flavor: v.string(), // 味（文字列）
    count: v.number()   // 個数（数字）
  },
  handler: (ctx, args) => {　
    // args.flavor で味を取得
    // args.count で個数を取得
  }
});

<!-- handler queryやミューテーションの実際の処理を行う関数
役割：データベース操作やビジネスロジックの実行を担当
特徴：ctx（コンテキスト）オブジェクトを受け取る
　　　データベース操作やその他の処理を実行できる
 -->
<!-- mutationは、データベースの更新操作を行うための関数コンストラクタです。
目的：データの挿入、更新、削除などの変更操作を実行
特徴：POST、PUT、PATCH、DELETEなどの更新系HTTPメソッドに対応
　　　データベースの状態を変更する
mutationはqueryと異なり、必ずしも値を返す必要はありません。
データベースの更新が主な目的で、必要に応じて結果を返すことができます。
 -->


ctx（コンテキスト）＝「店員さんの便利道具箱」
中身：
🧰 データベース接続ツール・認証情報・ログイン中のユーザー情報など

主な道具：
道具	            使い道
ctx.db	データの保存/読み取り
ctx.auth	ログイン中のユーザー確認

例）
// データベースからアイスクリームを取得
export const getIceCream = query({
  handler: async (ctx) => {
    // 道具箱からデータベースツール（ctx.db）を使う
    return await ctx.db.query("ice_creams").collect();
  }
});


 実際の動き方
お客さんが注文（argを渡す）
// フロントエンド（React）
const order = { flavor: "バニラ", count: 2 };
await orderIceCream(order); // argを渡す


店員さんが作業（ctxを使って処理）
// バックエンド（Convex）
handler: (ctx, args) => {
  // 道具箱からデータベースツールを選ぶ
  ctx.db.insert("orders", args); 
}


もっと分かりやすい例：ピザ屋さん
arg: 「チーズピザLサイズ1枚」
→ { type: "チーズ", size: "L", count: 1 }

ctx: オーブン・トッピング材料・レジスター

注意ポイント
argは必ずチェックされる：
「数字を書く欄に文字を書いたらエラー」になる

ctxは自動で用意される：
店員さんが最初から持っている道具箱（自分で作る必要なし）

<!-- 

const data = useQuery(api.notes.get);

api: これは Convex が自動生成する API オブジェクトです。プロジェクト内のすべてのクエリとミューテーションへのアクセスを提供します。
notes: これはあなたのプロジェクト内の特定のファイルまたはモジュールを指します。通常、convex/notes.ts や convex/notes.js というファイルに対応します。
get: これは notes ファイル内で定義された特定のクエリ関数の名前です。あなたが先ほど共有したコードで定義されているものです：

 -->