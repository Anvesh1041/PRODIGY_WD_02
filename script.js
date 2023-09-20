// Variables
let startTime = 0
let elapsedTime = 0
let running = false
let lapNumber = 1
let taskCompleted = false
let intervalID;

// Elements
const minutesElement = document.querySelector('#minutes')
const secondsElement = document.querySelector('#seconds')
const centisecondsElement = document.querySelector('#centiseconds')
const lapList = document.querySelector('#lap-list')
const btnStart = document.querySelector('#btn-start')
const btnLap = document.querySelector('#btn-lap')
const btnRestart = document.querySelector('#btn-restart')
const container= document.querySelector(".container")

// Functions
function formatTime(time) {
  const minutes = Math.floor(time / 6000).toString().padStart(2, '0')
  const seconds = Math.floor((time % 6000) / 100).toString().padStart(2, '0')
  const centiseconds = (time % 100).toString().padStart(2, '0')
  return `${minutes}:${seconds}:${centiseconds}`
}

function updateTimer() {
  elapsedTime = Date.now() - startTime
  const formattedTime = formatTime(Math.floor(elapsedTime / 10))
  minutesElement.textContent = formattedTime.slice(0, 2)
  secondsElement.textContent = formattedTime.slice(3, 5)
  centisecondsElement.textContent = formattedTime.slice(6)
}

function startTimer() {
  running = true
  startTime = Date.now() - elapsedTime
  intervalID = setInterval(updateTimer, 10)
  btnStart.textContent = 'Stop'
}

function stopTimer() {
  // Stop interval and set running to false
  clearInterval(intervalID)
  running = false
  btnStart.textContent = 'Start'
}

function toggleTimer() {
  if (running) {
    stopTimer()
  } else {
    startTimer()
  }
}

function restartTimer() {
  stopTimer()
  elapsedTime = 0
  minutesElement.textContent = '00'
  secondsElement.textContent = '00'
  centisecondsElement.textContent = '00'
  lapNumber = 1
  lapList.innerHTML = ''
  taskCompleted = false
  btnLap.disabled = false
}

function addLap() {
  if (!running) {
    return
  }
  const currentElapsedTime = elapsedTime // Store the current elapsedTime
  const lapTime = formatTime(Math.floor(currentElapsedTime / 10)) // Use the stored elapsedTime for lap time
  const lapItem = document.createElement('li')
  lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`
  lapList.appendChild(lapItem)
  lapNumber++
}

function animation(){
  if (running) 
    container.classList.add("animation")
  else
    container.classList.remove("animation")
}
// Event listeners
btnStart.addEventListener('click', toggleTimer)
btnLap.addEventListener('click', addLap)
btnRestart.addEventListener('click', restartTimer)
btnStart.addEventListener('click', animation)
btnRestart.addEventListener('click', ()=>{
  container.classList.remove("animation")
})

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    btnStart.classList.add("btn2")
    toggleTimer()
    animation()
    console.log("keypressed : space")
  }
  if (event.code === 'KeyR') {
    container.classList.remove("animation")
    btnRestart.classList.add("btn2")
    restartTimer()
    // animation()
    console.log("keypressed : R")
  }
  
  if (event.code==='KeyL') {
    btnLap.classList.add("btn2")
    addLap()
    console.log("keypressed : L")
  }
})
document.addEventListener('keyup', function (event) {
  if (event.code === 'Space') {
    btnStart.classList.remove("btn2")
  }
  if (event.code === 'KeyR') {
    btnRestart.classList.remove("btn2")
  }
  
  if (event.code==='KeyL') {
    btnLap.classList.remove("btn2")
  }
})   

// const containerElement = document.querySelector('.container');
// let colorIndex = 0;
// const colors = ['#ff0000', '#00ff00', '#0000ff']; 

// function changeBackgroundColor   () {
  //   containerElement.style.backgroundColor = colors[colorIndex];
  //   colorIndex = (colorIndex + 1) % colors.length;
  // }
  
  // setInterval(changeBackgroundColor2, 1000);
  