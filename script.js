const numberDisplay = document.querySelector('.number-display');
const instructionsDisplay = document.querySelector('.instructions-display');
const keys = document.querySelectorAll('.key')
const header = document.querySelector('h1');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', ()=>{
    if (roundsCount == 6){
        roundsCount = 0;
        totalReactionTime = 0;
        correctAnswers = 0;
        startRound();
    } else {
        startRound();
    }
})

let roundsCount = 0;
let correctAnswers = 0;
let isEarly = true;
let gamePaused = true;
let ranNum;
let startTime;
let totalReactionTime = 0 ;
disableKeys()

function startRound(){
    roundsCount++;
    isEarly = true;
    //if we clicked 'next' after finishing round 5
    if(roundsCount > 5){
        //display text
        header.textContent = 'Final Result'
        instructionsDisplay.textContent = "your average reaction speed was: "
        numberDisplay.textContent = `${correctAnswers === 0 ? 0 : totalReactionTime / correctAnswers}`;
        startButton.style.display = 'unset';
        startButton.textContent = 'Restart Game';
        //keep game paused and wait for user to 'restart game'
    } else {
        //round is running
        gamePaused = false;

        //activate the keypad
        undisableKeys();

        //display text
        header.textContent = `Round: ${roundsCount}`
        instructionsDisplay.textContent = "wait for the Number..."
        numberDisplay.textContent = "??";
        //hide button
        startButton.style.display = 'none';
        
        //get random number
        ranNum = Math.ceil(Math.random() * 9);

        //wait random amount of time
        setTimeout(()=>{
            if(!gamePaused){
                //time finished user can now click a number
                isEarly = false;
                //if game is still running (user didn't click early)
                    //display number
                instructionsDisplay.textContent = 'Click!'
                numberDisplay.textContent = ranNum;
                    //start timer
                startTime = new Date().getTime();
            }
        }, Math.ceil(Math.random() * 2000) + 2000)
    }
}

keys.forEach(key => {
    key.addEventListener('click', ()=>{
        //if the game is running
        if(!gamePaused){
            //if a user clicks before number is displayed
            if(isEarly){
                //display text and button
                instructionsDisplay.textContent = 'you clicked too soon!';
                startButton.style.display = 'unset';
                startButton.textContent = 'Next';
                numberDisplay.textContent = '';

                //pause the game and wait for the user to click 'next'
                setTimeout(() => {
                    gamePaused = true;
                    disableKeys();
                }, 1);
            }

            //if a user clicks on time
            else{
                let keyNumber = key.innerHTML;
                //if the user clicked the correct button
                if (keyNumber == ranNum){

                    //calculate reaction time
                    let endTime = new Date().getTime();

                    //display text
                    instructionsDisplay.textContent = 'Your reaction speed was:';
                    numberDisplay.textContent = `${endTime - startTime} ms`;
                    startButton.style.display = 'unset';
                    startButton.textContent = 'next'

                    //increase the correct answers count
                    correctAnswers++
                    //increase the reaction total time
                    totalReactionTime += endTime - startTime;

                    //pause the game and wait for the user to click 'next'
                    setTimeout(() => {
                        gamePaused = true;
                        disableKeys();
                    }, 1);
                }
                // if user clicked a wrong number
                else{
                    //display text
                    instructionsDisplay.textContent = 'Wrong Key!!';
                    startButton.style.display = 'unset';
                    startButton.textContent = 'Next';
                    numberDisplay.textContent = '';

                    //pause game and wait for user to click 'next'
                    setTimeout(() => {
                        gamePaused = true;
                        disableKeys();
                    }, 1);
                }
            }
        }
    })
})

function disableKeys(){
    keys.forEach(key => {key.setAttribute('disabled', 'true')})
}
function undisableKeys(){
    keys.forEach(key => key.removeAttribute('disabled'))
}