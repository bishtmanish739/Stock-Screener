const collection=require('../utilities/connection');
const stock={};
stock.generateId=async()=>{
    const stockModel=await collection.getCollection();
    const stockIds=await stockModel.distinct('SYMBOL');

}
stock.addTodaysData=async(symbol,stockdata)=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({symbol});
}
stock.uploadTodaysBhavcopy=async(bhavcopyArray)=>{
    const stockColl=await collection.getCollection();
    try {
        
        for(let i=0;i<bhavcopyArray.length;i++){
            
            let stockSymbol=bhavcopyArray[i]['SYMBOL'];       
            let data=await stockColl.find({stockId:stockSymbol});

            if(data.length>0){
                //data already uploaded 
                //  if(data[0]['stockHistory'][0][" DATE1"]==bhavcopyArray[i][" DATE1"]){
                //     return {msg:"This File Already Uploaded"};
                //  }
                let todayDeliveryPer=Number(bhavcopyArray[i][' DELIV_PER']);                
                let todayVolume=Number(bhavcopyArray[i][' TTL_TRD_QNTY']);                
                let avgVolume30Days=Number(bhavcopyArray[i][' TTL_TRD_QNTY']);
                let avgDeliveryPer30days=Number(todayDeliveryPer);
                let historicData=data[0]['stockHistory'];
                let day=1;
                for(let d=historicData.length-1;d>=0 && day<30;d--){
                    avgDeliveryPer30days+=Number(historicData[d][' DELIV_PER']);
                    avgVolume30Days+=Number(historicData[d][' TTL_TRD_QNTY']);
                    day++;
                }
                avgDeliveryPer30days=(avgDeliveryPer30days/day);
                avgVolume30Days=(avgVolume30Days/day);
                 let res=await stockColl.update({stockId:stockSymbol},{
                     $set: {
                    "todayDeliveryPer": todayDeliveryPer,
                    "avgDeliveryPer30days":avgDeliveryPer30days,
                    "todayVolume":todayVolume,
                    "avgVolume30Days":avgVolume30Days
                },
                $push:{stockHistory:bhavcopyArray[i]}
            })
                
                
            }
            else{
                let stockhistory=[];
                stockhistory.push(bhavcopyArray[i]);
                let todayDeliveryPer=bhavcopyArray[i][' DELIV_PER'];
                let todayVolume=bhavcopyArray[i][' TTL_TRD_QNTY'];
                let avgVolume30Days=bhavcopyArray[i][' TTL_TRD_QNTY'];
                let avgDeliveryPer30days=todayDeliveryPer;
                let obj={
                    "stockId":stockSymbol,
                    "stockHistory":stockhistory,
                    "todayDeliveryPer":todayDeliveryPer,
                    "avgDeliveryPer30days":avgDeliveryPer30days,
                    "todayVolume":todayVolume,
                    "avgVolume30Days":avgVolume30Days
                }
                let res=await stockColl.insertMany([obj]);
               
            }
        }
        
        return {msg:"File Uploaded"};
    } catch (error) {
        console.log(error);
        throw error;
    }
    
   
}
stock.getAllData=async ()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({});
    console.log('this is all stock data',data);
    return data;
}
stock.getSymbolData=async(symbol)=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({stockId:symbol});

    if(data.length==0){
        let e=new Error();
        e.status=404;
        e.msg="Not found"
        throw e;
    }
    return data;
}
stock.getDataByVolume=async(volume)=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({todayVolume:{ $gt: volume } });
    return data;
}
stock.getDataByDeliveryPer=async(deliveryPer)=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({todayDeliveryPer:{ $gt: deliveryPer } });
    return data;
}
stock.getDataByCustomFilter=async(todayDeliveryPer=0,avgDeliveryPer30days=0,todayVolume=0,avgVolume30Days=0)=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({ $and:[{todayDeliveryPer:{ $gt: todayDeliveryPer }},{avgDeliveryPer30days:{ $gt: avgDeliveryPer30days }},{todayVolume:{ $gt: todayVolume }},{avgVolume30Days:{ $gt: avgVolume30Days }} ]});
    return data;
}
stock.highDeliveryPer=async()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({todayDeliveryPer:{$gt:avgDeliveryPer30days}});
    return data;
}
stock.highVolume=async()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({todayVolume:{$gt:avgVolume30Days}});
    return data;
}
stock.highDeliveryandHighVolume=async()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({$and:[{todayVolume:{$gt:avgVolume30Days}},{todayDeliveryPer:{$gt:avgDeliveryPer30days}}]});
    return data;
}
stock.getAllSymbol=async()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({});
    let symbol=[];
    for(let i=0;i<data.length;i++){
       symbol.push(data[i]['stockHistory'][0]['SYMBOL'])
    }
    return symbol;
}

module.exports=stock;