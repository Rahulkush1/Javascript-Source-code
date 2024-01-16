const boxs = document.querySelectorAll('.box');
const statusText=document.querySelector('#status');
const restart=document.querySelector('#restart');
let x="<img src='x.png' width='50px' height='50px' />";
let o="<img src='o.png' width='50px' height='50px' />";
const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
play();

function play() {
    boxs.forEach(box => box.addEventListener('click', boxClick));
    restart.addEventListener('click',restartGame)
    statusText.textContent=`${player} Your Turn`;
    running=true;
}

function boxClick(){
    let index = this.dataset.index
    if((options[index] != "") || !running){
        return;
    }
    updateBox(this,index)
    checkWinner();
}

function updateBox(box,index){
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer(){
    player = (player == 'X') ? "O" :"X";
    currentPlayer = (currentPlayer == x) ? o :x;
    statusText.textContent=`${player} Your Turn`;
}

function checkWinner(){
    let isWon = false;
    for(let i = 0; i< win.length; i++){
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if ( (box1 == "") || (box2 == "") || (box3 == "")  ){
            continue;
        }
        if ((box1 == box2) && (box2 == box3)){
            isWon = true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        } 
    }

    if (isWon){
        statusText.textContent = `${player} Won...`;
        statusText.classList.add('winner')
        document.body.classList.add('cong');
        for(let i = 0; i < options.length; i++){
            if (player == 'X'){
                if (options[i] == 'O'){
                    boxs.forEach((e) => {
                        if (e.dataset.index == i){
                            e.classList.add('Lost');
                        }
                    })
                }
            }
            else{
                if (options[i] == 'X'){
                    boxs.forEach((e) => {
                        if (e.dataset.index == i){
                            e.classList.add('Lost');
                        }
                    })
                }
            }
        }
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent = `Game Draw`;
        running  = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=x;
    player="X";
    running=true;
    statusText.textContent=`${player} Your Turn`;
  
    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
        box.classList.remove('Lost');
        box.classList.remove('winner');
        document.body.classList.remove('cong');
    });
}

