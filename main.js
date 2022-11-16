// Convert numbers in percent
function roundNumber(number) {
    return Math.round((number * 100 + Number.EPSILON) * 100) / 100;
}

// Info about Customer Data that get collected von FACE-API
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


// Global variable


// Quality of Collected Data --> def. the limit of data --> take the avg. of the Data (higher the number more accurate calculation of Customer Data)
const DATA_LENGTH = 50;
// How fast calculate new Face Expressions
const TIMER_REDRAW_FACE = 100;
// List of all Customers
const customerData = [];


// VIDEO
// Get the video Element to evaluate the Data
const video = document.getElementById('video');

// Function that start the video
function startVideo() {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: true
        }
    ).then((stream) => {
        video.srcObject = stream
    }).catch((err) => {
        console.error(err)
    });
}

//IMG
const image = document.getElementById('image_01');

//FACE API

// Load all Promise Data
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)


// Print the Data in the console
function printCustomerData(customer) {
    console.log(customerData);
    console.log(" ------------------------------------ Expressions --------------------------------------");
    console.log("Product: " + customer.product);
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


function drawFaceLandmarks(detections, displaySize) {
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

}


video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {

        const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();

        const age = [];
        let counter = 0;


        if (detections !== null) {
            const customer = new Customer(
                image.id,
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

            customerData.push(customer);

            printCustomerData(customer);


            if (customerData.length % DATA_LENGTH === 0) {
                customerData.forEach(createHistogram);

                function createHistogram(item) {
                    age.push(item.age);
                    age.forEach(function (item) {
                        counter += item;
                    })
                }
            } else {
                console.log("not enough data");
            }


        }

    }, TIMER_REDRAW_FACE)

})


startVideo()

