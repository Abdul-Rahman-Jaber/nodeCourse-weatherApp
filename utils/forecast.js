const request = require('request')

const forecast = (latitude, longtitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec387ec5ffaf9a78fa3ee226ff94011d&query=' + latitude + ',' + longtitude + '&units=f'
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to forecast services', undefined)
        } else if(body.error){
            callback('Unable to find the coordinates', undefined)
        } else {
            const result = body.current.weather_descriptions[0] + ". Tempreture is "+ body.current.temperature + ". And feelsLike is : " + body.current.feelslike
            callback(undefined, result)
        }
    })
}


module.exports = forecast