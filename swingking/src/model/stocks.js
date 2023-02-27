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
            // console.log('here');
            let stockSymbol=bhavcopyArray[i]['SYMBOL'];       
            let data=await stockColl.find({stockId:stockSymbol});
            if(data.length>0){
                // console.log('here');
                let res=await stockColl.update({stockId:stockSymbol},{$push:{stockHistory:bhavcopyArray[i]}})
                
            }
            else{
                let stockhistory=[];
                stockhistory.push(bhavcopyArray[i]);
                let obj={
                    "stockId":stockSymbol,
                    "stockHistory":stockhistory
                }
                let res=await stockColl.insertMany([obj]);
               
            }
        }
        
        return {msg:"File Uploaded"};
    } catch (error) {
        throw error;
    }
    
   
}
stock.getAllData=async ()=>{
    const stockColl=await collection.getCollection();
    const data=await stockColl.find({});
    console.log('this is all stock data',data);
    return data;
}
module.exports=stock;