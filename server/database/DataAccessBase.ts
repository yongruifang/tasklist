import mongoose from "mongoose";
// import { Model } from "./Database";
export abstract class DataAccessBase<T extends mongoose.Document> {
    private model: mongoose.Model<T>;
    constructor(model: mongoose.Model<T>) {
        this.model = model;
    }
    GetAll(): Promise<T[]> {
        return new Promise<T[]>((callback, error) => {
            this.model.find().then((result: T[]) => {
                callback(result);
            }).catch((err: unknown) => {
                error(err);
            });
        });
    }
    Add(item: T): Promise<boolean> {
        return new Promise<boolean>((callback, error) => {
            this.model.create(item).then(() => {
                callback(true);
            }).catch((err: unknown) => {
                error(err);
            });
        });
    }
    Get(id: string): Promise<T> {
        return new Promise<T>((callback, error) => {
            // this.model.find({ 'Id': id }, (err: unknown, result: T) => {
            //     if (err) {
            //         error(err);
            //     }
            //     callback(result);
            // });
            return this.model.find({ 'Id': id }).exec()
        });
    }
    Remove(id: string): Promise<void> {
        return new Promise<void>((callback, error) => {
            return this.model.deleteOne({ 'Id': id });
        });
    }
    Update(id: string, item: T): Promise<boolean> {
        return new Promise<boolean>((callback, error) => {
            try {
                const filter = { 'Id': id }
                this.model.updateOne(filter, item as any)
                callback(true)
            } catch (err) {
                error(err)
            }
        });
    }
}