$(document).ready(function(){
	//data
	var games = [
		{
			name: "Piotrowsky Park",
			address: "4247 W 31st St, Chicago, IL 60623",
			type: ["Women's Basketball", "Men's Basketball"],
			level: ["Competitive"],
			coordinates: []
		},
		{
			name: "Vittum Park", 
			address: "5010 W 50th St, Chicago, IL 60638",
			type: ["Women's Basketball"],
			level: ["Competitive"],
			coordinates: []
		},
		{
			name: "Pottawatomie Park",
			address: "7340 N Rogers Ave, Chicago, IL 60626",
			type: ["Women's Basketball"],
			level: ["Recreational" , "Competitive"],
			coordinates: []
		},
		{
			name: "Rauner YMCA",
			address: "2700 S Western Ave, Chicago, IL 60608",
			type: ["Women's Basketball", "Men's Basketball", "Youth Basketball"],
			level: ["Competitive"],
			coordinates: []
		},
		{
			name: "High Ridge YMCA",
			address: "2424 W Touhy Ave, Chicago, IL 60645",
			type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
			level: ["Competitive" , "Recreational"],
			coordinates: []
		},
		{
			name: "Ping Tom Park",
			address: "300 W 19th St, Chicago, IL 60616",
			type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
			level: ["Recreational", "Open Gym"],
			coordinates: []
		},
		{
			name: "McGuane Park",
			address: "2901 S Poplar Ave, Chicago, IL 60608",
			type: ["Men's Basketball", "Youth Basketball"],
			level: ["Recreational", "Open Gym"],
			coordinates: []
		},
		{
			name: "Chase Park",
			address: "4701 N Ashland Ave, Chicago, IL 60640",
			type: ["Women's Basketball"],
			level: ["Competitive"],
			coordinates: []
		},
		{
			name: "Lawndale Christian Fitness Center",
			address: "3750 W Ogden Ave, Chicago, IL 60623",
			type: ["Men's Basketball", "Women's Basketball"],
			level: ["Competitive"],
			coordinates: []
		}   
	]
	$("#results").hide();

//check distance from entered zipcode to location of game
	function checkDistance(zipcode, address) {
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
			data: {
				key: 'AIzaSyCmd0xB_4HTb1gHimgKe97BXOUyCLj9dQA',
				units: "imperial",
				origins: zipcode,
				destinations: address
			},
			dataType: 'json',
			type: 'GET',
			success: function(data){
				console.log("Get success")
				console.log(data.rows[0].elements[0].distance.text.slice(0,-3));
			},
			error: function(error){
				console.log(error);
			}
		});    
	}

//get location of gyms
	function getLocation(address) {
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			data: {
				key: 'AIzaSyCmd0xB_4HTb1gHimgKe97BXOUyCLj9dQA',
				address: address
			},
			dataType: 'json',
			type: 'GET',
			success: function(data){
				console.log("Get success")
			
				var lat = data.results[0].geometry.location.lat
				var lng = data.results[0].geometry.location.lng
				console.log(lat,lng);

				return {lat: lat, lng: lng}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	getLocation(games[0].address); 

//appends results below 
	var showResults = function(results, type, level) {
		console.log(results);
		// Iterate over results, create HTML for each listing, append to #results
		$("#results").empty();
		$("#results").show();
		for (var i = 0; i < results.length; i++) {
			var html = "";
			html += "<p><strong>" + results[i].name + "</strong></p>";
			html += "<p>" + results[i].address + "</p>";
			html += "<p>" + type  + "</p>";
			html += "<p>" + level  + "</p><br>";
			$('#results').append(html);      
		}
	}

//get games that match description
	var getGames = function(type, level, zipcode) {
		var results = []; 
		for (var i = 0; i < games.length; i++) {
			if (games[i].type.indexOf(type) >= 0 && games[i].level.indexOf(level) >= 0) {
				// check for map distance, then order list by distance
				/*checkDistance(zipcode, games[i].address);*/				
				//go thru data to find lat, long on map, then pin points on map
		/*		getLocation(games[i].location);
*/
				games[i].coordinates = getLocation(games[i].address);
				results.push(games[i]);	

			}
			if (results.length === 0) {
				$("#results").append("Sorry, there is no match.");
			} 
			else {
				showResults(results, type, level);
			}
		}
		console.log(results);	
	}
//if there is a match, pinpoint gyms on map (location = gameLocations)
//make locations an array

	$("#information").submit(function(e){
		e.preventDefault();
		var type = $("#type").val();
		var level = $("#level").val();
		var zipcode = $("#zipcode").val();
		getGames(type, level, zipcode);
	});
});