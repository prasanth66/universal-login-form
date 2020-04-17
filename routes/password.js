const express=require('express');
const passport=require('passport');
const router=express.Router();
const homeController=require('../controllers/home_controller');


router.get('/forgotpassword',homeController.forgotPassword);

router.post('/changepassword',homeController.changepassword);


module.exports=router;