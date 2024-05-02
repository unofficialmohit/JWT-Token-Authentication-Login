const express=require('express');
const userController=require('../controllers/userController')
const router=express.Router();

router.get('/details',userController.displayUsers)
module.exports=router;