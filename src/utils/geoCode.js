const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZXhwaWFyIiwiYSI6ImNrajFtODJxZzR2aG4ycmxiZ3NnOWF1ZWwifQ.t-2dmwzg0cgm8sntLdPHHQ&limit=1'

    console.log('Geo Function is called.')
    // callback('This is before asynch function, GeoCode CallBack', 'Lets See')
    request({url, json: true}, (error, {body}) => {
        console.log('Request Function is asynchronous, Take data from API for Lang and Long.')
        if(error) {
            callback('Can not connected to server.', undefined)
        } else if(body.features.length === 0){
            callback('Can not find the location', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

        
    })

    console.log('GeoCode function after request.')

}



module.exports = geoCode