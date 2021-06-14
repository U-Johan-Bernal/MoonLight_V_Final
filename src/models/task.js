const moongoose=require('mongoose');
const { Schema }=moongoose;

const TaskSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String,required:true},
    price:{type:String,required:true}
});

module.exports = moongoose.model('Task',TaskSchema);