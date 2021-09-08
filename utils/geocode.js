const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=2&access_token=pk.eyJ1Ijoic3dpZnRhbmRnZW50bGUiLCJhIjoiY2tzenh1bHpnMDNuZzJ1cDlmNWhtMWZlaCJ9.mM0rSAL7RwHDgdynS6YhLg"
    request({url, json: true} ,(error, {body}) => {
    if (body.features.length > 0) {
        if (error) {
            callback("Unable to connect to geocoding service!", undefined)
         } else if (body.features.length == 0) {
             callback("Unable to find location. Try another search", undefined)
         } else {
             callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
             })
         }
    }
})
}


module.exports = geocode