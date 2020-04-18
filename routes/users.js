const express=require('express');
const passport=require('passport');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),homeController.log);
router.get('/signOut',homeController.signOut);
router.use('/password',require('./password'));

router.get('/verify',homeController.verify);

module.exports=router;