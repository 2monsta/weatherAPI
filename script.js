$(document).ready(()=>{
	
	$("#weather-form").submit((event)=>{
		event.preventDefault();
		var zipCode = $("#zip-code").val();

		var weatherURL =`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`
		console.log(weatherURL);
		$.getJSON(weatherURL, function(weatherData){
			console.log(weatherData);
		});
	})
})