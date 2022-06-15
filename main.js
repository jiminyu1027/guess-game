let randomNum = 0; 
let userNum = document.getElementById("user-num");
let goButton = document.getElementById("go-button");
let chances = 5; //총 기회는 5번으로 제한
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let resetButton = document.getElementById("reset-button");
let history = []; //유저가 그돟안 입력한 값을 담아 놓는다.
let gameOver = false;
let imageArea = document.getElementById("image-area");

goButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userNum.addEventListener("focus", function () {
  userNum.value = ""; //유저가 검색하는 창에 포커스가 되면 입력한 값 초기화
});

//랜덤한 값을 뽑아내는 함수
function computerNum() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  //1~100까지의 수를 랜덤으로 뽑아냄
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

  chances--; //한번 플레이를 할때마다 찬스는 1번씩 깎임
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
  //유저가 입력한 값을 history배열 안에 넣어서, 한번 입력했던 값은 2번 입력 불가능 하도록 한다
  console.log(history);

  //유저가 답을 맞추지 못하였을 경우 게임이 종료됨
  if (chances < 1) { //기회를 다 썼을경우
    gameOver = true; //게임이 오버
    if (chances < 1 && userValue != randomNum) { //기회가 1보다 작고 유저가 입력한 값과 정답이 다르다면 게임이 종료된다
      imageArea.src = "./images/lose.gif";
      resultArea.textContent = `게임 오버ㅜㅜ 정답은 ${randomNum} 입니다. `;
    }
  }

  if (gameOver == true) { 
    goButton.disabled = true; //게임이 오버가 되면 버튼 비활성화
  }
}

//사용자가 reset버튼을 눌렀을때 실행되는 함수
//모든 값이 초기화가 된다.
function reset() {
  userNum.value = ""; //유저가 입력한 값을 초기화
  computerNum(); //컴퓨터가 선택한 랜덤한 값도 초기화
  resultArea.textContent = "시작하세요~"; //결과창 멘트 초기화
  chanceArea.textContent = "남은 기회 : 5번"; //남은기회 멘트 초기화
  chances = 5; //남은 기회도 5번으로 초기화
  history = []; //그동한 입력했던 값 초기화
  gameOver = false; //게임오버 초기화
  goButton.disabled = false; //버튼 비활성화도 초기화
  imageArea.src = "./images/start.gif"; //사진도 초기화
}

computerNum();
