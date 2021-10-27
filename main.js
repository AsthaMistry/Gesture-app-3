prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

Camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    }
        );
}
console.log('ml5version:',ml5.version);
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IA9sdrfzf/model.json', modelLoaded);

function modelLoaded(){
    console.log('modelLoaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_1 = "The first prediction is"+prediction;
    var uttterthis = new SpeechSynthesisUtterance(speak_1);
    synth.speak(uttterthis);
}

function check(){
    img = document.getElementById("captured_image");
    Classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error); 
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    }
}