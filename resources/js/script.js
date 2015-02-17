
var number_of_octaves = 4;
var score = 0;
var total = 0;
var sound_level = ["x",1,2,3,4,5]
var volume = 0

var key_names = ["c","cs","d","ds","e","f","fs","g","gs","a","as","b"]
var white_keys = ["c","d","e","f","g","a","b"]
var sharp_keys = ["c","d","f","g","a"]
var flat_keys = ["d","e","g","a","b"]
var treble_notes = ["b4","a4","g4","f4","e4","d4","c4","b3","a3","g3","f3","e3","d3","c3"]
var bass_notes = ["b2","a2","g2","f2","e2","d2","c2","b1","a1","g1","f1","e1","d1","c1"]
var four_octaves = ["b4","a4","g4","f4","e4","d4","c4","b3","a3","g3","f3","e3","d3","c3","b2","a2","g2","f2","e2","d2","c2","b1","a1","g1","f1","e1","d1","c1"]

function displayName(position){
	//gives keynames sharp and flat symbols
	if(key_names[position].length == 2) {	
			if(Math.random()>0.5){
				return key_names[position][0] + "♯"
			}else{
				return key_names[position+1][0] + "♭"
			};
	}else{
		return key_names[position]
	};
}
function userDisplay(){
	$("#menu").css("display","none");
	$("#user").css("display","inline-block");
	$("#keyboard_holder").css("display","inline-block");
	
}	
function generateClef(type){
	$("#question").html("<div id = 'note'></div><table><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr></table>");
	switch (type){
		case "?trebleClef":
			$("#question").prepend("<p class = 'trebleClef'>𝄞</p>")
			$("table").prepend("<tr><td/><td id = 'top'/><td/></tr>")
			$("table").append("<tr><td/><td id = 'mid_bottom'/><td/></tr>")
		break;
		case "?bassClef":
			$("#question").prepend("<p class = 'bassClef'>𝄢</p>");
			$("table").prepend("<tr><td/><td id = 'mid_top'/><td/></tr>")
			$("table").append("<tr><td/><td id = 'bottom'/><td/></tr><tr><td/><td id = 'bottom_two'/><td/></tr>");

		break;
		case "?bothClefs":
			$("#user, #question, #score").css("height","160px")
			$("#keyboard_holder").css("top","30%")
			$("#question").prepend("<p class = 'trebleClef'>𝄞</p><br><p class = 'bassClef'>𝄢</p>")
			$(".bassClef").css("top","69px")
			$("#score p").css("line-height","4em")
			$("table").prepend("<tr><td/><td id = 'top'/><td/></tr>")
			$("table").append("<tr><td/><td id = 'mid_bottom'/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td/><td/></tr><tr><td/><td id = 'bottom'/><td/></tr><tr><td/><td id = 'bottom_two'/><td/></tr>")
		break;
	}
}
function updateNote(type){
	//decide flat sharp or normal
		if(Math.random()>0.4){
			if(Math.random()>0.5){
				$("#note").html("<p>♭</p>")
				var variant = "flat"
			}else{
				$("#note").html("<p>♯</p>")
				var variant = "sharp"
			}
		}else{
			$("#note").html("")
			var variant = "normal"
		}

		switch (type){
			case "?keyNames":
				var randomNote = Math.floor(Math.random()*key_names.length)
				var answerNote = key_names[randomNote]
				$("#question").html("<p>" + displayName(randomNote) + "</p>")
				variant = "normal"
			break;
			case "?trebleClef":
				var randomNote = Math.floor(Math.random()*treble_notes.length)
				var answerNote = treble_notes[randomNote]
				$("#note").css("top",10+5*randomNote)

			break;
			case "?bassClef":
				var randomNote = Math.floor(Math.random()*bass_notes.length)
				var answerNote = bass_notes[randomNote]
				$("#note").css("top",20+5*randomNote)	
			break;
			case "?bothClefs":
				var randomNote = Math.floor(Math.random()*four_octaves.length)
				var answerNote = four_octaves[randomNote]
				$("#note").css("top",10+5*randomNote)
			break;
		}

	lineDisplay(answerNote)
	var OK = false;

		switch (variant){
			case "sharp":
				for (i=0; i<sharp_keys.length;i++){
					if( sharp_keys[i]== answerNote[0]){
						answerNote = answerNote[0] + "s" + answerNote [1]
						OK = true;
					}
				}
			break;
			case "flat":
				for (i=0; i<flat_keys.length;i++){
					if( flat_keys[i]== answerNote[0]){
						for (i=0; i<white_keys.length;i++){
							if( white_keys[i]== answerNote[0]){
								answerNote = white_keys[i-1] + answerNote[1]
							}
						}
						answerNote = answerNote[0] + "s" + answerNote [1]
						OK = true;
					}
				}
			break;
		}

		if (!OK){$("#note").html("")}

	return answerNote

}

