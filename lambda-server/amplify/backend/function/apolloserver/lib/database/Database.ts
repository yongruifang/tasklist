import mongoose from "mongoose";
require('dotenv').config();

export class Mongo {
    constructor(private url: string = "mongodb+srv://fangyongruifyr:fang13360398779@cluster0.idpmdbk.mongodb.net/?retryWrites=true&w=majority") {
    }

    public Connect(): void {
        mongoose.connect(this.url).then(() => {
            console.log("Connected to MongoDB");
        }
        ).catch((err: unknown) => {
            console.log("Error connecting to MongoDB");
            console.log(err);
        });
    }
}

export type Model = mongoose.Model<mongoose.Document>