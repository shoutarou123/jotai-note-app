
// convexからﾃﾞｰﾀを取得する処理

import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const notesJson = await ctx.db.query("notes").collect(); // notesﾃｰﾌﾞﾙの全てのﾃﾞｰﾀを取得してｸｴﾘ結果を配列として集める
    return notesJson; // 取得したﾃﾞｰﾀをそのまま返す
  },
});