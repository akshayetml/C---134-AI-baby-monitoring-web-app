img="";
status="";
sound="";
objects= [];

function preload(){
    sound=loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status : Detecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video, gotresult);
        for(i=0; i < objects.length;i++) {
            document.getElementById("status").innerHTML="status : object detected";
            document.getElementById("number").innerHTML="number of objects detected = "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ " " +percent+ "%" ,objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if (objects[i].label=="person") {
            document.getElementById("number").innerHTML=" Baby is found ";
            console.log("stop");
            sound.stop();
            }
             else{
                document.getElementById("number").innerHTML=" Baby is not found ";
                console.log("play");
                sound.play();
             }

             if (objects.length==0) {
                document.getElementById("number").innerHTML=" Baby is not found ";
                console.log("play");
                sound.play();
                }
        }
    }

}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
}


function gotresult(error,result){
    if (error) {
        console.log(error);
    }
    console.log(result)

    objects=result;
}