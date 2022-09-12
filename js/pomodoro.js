const focusMinutes = 25;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

const workingStatuses = { 
    "focus" : focusMinutes,
    "shortBreak" : shortBreakMinutes,
    "longBreak": longBreakMinutes
}

let workStatus = "focus";
let statusMinutes = workingStatuses[workStatus];
let timeRemaining = statusMinutes * 60;
let pomodoros = 0;
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
    console.log(workStatus);
}

const onStopButtonClicked = () => {
    clearInterval(intervalID);
    hideStopButton();
}

const onResetButtonClicked = () => {
    clearInterval(intervalID);
    document.getElementById("timeRemaining").innerHTML = `${statusMinutes}:00`;
    timeRemaining = statusMinutes * 60;
    hideStopButton();
}

const updateTimeRemaining = () => {
    timeRemaining--;
    const { minutes, seconds } = formatTime(timeRemaining);
    document.getElementById("timeRemaining").innerHTML = `${minutes}:${seconds}`;
    isTimeFinished();
}

const isTimeFinished = () => {
    if (timeRemaining < 0) {
        if (workStatus === "focus") {
            pomodoros++;
            workStatus = pomodoros % 4 === 0 ? "longBreak" : "shortBreak";
        } else {
            workStatus = "focus";
        }
        statusMinutes = workingStatuses[workStatus];
        timeRemaining = statusMinutes * 60;
        const { minutes, seconds } = formatTime(timeRemaining);

        hideStopButton();
        
        document.getElementById("timeRemaining").innerHTML = `${minutes}:${seconds}`;
        clearInterval(intervalID);
    }
}

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return {
        "minutes": minutes,
        "seconds": seconds
    }
}

document.getElementById("stopButton").hidden = true;