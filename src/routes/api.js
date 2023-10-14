const express =require('express');
const studentController=require("../controllers/studentController");
const workController=require("../controllers/workController");
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");


const router =express.Router();

// User Manage
router.post("/registration", studentController.registration);
router.post("/login",studentController.login);

router.post("/profileUpdate",AuthVerifyMiddleware,studentController.profileUpdate);
router.get("/profileDetails",AuthVerifyMiddleware,studentController.profileDetails);
router.get("/RecoverVerifyEmail/:email",studentController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",studentController.RecoverVerifyOTP);
router.post("/RecoverResetPass",studentController.RecoverResetPass);


// Task Manage
router.post("/createTask",AuthVerifyMiddleware,workController.createTask);
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,workController.updateTaskStatus);
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,workController.listTaskByStatus);
router.get("/taskStatusCount",AuthVerifyMiddleware,workController.taskStatusCount);
router.get("/deleteTask/:id",AuthVerifyMiddleware,workController.deleteTask);


module.exports=router;






































module.exports=router;