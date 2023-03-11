const express =require('express');
const app=express();
app.use(express.json()); //used to parse json bodies 
app.use(express.urlencoded({extended:true}))// parse URL-encode bodies using query-string library
const PORT=3000;
const errorLogger=require('./src/utilities/errorlogger');
const requestLogger=require('./src/utilities/requestlogger');
const cors = require('cors')
app.use(cors())
const fileupload = require('express-fileupload');
const router=require('./src/routes/routing')
app.use(fileupload());
app.use(requestLogger)
app.use('/',router)
app.use(errorLogger)
app.listen(PORT,(error)=>{
  if(!error){
        console.log(`Server is Successfully Running, 
                   and App is listening on port  ${PORT}`)}
    else {
        console.log("Error occurred, server can't start", error);}
    
})
