import { Id } from "../../convex/_generated/dataModel";

export class Note {
  constructor( // インスタンスが生成されるときに、この中のものを自動で呼び出される
    public id: Id<"notes">, // publicで外部からアクセスできるようにしている
    public title: string,
    public content: string,
    public lastEditTime: number,
  ) {} // クラスの本体
}