import { Field, ID, ObjectType, Int } from "type-graphql";

@ObjectType({ description: "A single to do" })
export class TodoItem {
    constructor() {
        this.Completed = false;
    }
    // 定义类型
    @Field(type => ID)
    Id: string = "";

    @Field()
    Title: string;

    // 定义可空类型
    @Field({ nullable: true, description: "The description of the item." })
    Description?: string;

    @Field({ nullable: true, description: "The due date for the item" })
    DueDate?: Date;

    @Field({ nullable: true, description: "The date the item was created" })
    CreationDate: Date;

    @Field(type => Int)
    DaysCreated: number;

    @Field()
    Completed: boolean;
}