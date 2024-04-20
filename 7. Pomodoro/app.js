let workTime = 300;
let restTime = 120;

function getTime(time){
  return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");

displayWork.textContent = getTime(workTime)
displayPause.textContent = getTime(restTime)

const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", usePlayBtn);

let currentInterval = false;
let timerID;

function usePlayBtn(){
  handlePlayPause()

  if(currentInterval) return;
  currentInterval = true;

  workTime--;
  displayWork.textContent = getTime(workTime)
  timerID = setInterval(handleTicks, 1000)
}

let pause = true;
function handlePlayPause(){
  if(playBtn.getAttribute("data-toggle") === "play"){
    pause = false;
    playBtn.firstElementChild.src = "ressources/pause.svg";
    playBtn.setAttribute("data-toggle", "pause");

    if(workTime){
      handleClassAnimation({work: true, rest: false})
    }
    else{
      handleClassAnimation({work: false, rest: true})
    }
  }
  else{
    pause = true;
    playBtn.firstElementChild.src = "ressources/play.svg";
    playBtn.setAttribute("data-toggle", "play");
    handleClassAnimation({work: false, rest: false})

  }
}

function handleClassAnimation(itemState){
  for(const item in itemState){
    if(itemState[item]){
      document.querySelector(`.${item}`).classList.add("active")
    }
    else{
      document.querySelector(`.${item}`).classList.remove("active")
    }
  }
}

const cycles = document.querySelector(".cycles");
let cyclesNumber = 0;

function handleTicks(){
  if(!pause && workTime > 0){
    workTime--;
    displayWork.textContent = getTime(workTime)
    handleClassAnimation({work: true, rest: false})
  }
  else if (!pause && !workTime && restTime > 0){
    restTime--;
  displayPause.textContent = getTime(restTime)
  handleClassAnimation({work: false, rest: true})
  }
  else if(!pause && !workTime && !restTime){
    workTime = 5;
    restTime = 3;
    displayWork.textContent = getTime(workTime)
    displayPause.textContent = getTime(restTime)

    cyclesNumber++;
    cycles.textContent = `Cycles: ${cyclesNumber}`
  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset(){
  workTime = 299;
  restTime = 120;
  displayWork.textContent = getTime(workTime)
  displayPause.textContent = getTime(restTime)
  handleClassAnimation({work: true, rest: false})

  cyclesNumber = 0;
  cycles.textContent = `Cycles: 0`

  clearInterval(timerID);
  currentInterval = false;
  pause = true;

  playBtn.setAttribute("data-toggle", "play");
  playBtn.firstElementChild.src = "ressources/play.svg"
}