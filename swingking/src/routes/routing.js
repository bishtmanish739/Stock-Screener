const express=require('express');
const routing=express.Router();
const service=require('../service/stockservice');
const fs=require('fs')
const csv = require('csv-parser');
const { response } = require('express');
const e = require('express');
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
               if(data[' SERIES']==' EQ' && data[' DELIV_PER']>0 &&data[' DELIV_PER']!=' -'
               && data[' TTL_TRD_QNTY']>0 &&data[' TTL_TRD_QNTY']!=' -'){

              
                
                data[' DATE1']=new Date(data[' DATE1']);
                data[' PREV_CLOSE']=Number(data[' PREV_CLOSE']);
                data[' OPEN_PRICE']=Number(data[' OPEN_PRICE']);
                data[' HIGH_PRICE']=Number(data[' HIGH_PRICE']);
                data[' LOW_PRICE']=Number(data[' LOW_PRICE']);
                data[' LAST_PRICE']=Number(data[' LAST_PRICE']);
                data[' CLOSE_PRICE']=Number(data[' CLOSE_PRICE']);
                data[' AVG_PRICE']=Number(data[' AVG_PRICE']);
                data[' TTL_TRD_QNTY']=Number(data[' TTL_TRD_QNTY']);
                data[' TURNOVER_LACS']=Number(data[' TURNOVER_LACS']);
                data[' NO_OF_TRADES']=Number(data[' NO_OF_TRADES']);
                data[' DELIV_QTY']=Number(data[' DELIV_QTY']);
                data[' DELIV_PER']=Number(data[' DELIV_PER']);
                
              finalarray.push(data)
            }
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
   routing.get('/allsymbol',function(req,res,next){
    service.getallsymbol().then(response=>{
      res.send(response);
    }).catch(err=>{
      next(err)
    })
   })
   //query param
   routing.get("/stock/:symbol",function(req,res,next){
   
      service.getSymbolData(req.params.symbol).then(response=>{
       
       res.send(response)
      })
      
    
   })
   //query String 
   routing.get("/stock",function(req,res,next){
      let symbol=req.query.symbol;
      let volume=req.query.volume;
      res.send([symbol,volume]);
   })
   routing.get('/highdelivery',function(req,res,next){
    service.highDeliveryPer().then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })

   routing.get('/highvolume',function(req,res,next){
    service.highVolume().then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })
   routing.get('/highdelhighvol',function(req,res,next){
    service.highDeliveryandHighVolume().then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })

   routing.post('/customfilter',function(req,res,next){
    service.getDataByCustomFilter(req.body.todayDeliveryPer,req.body.avgDeliveryPer30days,req.body.todayVolume,req.body.avgVolume30Days).then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })
   
   routing.post('/getbyvolume',function(req,res,next){
    service.getDataByVolume(req.body.volume).then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })

   routing.post('/getbydelper',function(req,res,next){
    service.getDataByDeliveryPer(req.body.DeliveryPercentage).then(response=>{
      return res.send(response);
    }).catch(err=>{
      next(err);
    })
   })

module.exports=routing;