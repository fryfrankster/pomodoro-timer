const focusMinutes = 1;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

const workingStatuses = { 
    "focus" : focusMinutes,
    "shortBreak" : shortBreakMinutes,
    "longBreak": longBreakMinutes
}

const workStatus = "focus";
const statusMinutes = workingStatuses[workStatus];

let timeRemaining = statusMinutes * 60;

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
    document.getElementById("timeRemaining").innerHTML = `${statusMinutes}:00`;
    timeRemaining = statusMinutes * 60;
}

const updateTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById("timeRemaining").innerHTML = `${minutes}:${seconds}`;
    timeRemaining--;
    isTimeFinished();
}

const isTimeFinished = () => {
    if (timeRemaining <= 0) {
        document.getElementById("timeRemaining").innerHTML = "time expired";
        clearInterval(intervalID);
    }
}

document.getElementById("stopButton").hidden = true;