const { response } = require('express');
const dblayer=require('../model/stocks')
const stocks={}
stocks.uploadBhavcopy=(bhavcopyArray)=>{
    return dblayer.uploadTodaysBhavcopy(bhavcopyArray).then(response=>{
        return response;
    });
}
stocks.getAllData= async()=>{
    return await dblayer.getAllData().then(response=>{
        return response;
    })
}
module.exports=stocks;