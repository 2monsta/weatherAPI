$(document).ready(()=>{
	var citiesWeather = [];
	$("#save-data").hide();
	$("#weather-form").submit((event)=>{
		$("#save-data").show();
		event.preventDefault();
		var zipCode = $("#zip-code").val();
		var weatherURL =`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`
		var newHTML= "";
		// console.log(weatherURL);
		$.getJSON(weatherURL, function(weatherData){
			// console.log(weatherData);
			var a = buildRow(weatherData, zipCode);
			// console.log(zipCode);
			$(".data").html(a);

			$(".save-button").click(function(){
				var zip = $(this).attr("zip-data");
				var oldStuff = localStorage.getItem("citiesWeather");
				var oldStuffAsJSON = JSON.parse(oldStuff); /* this is the object array we need to turn it into an array so we can push stuff into it */
				console.log(oldStuffAsJSON);
				if(oldStuffAsJSON == null){
					oldStuffAsJSON = [];
				}
				if(oldStuffAsJSON.indexOf(zip) > -1){

				}else{
					oldStuffAsJSON.push(zip);
					var newStuffAsString = JSON.stringify(oldStuffAsJSON);
					// console.log((newStuffAsString));
					localStorage.setItem("citiesWeather", newStuffAsString);
					// console.log(citiesWeather);
					updateRow();
				}
			})
		});
	});
	function updateRow(){
		$(".data-saved").html("");
		var citiesList = localStorage.getItem("citiesWeather");
		var citiesListAsObject = JSON.parse(citiesList);
		citiesListAsObject.map((city)=>{
			var weatherURL =`https://api.openweathermap.org/data/2.5/weather?zip=${city}&units=imperial&appid=${apiKey}`;
			$.getJSON(weatherURL, (cities)=>{
				var b = buildRow(cities);
				$(".data-saved").append(b);
			})
		})
	}

	function buildRow(weatherData, zipCode){
		var currTemp = weatherData.main.temp;
		var temps = {
			curr: weatherData.main.temp,
			max: weatherData.main.temp_max,
			min: weatherData.main.temp_min
		}
		var name = weatherData.name;
		var icon = weatherData.weather[0].icon;
		newHTML =
					`<tr class="text-center">
						<td><img src="http://openweathermap.org/img/w/${icon}.png">The temp in ${name} is currently ${currTemp}&deg
						</td>`;
				newHTML +=`<td id="max">The daily high is ${temps.max}&deg</td>`;
				newHTML +=`<td id="min">The daily low is ${temps.min}&deg</td>`;
				newHTML+=`<td><button class="save-button btn btn-success" zip-data=${zipCode}>Save</button></td>`
				newHTML += `</tr>`;
		return newHTML;
	}
});