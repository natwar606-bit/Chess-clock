// Player buttons select kar rahe hain
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");

// Timer display elements
let timerone = document.querySelector(".timerone");
let timertwo = document.querySelector(".timertwo");

// Control buttons
let btn = document.querySelector(".button");
let second_increment = document.querySelector(".time_increment");
let time_control = document.querySelector(".time_control");
start_btn = document.querySelector(".start_btn");

// Global variables
let interval;        // setInterval ko store karne ke liye
let action;          // konsa player active hai (1 ya 2)
let a = 4;           // game state control variable
let x = 1;           // increment logic ke liye

// Initial time (seconds me)
let t1 = 120;
let t2 = 120;

// Initial UI update
timerone.innerText = timer(120);
timertwo.innerText = timer(120);

// Time ko mm:ss format me convert karne ka function
function timer(time){
  let minute = Math.floor(time/60);
  let second = Math.floor(time%60);

  if(second < 10){
    second = "0" + second;
  }

  return minute + ":" + second;
}

// Time control change hone par dono players ka time reset
time_control.addEventListener("change", () => {
  t1 = Number(time_control.value);
  t2 = Number(time_control.value);

  timerone.innerText = timer(t1);
  timertwo.innerText = timer(t2);
});

// Player A ka turn start
function player_a(){

  // First move ke liye initial time set
  if(t1 === 120 && t2 === 120){
    t1 = Number(time_control.value);
    t2 = Number(time_control.value);
  }

  // Agar already same player active hai ya paused state hai to return
  if(a == 1 || a == 4){
    return;
  }

  a = 1;

  // Agar already action same hai to return
  if(action == 1){
    return;
  }

  action = 1;

  // Time khatam ho gaya to stop
  if(t1 <= 0){
    return;
  }

  // Opponent ko increment dena (chess rule)
  // pause se resume hone par increment nahi milega
  if(x == 0){
    t2 = t2 + Number(second_increment.value);
    timertwo.innerText = timer(t2);
  }
  x = 0;

  // Timer update
  timerone.innerText = timer(t1);
  --t1;

  // Previous interval clear karke new start
  clearInterval(interval);
  interval = setInterval(() => {
    timerone.innerText = timer(t1);
    --t1;
  }, 1000);
}

// Player B ka turn start
function player_b(){
  

  // Reset condition
  if(t1 == 0 && t2 == 0){
    t1 = Number(time_control.value);
    t2 = Number(time_control.value);
  }

  if(a == 2 || a == 4){
    return;
  }

  a = 2;

  if(action == 2){
    return;
  }

  action = 2;

  // Agar time khatam ho gaya
  if(t2 <= 0){
    return;
  }

  // Increment add to player A
 // pause se resume hone par increment nahi milega
 if(x==0){
   t1 = t1 + Number(second_increment.value);
  timerone.innerText = timer(t1);
}
x=0;

  timertwo.innerText = timer(t2);
  --t2;

  // Interval restart
  clearInterval(interval);
  interval = setInterval(() => {
    timertwo.innerText = timer(t2);
    --t2;
  }, 1000);
}

// Pause / Resume function
function pause(){
  // Agar game chal raha hai to pause
  if(a == 1 || a == 2){
    clearInterval(interval);
    a = 4;
    btn.innerText = "▶️"; // play icon
  }
  // Resume Player A
  else if(action == 1){
    action = 0;
    a = 3;
    btn.innerText = "⏸️";
    x=1;
    player_a();
    a = 3;
  }
  // Resume Player B
  else if(action == 2){
    a = 3;
    x=1;
    action = 0;
    btn.innerText = "⏸️";
    player_b();
  }
}

// Game start
function start(){
  a = 0;
  
  btn.innerText = "⏸️";

  // Controls disable
  time_control.disabled = true;
  second_increment.disabled = true;
  start_btn.disabled = true;

  player_a(); // Player A se start
}

// Reset game
function reset(){
  clearInterval(interval);

  t1 = Number(time_control.value);
  t2 = Number(time_control.value);

  // UI reset
  timerone.innerText = timer(t1);
  timertwo.innerText = timer(t2);

  a = 4;
  action = 0;

  btn.innerText = "▶️";

  // Controls enable
  time_control.disabled = false;
  second_increment.disabled = false;
  start_btn.disabled = false;
}

// Click events
player1.addEventListener("click", player_b);
player2.addEventListener("click", player_a);