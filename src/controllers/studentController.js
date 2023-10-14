const studentModel = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");


// Registration
exports.registration= async (req, res)=>{
   let reqBody=req.body
    try{

        let result= await studentModel.create(reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}



exports.login=async (req,res)=>{

    try{
        let reqBody=req.body;
        let result= await studentModel.find(reqBody).count();
        if(result===1){
            // Create Token
            let Payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:reqBody['email']
            }
            let token=jwt.sign(Payload,"SecretKey123456789");
            res.status(200).json({status:"success",data:token})

        }
        else{
            // Login fail
            res.status(200).json({status:"fail",data:"No User Found"})
        }
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}




exports.profileUpdate=async (req, res) => {

    try{
        let email = req.headers['email'];
        let reqBody = req.body;
        let result=await studentModel.updateOne({email: email}, reqBody)
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.profileDetails=async (req,res)=>{
   try {
       let email= req.headers['email'];
       let result= await studentModel.find({email:email});
       res.status(200).json({status:"success",data:result})
   }
   catch (e) {
       res.status(200).json({status:"fail",data:e})
   }
}




exports.RecoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your Verification Code is ="+OTPCode
    let EmailSubject="Task manager verification code"

    let result= await studentModel.find({email:email}).count();
    if(result===1){
        // Verification Email
       await SendEmailUtility(email,EmailText,EmailSubject);
       await OTPModel.create({email:email,otp:OTPCode})
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})

    }
    else{
        res.status(200).json({status:"fail",data:"No User Found"})
    }

}




exports.RecoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    // Time Validation 2 min
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }

}



exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        let result=await studentModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}


























