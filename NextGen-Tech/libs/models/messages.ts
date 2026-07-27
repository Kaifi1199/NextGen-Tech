import mongoose,{Schema} from "mongoose"

const messageSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
    },
    subject : {
        type : String
    },
    message : {
        type : String,
    },
    isRead : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const messages = mongoose?.models?.messages || mongoose?.model("messages",messageSchema)
export default messages