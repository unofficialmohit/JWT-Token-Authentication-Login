const jwt=require('jsonwebtoken');
const secret="MOHIT";
const User=require('../model/userSchems')
const loggedinUserOnly=async (req,res,next)=>{
    // console.log(req.headers.authorization);
    const token=req.headers.authorization?.split(" ");
    if(!token?.[1])
    return res.status(400).send({msg:"NO TOKEN EXIST"})
   try{ 
    const {email,password,jti}=jwt.verify(token[1],secret);
    console.log(jwt.verify(token[1],secret));
    const user=await User.findOne({email,password,jti});
    if(!user)
    {
        return res.status(400).send({msg:"UNAUTHORISED ACCESS"})
    }

    }
   catch(error){
    return res.status(400).send({message:error})
   }

    next();
}
module.exports={loggedinUserOnly}