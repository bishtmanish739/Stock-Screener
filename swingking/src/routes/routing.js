const express=require('express');
const routing=express.Router();
const service=require('../service/stockservice');
const fs=require('fs')
const csv = require('csv-parser');
const finalarray=[];
routing.post("/upload", function(req, res, next) {
    const file = req.files.csv;
    // console.log(file);
    file.mv('./src/data/'+file.name,function(err,result){
        if(err) 
        throw err;
      
      fs.createReadStream("./src/data/sec_bhavdata_full.csv")
      .pipe(csv())
      .on('data', function(data){
          try {
               if(data[' SERIES']==' EQ')
              finalarray.push(data)
          }
          catch(err) {
          }
      })
      .on('end',function() {
          // res.send(finalarray)
          const d=service.uploadBhavcopy(finalarray).then(response=>{
            res.send(response);
          }).catch(error=>{
            next(error)
          });
         
      });
  
    })
   })

   routing.get('/alldata',(req,res,next)=>{
    service.getAllData().then(data=>{
        res.send(data);
    }).catch(e=>{
      next(e);
    });
   
   })

module.exports=routing;