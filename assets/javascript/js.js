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

$(".submit").on('click', function (event) {
    event.preventDefault()
    var trainName = $("#inputTrainName").val()
    var destination = $("#inputDestination").val();
    var firstTrainTime = $('#inputFirstTrainTime').val()
    var frequency = $('#inputFrequency').val()

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
})

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

$("table").append("<tr><td>" +
    snapshot.val().train + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + " minutes</td><td>" + nextTrainArrival + "</td><td>" + minutes + " minutes</td></tr>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
