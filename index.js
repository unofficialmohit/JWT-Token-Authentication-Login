const express=require('express');
const app=express();
const PORT=4000;
app.use(express.json());
const database=require('./database/database');
const loginRoute=require('./routes/loginRoute');
const signupRoute=require('./routes/signupRoute');
const displayRoute=require('./routes/userDetailsRoute');
const authentication=require('./middleware/authentication');
app.use(loginRoute);
app.use(signupRoute);
app.use(authentication.loggedinUserOnly,displayRoute);


app.listen(PORT,()=>{
    console.log("Listening to Port "+PORT)
});