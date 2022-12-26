video = "";
status = "";
object = [];
input_text = "Dog";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function mobelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop( );
    video.speed(1);
    video.volumn(0);
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', mobelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
   }

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(object[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].x, objects[i].width, objects[i].height)
            document.getElementById("number_of_object").innerHTML = "Number of objects detected are : "+ objects;
            if(objects[i].label == input_text){
                video.stop();
                objectDetector.detect(gotResult);
                ocument.getElementById("object_found").innerHTML = input_text + "found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            } else{
                ocument.getElementById("object_found").innerHTML = input_text + "found";
            }
        }
    }


}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}