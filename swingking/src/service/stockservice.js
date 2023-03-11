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
stocks.getSymbolData=async(symbol)=>{
    return await dblayer.getSymbolData(symbol).then(response=>{
        //console.log(response);
        return response;
    }).catch(err=>{
        return err;
    })
    
}
stocks.highDeliveryandHighVolume=async()=>{
    return await dblayer.highDeliveryandHighVolume().then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.highVolume=async()=>{
    return await dblayer.highVolume().then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.highDeliveryPer=async()=>{
    return await dblayer.highDeliveryPer().then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.getDataByCustomFilter=async(todayDeliveryPer,avgDeliveryPer30days,todayVolume,avgVolume30Days)=>{
    return await dblayer.getDataByCustomFilter(todayDeliveryPer,avgDeliveryPer30days,todayVolume,avgVolume30Days).then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.getDataByVolume=async(volume)=>{
    return await dblayer.getDataByVolume(volume).then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.getDataByDeliveryPer=async(deliveryPer)=>{
    return await dblayer.getDataByDeliveryPer(deliveryPer).then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
stocks.getallsymbol=async()=>{
    return await dblayer.getAllSymbol().then(response=>{
        return response;
    }).catch(err=>{
        return err;
    })
}
module.exports=stocks;