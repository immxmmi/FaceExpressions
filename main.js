const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

function roundNumber(number) {
    return Math.round((number * 100 + Number.EPSILON) * 100) / 100;
}

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
            console.log(" ------------------------------------ Expressions --------------------------------------")
            console.log("Gender: " + detections.gender + " zu " + roundNumber(detections.genderProbability) + "%");
            console.log("Age: " + detections.age);
            console.log("Angry: " + roundNumber(detections.expressions.angry) + "%");
            console.log("Disgusted: " + roundNumber(detections.expressions.disgusted) + "%");
            console.log("Fearful: " + roundNumber(detections.expressions.fearful) + "%");
            console.log("Happy: " + roundNumber(detections.expressions.happy) + "%");
            console.log("Neutral: " + roundNumber(detections.expressions.neutral) + "%");
            console.log("Sad: " + roundNumber(detections.expressions.sad) + "%");
            console.log("Surprise: " + roundNumber(detections.expressions.surprised) + "%");
            console.log("---------------------------------------------------------------------------------------")
        }


    }, 1000)
})
