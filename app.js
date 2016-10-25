$(document).ready(function(){
	var games = [
					{
						name: "Piotrowsky Park",
						location: "4247 W 31st St, Chicago, IL 60623",
						type: ["Women's Basketball", "Men's Basketball"],
						level: ["Competitive"]
					},
					{
						name: "Vittum Park", 
						location: "5010 W 50th St, Chicago, IL 60638",
						type: ["Women's Basketball"],
						level: ["Competitive"]
					},
					{
						name: "Pottawatomie Park",
						location: "7340 N Rogers Ave, Chicago, IL 60626",
						type: ["Women's Basketball"],
						level: ["Recreational" , "Competitive"]
					},
					{
						name: "Rauner YMCA",
						location: "2700 S Western Ave, Chicago, IL 60608",
						type: ["Women's Basketball", "Men's Basketball", "Youth Basketball"],
						level: ["Competitive"]
					},
					{
						name: "High Ridge YMCA",
						location: "2424 W Touhy Ave, Chicago, IL 60645",
						type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
						level: ["Competitive" , "Recreational"]
					},
					{
						name: "Ping Tom Park",
						location: "300 W 19th St, Chicago, IL 60616",
						type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
						level: ["Recreational", "Open Gym"]
					},
					{
						name: "McGuane Park",
						location: "2901 S Poplar Ave, Chicago, IL 60608",
						type: ["Men's Basketball", "Youth Basketball"],
						level: ["Recreational", "Open Gym"]
					},
					{
						name: "Chase Park",
						location: "4701 N Ashland Ave, Chicago, IL 60640",
						type: ["Women's Basketball"],
						level: ["Competitive"]
					},
					{
						name: "Lawndale Christian Fitness Center",
						location: "3750 W Ogden Ave, Chicago, IL 60623",
						type: ["Men's Basketball", "Women's Basketball"],
						level: ["Competitive"]
					}		
				]
//get distance from entered zipcode to location of game

    $.ajax({
		url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
		data: {
			key: 'AIzaSyCmd0xB_4HTb1gHimgKe97BXOUyCLj9dQA',
			units: "imperial",
			origins: zipcode,
			destinations: games[0].location
		},
		dataType: 'json',
		type: 'GET',
		success: function(data){
			console.log("Get success")
			console.log(data);
		},
		error: function(error){
			console.log(error);
      	}
    });   	

    var results = [];
    
//if value of entered type and level match array, then display in a table
	var getGames = function() {
		for (var i = 0; i < games.length; i++) {
			for (var j = 0; j < games[i].type.length; j++) {
				if (type === games[i].type[j]) {
					for (var k = 0; k < games[i].level.length; k++)	{
						if (level === games[i].level[k]) {
							results.push(games[i].name, games[i].type[j], games[i].level[k], games[i].location);
							$("#results").append(results);
							gameLocation = games[i].location;
							console.log(gameLocation);
						}
						else {
							$("#results").append("Sorry, there is no match.");
						}
					}		
			}
		}	
	}

	$("#information").submit(function(e){
		e.preventDefault();
		var type = $("#type").val();
		var level = $("#level").val();
		var zipcode = $("#zipcode").val();
		getGames();
	});
				}

	console.log(zipcode);
//if there is a match, pinpoint gyms on map (location = gameLocation)

//order gyms by distance to zipcode

});