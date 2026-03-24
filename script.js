let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let timerone = document.querySelector(".timerone");
let timertwo = document.querySelector(".timertwo");
let button = document.querySelector(".button");

let interval;
let action;
let a = 1;

let t1 = 300;
let t2 = 300;

function timer(time){
  minute = Math.floor(time/60);
   second = Math.floor(time%60);
      if(second<10){
         second = "0"+second ;
         }
              return minute + ":" + second ;
    }
function player_a(){
   action = 1;
      a = 1;
    //  btn.innerText = "⏸️"; // pause icon
       if(t1<0){
           return;
       }
            timerone.innerText = timer(t1);
               --t1;

    clearInterval(interval);
       interval =  setInterval( () => {
          timerone.innerText = timer(t1);
           --t1;
              },1000)
    

}

function player_b(){
  action = 2;
    a=1;
    // btn.innerText = "⏸️"; // pause icon
    if(t2<=0){
        return;
     }
        timertwo.innerText = timer(t2);
          --t2;

    clearInterval(interval);
       interval =  setInterval( () => {
         timertwo.innerText = timer(t2);
            --t2;
            },1000)
}

function pause(){
  if(a==1){
     clearInterval(interval);
        a=0;
        //  btn.innerText = "▶️"; // play icon
  }
  else if(action==1){
        btn.innerText = "⏸️"; // pause icon
          player_a();
        }
            else{
                  btn.innerText = "⏸️"; // pause icon

                player_b();
                     }
}

player1.addEventListener("click" , player_b)
player2.addEventListener("click" ,player_a)

