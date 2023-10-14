const TasksModel = require("../models/workModel");


exports.createTask=async (req,res)=>{
    try{
        let reqBody=req.body
        reqBody.email=req.headers['email'];
        let result= await TasksModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.deleteTask=async (req,res)=>{
    try {
        let id= req.params.id;
        let Query={_id:id};
        let result= await TasksModel.deleteOne(Query)
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.updateTaskStatus=async (req,res)=>{
    try{
        let id= req.params.id;
        let status= req.params.status;
        let Query={_id:id};
        let reqBody={status:status}

        let result= await TasksModel.updateOne(Query,reqBody)

        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.listTaskByStatus=async (req,res)=>{
    try {
        let status= req.params.status;
        let email=req.headers['email'];
        let result= await TasksModel.find({email:email,status:status});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}



exports.taskStatusCount=async (req,res)=>{
    try {
        let email=req.headers['email'];
        let result= await TasksModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


