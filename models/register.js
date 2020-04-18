const mongoose=require('mongoose');

//creating register schema
const registerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    secretToken:{
        type:String
    },
    active :{
        type:Boolean,
        default:false
    }
},{timestamps:true});

//storing data collectionn in register
const Register=mongoose.model('register',registerSchema);
//exporting schema
module.exports=Register;