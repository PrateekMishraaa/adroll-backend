import mongoose, {Schema} from "mongoose"


const ContactSchema = new Schema({
    BussinessEmail:{
        type:String,
        required:true,
        unique:true
    },
    JobTitle:{
        type:String,
        required:true
    },
    Website:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
const Contact = mongoose.model("Contact",ContactSchema)
export default Contact