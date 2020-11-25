const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/ee3f63731d6dfcd5c6b35442cd480c08/'+ latitude +','+ longitude +'?units=si'


    request({url, json:true},(error, {body})=>{
        if(error){
        callback('Unable To connect location Service!',undefined)
        }else if(body.error){
            callback('Location not Found!',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+ body.currently.temperature + ' degrees out. Thare is a '+ body.currently.precipProbability + '% chance of Rain'
            )
        }
    })
}

module.exports = forecast