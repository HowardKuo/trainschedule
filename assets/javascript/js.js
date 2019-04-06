// Initialize Firebase
var config = {
    apiKey: "AIzaSyDootVWEkawCfW5f_FyOC1iZDTwXx0Qhz8",
    authDomain: "trainschedule-c6e51.firebaseapp.com",
    databaseURL: "https://trainschedule-c6e51.firebaseio.com",
    projectId: "trainschedule-c6e51",
    storageBucket: "",
    messagingSenderId: "212432660436"
};
firebase.initializeApp(config);

var database = firebase.database();

function onClick() {
    $(".submit").on('click', function (event) {
        event.preventDefault()
        var trainName = $("#inputTrainName").val().trim();
        var destination = $("#inputDestination").val().trim();
        var firstTrainTime = $('#inputFirstTrainTime').val().trim();
        var frequency = $('#inputFrequency').val().trim();

        // console.log(trainName)
        // console.log(destination)
        // console.log(firstTrainTime)
        // console.log(frequency)

        database.ref().push({
        train: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        document.getElementById("trainForm").reset();
    })
}

database.ref().on("child_added", function(snapshot) {
// console.log(snapshot.val().train);
// console.log(snapshot.val().destination);
// console.log(snapshot.val().firstTrainTime);
// console.log(snapshot.val().frequency);

var tempTime = snapshot.val().firstTrainTime;
var tempFormat = "hh:mm";
var tempFrequency = snapshot.val().frequency;
var convertedTime = moment(tempTime, tempFormat);
var diffTime = moment().diff(convertedTime, "minutes");
var timeRemainder = diffTime % tempFrequency ;
var minutes = tempFrequency - timeRemainder;
var nextTrainArrival = moment().add(minutes, "m").format(tempFormat); 

// console.log(diffTime);
// console.log(timeRemainder);
// console.log(minutes);
// console.log(nextTrainArrival);

$("table").append("<tr><td>" + snapshot.val().train + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + " minutes</td><td>" + nextTrainArrival + "</td><td id='updateMin'>" + minutes + " minutes</td></tr>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// var nIntervId; //<----make a global var in you want to stop the timer
// //-----with clearInterval(nIntervId);
// function updateTime() {
//     nIntervId = setInterval(flashTime, 1000*60); //<---prints the time 
// }                                                //----after every minute

// function flashTime() {
//     var now = new Date();
//     var h = now.getHours();
//     var m = now.getMinutes();
//     var time = h + ' : ' + m;
//     $('#updateMin').html(time); //<----updates the time in the $('#my_box1') [needs jQuery]                
// }                             

// $(function() {
//     updateTime();
// });
