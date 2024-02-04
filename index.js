var startTime, elapsedTime, timerInterval;
var laps = [];

function startTimer() {
    elapsedTime = 0; // Initialize elapsedTime to 0
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        var currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateDisplay(elapsedTime);
    }, 10);

    toggleButtons(true);
}

function stopTimer() {
    clearInterval(timerInterval);
    toggleButtons(false);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    laps = [];
    updateDisplay(elapsedTime);
    updateLaps();
    toggleButtons(false);
}

function lapTimer() {
    if (timerInterval) {
        laps.push(elapsedTime);
        updateLaps();
    }
}

function updateLaps() {
    var lapsList = document.querySelector('.laps-list');
    lapsList.innerHTML = "";
    laps.forEach(function (lapTime, index) {
        var lapItem = document.createElement('li');
        lapItem.textContent = "Lap " + (index + 1) + ": " + formatTime(lapTime);
        lapsList.appendChild(lapItem);
    });
}

function formatTime(time) {
    var milliseconds = Math.floor((time % 1000));
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / 1000 / 60) % 60);
    var hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0') + '.' +
        milliseconds.toString().padStart(3, '0');
}

function updateDisplay(time) {
    var hoursElem = document.querySelector('.hours');
    var minutesElem = document.querySelector('.minutes');
    var secondsElem = document.querySelector('.seconds');
    var millisecondsElem = document.querySelector('.milliseconds');

    var milliseconds = time % 1000;
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / 1000 / 60) % 60);
    var hours = Math.floor((time / 1000 / 60 / 60) % 24);

    hoursElem.textContent = hours.toString().padStart(2, '0');
    minutesElem.textContent = minutes.toString().padStart(2, '0');
    secondsElem.textContent = seconds.toString().padStart(2, '0');
    millisecondsElem.textContent = milliseconds.toString().padStart(3, '0');
}

function toggleButtons(running) {
    document.getElementById('startButton').disabled = running;
    document.getElementById('stopButton').disabled = !running;
    document.getElementById('resetButton').disabled = running;
    document.getElementById('lapButton').disabled = !running;
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('lapButton').addEventListener('click', lapTimer);
