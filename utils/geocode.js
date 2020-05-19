const request = require('postman-request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnV0dmlrMiIsImEiOiJja2E2MDJ1dWQwMm9iMnRwYWo0OGF0YWxpIn0.aY2rNK14iypaBJgXNmmSyw&limit=1`
    request({url : url, json : true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to geocoding servers', undefined)
        }
        else{
            const {features} = body
            if(features.length === 0){
                callback("Unable to find location", undefined)
            }
            else{
                callback(undefined, {
                    latitude : features[0].center[1],
                    longitude : features[0].center[0],
                    location : features[0].place_name
                })
            }
        }
    })
}
module.exports = geocode