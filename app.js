const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.90, // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.mozGetUserMedia;


// Select everything in HTML
const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                    video.srcObject = stream;
                    setInterval(runDetection, 1000)
                },
                err => console.log(err)
            );
        }
    });

function runDetection() {
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            if (predictions.length > 0) {
                const utterance = new SpeechSynthesisUtterance("Don't touch your face");
                utterance.rate = 1;
                speechSynthesis.speak(utterance);
                alert("Don't touch your face!");
            }
        });
}


handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });

function notifyMe() {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
        notify();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                notify();
            }
        });
    }

    function notify() {
        var notification = new Notification('TITLE OF NOTIFICATION', {
            icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
            body: "Hey! You are on notice!",
        });

        notification.onclick = function() {
            window.open("http://carnes.cc");
        };
        setTimeout(notification.close.bind(notification), 7000);
    }

}