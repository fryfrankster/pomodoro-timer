const focusMinutes = 25;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

const workingStatuses = { 
    focus: focusMinutes,
    shortBreak: shortBreakMinutes,
    longBreak: longBreakMinutes
}

let workStatus = "focus";
let statusMinutes = workingStatuses[workStatus];
let timeRemaining = statusMinutes * 60;
let pomodoros = 0;
let intervalID;

const stopButton = document.getElementById("stop-button");
const startButton = document.getElementById("start-button");
const timeRemainingEl = document.getElementById("time-remaining");

stopButton.hidden = true;

const hideStartButton = () => {
    startButton.hidden = true;
    stopButton.hidden = false;
}

const hideStopButton = () => {
    startButton.hidden = false;
    stopButton.hidden = true;
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
    timeRemainingEl.innerText = `${statusMinutes}:00`;
    timeRemaining = statusMinutes * 60;
    hideStopButton();
}

const updateTimeRemaining = () => {
    timeRemaining--;
    const { minutes, seconds } = formatTime(timeRemaining);
    timeRemainingEl.innerText = `${minutes}:${seconds}`;
    if (timeRemaining < 0) {
        updateWorkStatus()
    }
}

const updateWorkStatus = () => {
    if (workStatus === "focus") {
        pomodoros++;
        workStatus = pomodoros % 4 === 0 ? "longBreak" : "shortBreak";
    } else {
        workStatus = "focus";
    }

    updateBackground();

    statusMinutes = workingStatuses[workStatus];
    timeRemaining = statusMinutes * 60;
    const { minutes, seconds } = formatTime(timeRemaining);

    hideStopButton();
    
    timeRemainingEl.innerText = `${minutes}:${seconds}`;
    clearInterval(intervalID);
}

const updateBackground = () => {
    let backgroundColor;
        switch (workStatus) {
            case "focus":
                backgroundColor = "red";
                break
            case "shortBreak":
                backgroundColor = "orange";
                break
            case "longBreak":
                backgroundColor = "blue";
                break
        }
    document.documentElement.style.setProperty("--background-color", backgroundColor);
}

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return { minutes, seconds };
}

const {minutes, seconds} = formatTime(timeRemaining);
timeRemainingEl.innerText = `${minutes}:${seconds}`;