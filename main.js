  camera1 = document.getElementById("camera"); 
  Webcam.set({ 
    width:360,
    height:250,
    image_format : 'jpeg', 
    jpeg_quality:90
  });

    Webcam.attach(camera1) ;

  function takesnapshot() { 
     Webcam.snap(function(data_uri) { 
         document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>'; }); 
  }

  console.log('ml5.version' , ml5.version)

  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pjBjt3due/model.json",modelLoaded) ;

  function modelLoaded() {
    console.log("modelLoaded");
  }

  function speak() {
     var synth = window.speechSynthesis ;
     speak_data_1 = "Your prediction 1 is" + prediction1 ;
     speak_data_2 = "And your prediction 2 is" + prediction2 ;
     var utterthis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2) ;
     synth.speak(utterthis) ;
  }

  function check() {
    img = document.getElementById('selfie_image') ;
    classifier.classify(img, gotResult) ;
}

function gotResult(error,results) {
    if (error) {
        console.error(error) ;
    }
    else {
        console.log(results) ;
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak() ;
        if (results[0].label == "victory") {
          document.getElementById("update_emoji").innerHTML = "&#9996;" ;
        }
        
        if (results[0].label == "raised hand") {
          document.getElementById("update_emoji").innerHTML = "&#9995;" ;
        }
        
        if (results[0].label == "raised rist") {
          document.getElementById("update_emoji").innerHTML = "&#9994;" ;
        }

        if (results[0].label == "airplane") {
          document.getElementById("update_emoji").innerHTML = "&#9992;" ;
        }
      
        if (results[1].label == "victory") {
          document.getElementById("update_emoji2").innerHTML = "&#9996;" ;
        }
        
        if (results[1].label == "raised hand") {
          document.getElementById("update_emoji2").innerHTML = "&#9995;" ;
        }
        
        if (results[1].label == "raised rist") {
          document.getElementById("update_emoji2").innerHTML = "&#9994;" ;
        }

        if (results[0].label == "airplane") {
          document.getElementById("update_emoji").innerHTML = "&#9992;" ;
        }
    }
  }