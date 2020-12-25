const request = require('request')

const forecast = (lang, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=1d73759e0ce7dca6d999eee18298e948&query=' + lang + ',' + long + '&units=f'

    console.log('ForeCast Function called.')
    // callback('This is before asynch function, forecast Callback', 'Lets See')
    request({url, json: true}, (error,{body}) => {
        console.log('Request Function is asynchronous, take data from API for weather data.')
        if(error) {
            callback('Unable to connect to the server.', undefined)
        }
        else if (body.error){
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, 'Current temparature ' + Math.round((body.current.temperature)-32/1.8) + '°. WindSpeed is ' + body.current.wind_speed + 'km. Feelslike temperature is: ' + Math.round(body.current.feelslike-32/1.8) + '°.')
        }
    })

    console.log('ForeCast funnction after request Function')

}

module.exports = forecast