function lineDisplay(note){
	$("#top, #mid_top").css("border-top","1px solid #fafafa")
	$("#mid_bottom, #bottom, #bottom_two").css("border-bottom","1px solid #fafafa")

		if (note == "a4" || note == "b4"){
			$("#top").css("border-top","1px solid black")
		}else if (note == "b3" || note == "c3" || note == "d3" ){
			$("#mid_top").css("border-top","1px solid black")
			$("#mid_bottom").css("border-bottom","1px solid black")
		} else if(note == "e1" || note == "d1"){
			$("#bottom").css("border-bottom","1px solid black")
		} else if(note == "c1"){
			$("#bottom").css("border-bottom","1px solid black")
			$("#bottom_two").css("border-bottom","1px solid black")
		}
}

function flash(object,times,speed,color){
	var originalColor = object.css("background-color");
	for (i=0;i<times;i++){
			setTimeout(function(){object.css("background-color",color)},speed*i*2)
			setTimeout(function(){object.css("background-color",originalColor)},speed*((i*2)+1))
	}
}

$(document).ready(function(){

	$("#speaker_out").html(sound_level[volume])

	var selection = window.location.search
		if(selection != ""){	

			//generates keyboard
				for(i = 1; i<= number_of_octaves;i++){
					$("#keyboard_holder").append("<div class = 'octave' id = '" + i + "'></div>")
						for(j = 0; j< key_names.length;j++){
							var color = "white"
								if (key_names[j].length == 2){color = "black"}
				 			$("#" + i).append("<div class = '" + key_names[j] + " " + i + " key " + color + "'></div>")
						}
				}



			generateClef(selection)
			var answerNote = updateNote(selection)
			userDisplay()

				$(".key").click(function(){

					var clickedKey = $(this).attr("class").split(" ")[0] +$(this).attr("class").split(" ")[1]
					
					if(volume > 0){
						var audio = $("#" + clickedKey)[0];
						audio.currentTime = 0;
						audio.volume = volume/5;
						audio.play();
					}

					if (selection == "?keyNames"){clickedKey= clickedKey.substring(0,(clickedKey.length-1))}
					total++		
					console.log("clicked: " + clickedKey + " , answer: " + answerNote)
						if (clickedKey == answerNote){
							$("#score").css("background-color","#2a2")
							score++
						}else{
							$("#score").css("background-color","#e22")
								if (selection == "?keyNames"){
									answerKey = $("." + answerNote)
								}else{
									answerKey = $("."+ answerNote.substring(0,answerNote.length-1) +"."+ answerNote[answerNote.length-1] )
								}
							flash(answerKey,5,100,"#4da");
						}
					answerNote = updateNote(selection)
					$("#score p").html(score + "/" + total);
				});

		}

	$("#mute").click(function(){
		volume++
			if (volume > 6){volume = 0}
		$("#speaker_out").html(sound_level[volume])
	})
})