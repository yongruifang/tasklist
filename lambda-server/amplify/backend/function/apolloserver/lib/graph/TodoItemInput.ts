import { Field, InputType, ID } from "type-graphql";
import { TodoItem } from "./TodoItem";

// 用于修改的类，看起来和TodoItem类似，但是有些字段是可选的
// 泛型Partial<TodoItem>表示这个类的所有字段都是可选的
// 没有DaysCreated字段，因为这个值无需要添加字段来保存，而是在查询时计算出来的
@InputType()
export class TodoItemInput implements Partial<TodoItem> {
    @Field()
    Id: string;
    @Field({ description: "The item title" })
    Title: string = "";
    @Field({ nullable: true, description: "The item description" })
    Description?: string = "";
    @Field({ nullable: true, description: "The item due date" })
    DueDate?: Date;
    @Field()
    CreationDate: Date;
    @Field()
    Completed: boolean = false;
}