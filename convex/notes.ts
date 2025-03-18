// convexからﾃﾞｰﾀを取得する処理

import { convexToJson, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const notesJson = await ctx.db.query("notes").collect(); // notesﾃｰﾌﾞﾙの全てのﾃﾞｰﾀを取得してｸｴﾘ結果を配列として集める
    return notesJson; // 取得したﾃﾞｰﾀをそのまま返す
  },
});


// ﾃﾞｰﾀを追加する処理
export const create = mutation({
  args: { // mutationが受け取る引数
    title: v.string(), // ｸﾗｲｱﾝﾄからﾀｲﾄﾙと内容を受け取る
    content: v.string(),
  },
  handler: async (ctx, args) => { // handler 実際にﾃﾞｰﾀﾍﾞｰｽ操作や処理を行う関数 ctxにはﾃﾞｰﾀﾍﾞｰｽ操作や認証情報が含まれる  argsはｸﾗｲｱﾝﾄから渡された引数(titleとcontent)
    // notesﾃｰﾌﾞﾙにﾚｺｰﾄﾞ挿入 挿入ﾃﾞｰﾀは3つ
    const noteId = await ctx.db.insert("notes", { title: args.title, content: args.content, lastEditTime: Date.now()});
    return noteId; // 挿入したﾃﾞｰﾀを返す
  },
});


// ﾃﾞｰﾀを削除する処理
export const deleteNote = mutation({
  args: { noteId: v.id("notes")}, // noteIdは任意の変数名 id("notes")としているのはconvexのﾙｰﾙで上記のnotesJsonの型を見ればわかる
  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId);
  },
});