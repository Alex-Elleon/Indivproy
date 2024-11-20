import { Schema, model } from "mongoose";

interface IOption{
    title:string,
    optionId:Schema.Types.ObjectId | string;

}

const OptionSchema = new Schema <IOption>({
    title : {
        type : String,
        required : true
    },
    optionId : {
        type : Schema.Types.ObjectId,
        ref : "options",
        required : true
    }
});

export const OptionModel = model("options" , OptionSchema);
