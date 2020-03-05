const request=require('request')

const forecast=(lat,lan,callback)=>{
    const url = 'https://api.darksky.net/forecast/a9ba97894d7a911a8e21ed8730f3b494/' + lat + ',' + lan +'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.error){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary +'It is currently '+body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+' % chance of rain.')
        }
    })
}


module.exports=forecast