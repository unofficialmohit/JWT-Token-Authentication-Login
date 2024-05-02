const User=require('../model/userSchems');
const jwt=require('jsonwebtoken')
const secret="MOHIT";


const login=async (req,res)=>{
const {email,password}=req.body;
const user=await User.findOne({email,password});
if(!user)
{
    return res.status(404).send({message:"User not found"})
}
else
{   const jti = Math.random().toString(36).substr(2, 20);
    // console.log(jti);
    const data={email,password,jti}
    await User.findOneAndReplace({_id:user._id},{username:user.username,email:user.email,password:user.password,jti:jti}, { new: true });
    // const updatedData=await User.findOneAndReplace({_id:user._id},{username:user.username,email:user.email,password:user.password,jti:jti}, { new: true });
    // console.log(updatedData);
    const token=jwt.sign(data,secret);
    return res.status(200).send({token:token});
}
}
const signup=async (req,res)=>{
const {username,email,password}=req.body;
await User.create({
    username,
    email,
    password
})
res.status(200).send({message:"Account Created Succesfully"})

}
const displayUsers=async (req,res)=>{
res.status(200).send(await User.find({}));
}
module.exports={
    login,
    signup,
    displayUsers
}