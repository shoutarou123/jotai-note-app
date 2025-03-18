import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({ // Convexﾃﾞｰﾀﾍﾞｰｽの構造を定義するための関数
  notes: defineTable({ // notesがﾃｰﾌﾞﾙ名 defineTableでﾃｰﾌﾞﾙ内のﾌｨｰﾙﾄﾞ定義
    title: v.string(),
    content: v.string(),
    lastEditTime: v.number(),
  }),
});