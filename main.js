Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

Webcam.attach('#webcam-container');

function captureImage() {
    Webcam.snap(function (data_uri) {
        document.getElementById('captured-image-container').innerHTML =
            '<img src="' + data_uri + '" id="captured-image">';
    });
}

function identifyImage() {
    var capturedImageData = document.getElementById('captured-image').src;


    var modelLink = 'YOUR_MODEL_LINK';
    

    fetch(modelLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: capturedImageData }),
    })
    .then(response => response.json())
    .then(data => {
        var resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = 'Result: ' + data.class_name + ', Accuracy: ' + (data.confidence * 100).toFixed(2) + '%';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
