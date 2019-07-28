var request = require('request')
const GeoCode = (address,callback)=>{
    const geourl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?limit=1&access_token=pk.eyJ1IjoiYW5raXR0eWFnaSIsImEiOiJjanlpOHJmcTUwNzZ3M2RtcHM2aThoMmdoIn0.JGHMOt8avjvejjC61UMF9w";
    var data={
        Longitude:0,
        Latitude:0,
        location:''
    }
  
    request({url:geourl,json:true},(error,response)=>{
        if(error){
      console.log(error);
      callback("Error from lower level "+error,undefined);
        }
        else if(response.body.error){
             console.log("Error from response"+response.body.error);
             callback("Error from response",undefined);
        }
        else{
            data.Latitude=response.body.features[0].center[0];
            data.Longitude=response.body.features[0].center[1];
            data.location=address;
            return callback(data);
             console.log("Longitude - "+response.body.features[0].center[0]);
             console.log("Latitude - "+response.body.features[0].center[1]);
        }
      });
  
}


const GetWeather=(cordinates,callback)=>{
    const url="https://api.darksky.net/forecast/b4c14123476f8d35b20ac51f7794440b/"+cordinates.Longitude+","+cordinates.Latitude;


  request({url:url,json:true},(error,response)=>{
        
       // console.log(data.currently);
       var data={
           temperature:0.0,
           precipProbability:0.0
       }
       if(error){
        console.log(error);
        callback("Error from low level",undefined);
         }
         else if(response.body.error){
          console.log("error");
          callback("Error from response result ",undefined);
         }
       else{
        data.temperature= response.body.currently.temperature;
        data.precipProbability=response.body.currently.precipProbability;
        console.log(data.location);
        //console.log('It is currently '+response.body.currently.temperature+' degree out. There is '+response.body.currently.precipProbability+'% chance of rain');
        callback('It is currently '+response.body.currently.temperature+' degree out. There is '+response.body.currently.precipProbability+'% chance of rain in '+cordinates.location);
         
         }
        
       }
)
}

module.exports= {GeoCode:GeoCode,GetWeather:GetWeather}
// module.exports={
//     GeoCode:GeoCode,
//     GetWeather:GetWeather
// }

// GeoCode("Muzaffarnagar",(data)=>{
//         console.log(data);
// })