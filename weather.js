var express = require('express');
var app = express();

var request = require('request');

app.use(express.static('public'));
app.set("view engine" , "ejs");

app.get('/',function(req,res){
   res.render('search');
});


app.get('/result',function(req,res){

	var query = req.query.city;
	var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiYmpvaG5zb24xIiwiYSI6ImNqeDNqcjZpMzBkNXY0OHJ6YzY3aTU4MDIifQ.u9d5kP0NglZmW3mtW2_mAw&limit=1`
    var weather_url;
    request(url,function(error , response , body)
	{
		if (!error && response.statusCode == 200) 
		{
			var data = JSON.parse(body)['features'];
			var long = data[0].center[0];
			var lat =data[0].center[1];
			weather_url = `https://api.darksky.net/forecast/f3d23e78e546cfdca4ac38c9975bc739/${lat},${long}`;  
		

			request(weather_url,function(error,response,body)
			{
				if (!error && response.statusCode == 200) {
					var data1 = JSON.parse(body);
					res.render('result' , {data1:data1});
				}
			})
		    
			

		}
	})
       
      


});

app.listen(3000 , function(req,res){
   console.log('server is running on port 3000....');
});