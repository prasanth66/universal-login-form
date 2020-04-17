const express=require('express');
const passport=require('passport');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.post('/base',homeController.register);
router.post('/createpassword',homeController.createPassword);

//authenticate using passport
router.post('/home',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),homeController.login);



router.use('/users',require('./users'));


module.exports=router;