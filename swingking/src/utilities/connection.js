const {Schema} =require('mongoose')
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const url='mongodb://127.0.0.1:27017/SwingKing';
    const stockschema=Schema({
        stockId:{
            type:String
           
        },
        stockHistory:[]
       
        
    },
    {collection:'AllStockData',timestamps:true});
    const connection={};
connection.getCollection=async()=>{
    try {
        const database=await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
        const AllStockDataModel=await database.model('AllStockData',stockschema);
        return AllStockDataModel;
    } catch (error) {
        console.log('this is error',error);
        const err=new Error("could not connect to database");
        err.status=500;
        throw err;
    }
}

module.exports=connection;