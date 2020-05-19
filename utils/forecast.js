const request = require('postman-request')

forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=791ae8447d095d1db79d389e66dfd165&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`
    request({ url : url, json : true }, (error, {body} = {}) => {
        if(error){
            callback("Unable to connect to weather server", undefined)
        }
        else{
            const {error, current} = body
            if(error){
                callback(error, undefined)
            }
            else{
                callback(undefined, {
                    description: current.weather_descriptions[0],
                    currentTemp: current.temperature,
                    currentFeelsLike: current.feelslike
                })
            }
        }
    })
}

module.exports = forecast