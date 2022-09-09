const focusMinutes = 25;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

let timeRemaining = focusMinutes * 60;

let intervalID;

const hideStartButton = () => {
    document.getElementById("startButton").hidden = true;
    document.getElementById("stopButton").hidden = false;
}

const hideStopButton = () => {
    document.getElementById("startButton").hidden = false;
    document.getElementById("stopButton").hidden = true;
}

const onStartButtonClicked = () => {
    intervalID = setInterval(updateTimeRemaining, 1000);
    hideStartButton();
}

const onStopButtonClicked = () => {
    clearInterval(intervalID);
    hideStopButton();
}

const onResetButtonClicked = () => {
    clearInterval(intervalID);
    document.getElementById("timeRemaining").innerHTML = `${focusMinutes}:00`;
    timeRemaining = focusMinutes * 60;
}

function updateTimeRemaining() {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById("timeRemaining").innerHTML = `${minutes}:${seconds}`;
    timeRemaining--;
}