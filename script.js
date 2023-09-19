const question = [
  {
    question: "Ai là người sáng lập nước Việt Nam Dân chủ Cộng hòa?",
    answer: [
      {
        text: "Hồ Chí Minh",
        correct: true,
      },
      {
        text: "Nguyễn Du",
        correct: false,
      },
      {
        text: "Lê Lợi",
        correct: false,
      },
      {
        text: "Trịnh Công Sơn",
        correct: false,
      },
    ],
  },
  {
    question: "Đâu là thủ đô của Việt Nam?",
    answer: [
      {
        text: "Đà Nẵng",
        correct: false,
      },
      {
        text: "Hà Nội",
        correct: true,
      },
      {
        text: "Hồ Chí Minh",
        correct: false,
      },
      {
        text: "Huế",
        correct: false,
      },
    ],
  },
  {
    question: "Sông nào là sông lớn nhất ở Việt Nam?",
    answer: [
      {
        text: "Sông Hương",
        correct: false,
      },
      {
        text: "Sông Cửu Long (Mekong)",
        correct: true,
      },
      {
        text: "Sông Hồng",
        correct: false,
      },
      {
        text: "Sông Đà",
        correct: false,
      },
    ],
  },
  {
    question: "Đâu là di sản thế giới của Việt Nam nằm ở tỉnh Quảng Bình?",
    answer: [
      {
        text: "Động Thiên Đường",
        correct: false,
      },
      {
        text: "Vịnh Hạ Long",
        correct: false,
      },
      {
        text: "Cố đô Huế",
        correct: false,
      },
      {
        text: "Công viên Quốc gia Phong Nha-Kẻ Bàng",
        correct: true,
      },
    ],
  },
  {
    question: "Khoảng cách từ cực Bắc đến cực Nam của Việt Nam là bao nhiêu?",
    answer: [
      {
        text: "Khoảng 1,000 km",
        correct: false,
      },
      {
        text: "Khoảng 2,000 km",
        correct: true,
      },
      {
        text: "Khoảng 3,000 km",
        correct: false,
      },
      {
        text: "Khoảng 4,000 km",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
