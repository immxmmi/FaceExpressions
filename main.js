function roundNumber(number) {
    return Math.round((number * 100 + Number.EPSILON) * 100) / 100;
}

class Customer {
    constructor(product, gender, genderProbability, age, angry, disgusted, fearful, happy, neutral, sad, surprise) {
        this.product = product;
        this.gender = gender;
        this.genderProbability = roundNumber(genderProbability);
        this.age = roundNumber(age / 100);
        this.angry = roundNumber(angry);
        this.disgusted = roundNumber(disgusted);
        this.fearful = roundNumber(fearful);
        this.happy = roundNumber(happy);
        this.neutral = roundNumber(neutral);
        this.sad = roundNumber(sad);
        this.surprise = roundNumber(surprise);
    }
}
//const video = document.getElementById('video')

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
        (stream) => {
            const video = document.querySelector('video');
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
            };
        },
        (err) => {
            console.error(`The following error occurred: ${err.name}`);
        }
    );
} else {
    console.log("getUserMedia not supported");
}











/*

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}











startVideo()


/*
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)



video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();//.withFaceDescriptor()
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


        if (detections != null) {
            const customer = new Customer(
                "Chips",
                detections.gender,
                detections.genderProbability,
                detections.age,
                detections.expressions.angry,
                detections.expressions.disgusted,
                detections.expressions.fearful,
                detections.expressions.happy,
                detections.expressions.neutral,
                detections.expressions.sad,
                detections.expressions.surprised,
            );

            console.log(customer);

            console.log(" ------------------------------------ Expressions --------------------------------------");
            console.log("Gender: " + customer.gender + " zu " + customer.genderProbability + "%");
            console.log("Age: " + customer.age);
            console.log("Angry: " + customer.angry + "%");
            console.log("Disgusted: " + customer.disgusted + "%");
            console.log("Fearful: " + customer.fearful + "%");
            console.log("Happy: " + customer.happy + "%");
            console.log("Neutral: " + customer.neutral + "%");
            console.log("Sad: " + customer.sad + "%");
            console.log("Surprise: " + customer.surprise + "%");
            console.log("---------------------------------------------------------------------------------------");

        }

    }, 100)
})
*/
