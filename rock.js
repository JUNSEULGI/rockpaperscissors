const threeModeBtn = document.body.querySelector("#three_mode");
const fiveModeBtn = document.body.querySelector("#five_mode");

let mode = "";

const input = document.body.querySelector("input");
const btn = document.body.querySelector("#play");
const userSpan = document.body.querySelector("#user_score");
const computerSpan = document.body.querySelector("#computer_score");

let userScore = 0;
let computerScore = 0;

function checkUser() {
  const userInput = input.value;
  // 문제) 이 변수 선언 부분을 함수 밖에 쓰면(2번째 줄) 작동 안함...
  console.log(userInput);
  if (userInput === "가위") {
    return "가위";
  } else if (userInput === "바위") {
    return "바위";
  } else if (userInput === "보") {
    return "보";
  } else {
    return "error";
  }
}
// 유저가 입력한 값이 가위,바위,보에 해당하는지 확인한 뒤 리턴. 잘못 입력되면 "error"로 알림.

function makeRandom() {
  const random = Math.random() * 3;
  if (random <= 1) {
    return ["가위", random];
    // 배열로 만들어 random을 저장한 것은 숫자에 따라 제대로 작동하는지 확인차.
  } else if (random <= 2) {
    return ["바위", random];
  } else {
    return ["보", random];
  }
}
// 0에서 3까지 랜덤으로 생성되는 숫자를 이용해서 가위,바위,보 결정.

function compareResult(user) {
  const randomResult = makeRandom();
  const computerChoice = randomResult[0];
  // 컴퓨터의 가위바위보 결과 저장.
  const userChoice = user;
  // *중요* 인자로 받은 user(뒤에서 실행될 때 userResult를 주게 됨) 값을 저장.
  let winOrLose = "";
  // 승패 여부를 저장할 변수 만듦.
  if (
    (userChoice === "가위" && computerChoice === "보") ||
    (userChoice === "바위" && computerChoice === "가위") ||
    (userChoice === "보" && computerChoice === "바위")
  ) {
    winOrLose = "승";
  } else if (
    (userChoice === "바위" && computerChoice === "보") ||
    (userChoice === "보" && computerChoice === "가위") ||
    (userChoice === "가위" && computerChoice === "바위")
  ) {
    winOrLose = "패";
  } else {
    winOrLose = "무승부";
  }
  return [userChoice, computerChoice, winOrLose];
  // userChoice와 computerChoice의 값을 비교해서 승패와 함께 배열로 리턴.
}

function refreshScore(result) {
  if (result === "승") {
    userScore = userScore + 1;
  } else if (result === "패") {
    computerScore = computerScore + 1;
  }
  // 승패에 따라 스코어 업데이트.
  userSpan.innerText = userScore;
  computerSpan.innerText = computerScore;
  // 바뀐 스코어를 html 코드(span)에 반영.
}

function alertWinner() {
  if (mode === "three") {
    if (userScore === 2) {
      alert(
        `최종스코어 ${userScore}대${computerScore}, 가위바위보 게임에서 승리했습니다.`
      );
      window.location.reload();
    } else if (computerScore === 2) {
      alert(
        `최종스코어 ${userScore}대${computerScore}, 가위바위보 게임에서 패배했습니다.`
      );
      window.location.reload();
    }
  } else if (mode === "five") {
    if (userScore === 3) {
      alert(
        `최종스코어 ${userScore}대${computerScore}, 가위바위보 게임에서 승리했습니다.`
      );
      window.location.reload();
    } else if (computerScore === 3) {
      alert(
        `최종스코어 ${userScore}대${computerScore}, 가위바위보 게임에서 패배했습니다.`
      );
      window.location.reload();
    }
  }
}

function run(event) {
  event.preventDefault();
  // 새로고침되며 폼이 초기화되는 것 방지.
  const userResult = checkUser();
  // 유저가 폼에 입력한 결과를 받아서 변수로 저장.
  if (userResult === "error") {
    alert("가위, 바위, 보 중 하나를 입력하세요.");
    // 유저가 잘못 입력해서 error를 받으면 경고창 띄움.
  } else {
    const result = compareResult(userResult);
    // 유저가 잘 입력한 경우, 유저와 컴퓨터가 선택한 결과를 비교해서 승패 가름.
    alert(`상대는 ${result[1]}를 냈습니다. 결과는 ${result[2]}입니다.`);
    // 유저에게 결과를 알림.
    refreshScore(result[2]);
    alertWinner();
  }
}
// 버튼을 클릭했을 때 일어날 동작.

btn.addEventListener("click", run);

function threeMode() {
  mode = "three";
  userScore = 0;
  computerScore = 0;
  refreshScore();
}
function fiveMode() {
  mode = "five";
  userScore = 0;
  computerScore = 0;
  refreshScore();
}

threeModeBtn.addEventListener("click", threeMode);
fiveModeBtn.addEventListener("click", fiveMode);
