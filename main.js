let randomNum = 0;
let userNum = document.getElementById("user-num");
let goButton = document.getElementById("go-button");
let chances = 5;
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let resetButton = document.getElementById("reset-button");
let history = [];
let gameOver = false;
let imageArea = document.getElementById("image-area");

goButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userNum.addEventListener("focus", function () {
  userNum.value = "";
});

//랜덤한 값을 뽑아내는 함수
function computerNum() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(`정답 : ${randomNum}`);
}

//시작 버튼을 눌렀을때 실행되는 함수
function play() {
  let userValue = userNum.value;

  //유저가 1보다 작거나 100보다 큰 수를 입력하였을때
  //1과 100사이의 숫자만 입력하라는 알림
  if (1 > userValue || 100 < userValue) {
    resultArea.textContent = "1~100사이의 숫자를 입력해주세요.";
    imageArea.src = "./images/what.gif";
    return;
  }

  //유저가 이미 입력한 값을 다시 입력했을경우 나타나는 알림
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 값이에요. 다른 값을 입력해주세요.";
    imageArea.src = "./images/what.gif";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회 : ${chances}번`;
  console.log(`남은 기회 :${chances}번`);

  if (userValue < randomNum) {
    resultArea.textContent = "Up!!!!";
    imageArea.src = "./images/up.gif";
  } else if (userValue > randomNum) {
    resultArea.textContent = "Down!!!!";
    imageArea.src = "./images/down.gif";
  } else {
    resultArea.textContent = "정답입니다!!";
    gameOver = true;
    imageArea.src = "./images/congratulation.gif";
  }

  history.push(userValue);
  console.log(history);

  //유저가 답을 맞추지 못하였을 경우 게임이 종료됨
  if (chances < 1) {
    gameOver = true;
    if (chances < 1 && userValue != randomNum) {
      imageArea.src = "./images/lose.gif";
      resultArea.textContent = `게임 오버ㅜㅜ 정답은 ${randomNum} 입니다. `;
    }
  }

  if (gameOver == true) {
    goButton.disabled = true;
  }
}

//사용자가 reset버튼을 눌렀을때 실행되는 함수
//모든 값이 초기화가 된다.
function reset() {
  userNum.value = "";
  computerNum();
  resultArea.textContent = "시작하세요~";
  chanceArea.textContent = "남은 기회 : 5번";
  chances = 5;
  history = [];
  gameOver = false;
  goButton.disabled = false;
  imageArea.src = "./images/start.gif";
}

computerNum();
