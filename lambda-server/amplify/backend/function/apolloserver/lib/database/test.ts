import mongoose from "mongoose";
export abstract class DataAccessBase<T extends mongoose.Document> {
    private model: mongoose.Model<T>;
    constructor(model: mongoose.Model<T>) {
        this.model = model;
    }
}
// 定义todoitem的接口
export interface ITodoItem extends mongoose.Document {
    Id: string;
    Title: string;
    Completed: boolean;
}

// 定义todoitem的schema
const todoItemSchema = new mongoose.Schema({
    Id: { type: String, required: true },
    Title: { type: String, required: true },
    Completed: { type: Boolean, default: false }
});

// 定义todoitem的model
const todoItemModel = mongoose.model<ITodoItem>("TodoItem", todoItemSchema);

// 定义todoitem的数据访问类，继承DataAccessBase
export class TodoItemDataAccess extends DataAccessBase<ITodoItem> {
    constructor() {
        super(todoItemModel);
    }
}