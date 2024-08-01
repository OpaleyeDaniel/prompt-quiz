//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which of the following transition-timing-function properties make the transition start slow, speed up, then end slow (Select all that apply)",
        options: ["linear", "ease-out", "ease", "ease-in"],
        correct:"ease-in",
    },
    {
        id: "1",
        question: "Which of the following CSS properties is used for hiding an element and removing it completely from the layout?",
        options: ["display: inline;", "visibility: visible;", "visibility: hidden;", "display: none;"],
        correct: "display: none;",
    },
    {
        id: "2",
        question: "Which of the following statement will apply a box-shadow to the right and bottom edge of a div element?",
        options: ["box-shadow: gray -5px -5px;", "box-shadow: gray -5px 5px;", "box-shadow: gray 5px 5px;", "box-shadow: gray 5px -5px;"],
        correct: "box-shadow: gray 5px 5px;",
    },
    {
        id: "3",
        question: "Which transformation enable you to change the size of an element?",
        options: ["translate", "scale", "skew", "rotate"],
        correct: "scale",
    },
    {
        id: "4",
        question: "Which of the following is an attribute selector?",
        options: [".required", ":required", "#required", "input[required]"],
        correct: "input[required]",
    },
    {
        id: "5",
        question: "Which of the following CSS property for position would place an element relative to the browser window",
        options: ["fixed", "relative", "absolute", "all of the above"],
        correct: "fixed",
    }, {
        id: "6",
        question: "Media queries are the best suited for what purpose?",
        options: ["Modifying the view port to properly fit the content of the page", "Setting the priority of style sheet references in a webpage", "Creating a responsive user interface based on the screen size of the view port", "Connecting to third-party style sheets to alter the layout"],
        correct: "Creating a responsive user interface based on the screen size of the view port",
    },
    {
        id: "7",
        question: "Select the JavasScript method that can't be used to selct an element in the DOM?",
        options: ["queryAll", "getElementById", "getElementByClassName", "getSelector"],
        correct: "getElementById",
    },
    {
        id: "8",
        question: "You are working on a form. You want to allow users to make multiple selections. Select the best control.",
        options: ["Checkbox", "radio button", "textarea", "radio or checkbox"],
        correct: "Checkbox",
    },
    {
        id: "9",
        question: "You are working on a web page. You are looking from the outside edge of an HTML element and moving to the inside edge. Select the right order that the padding, margin, and border occur in?",
        options: ["margin, border, padding", "border, padding, margin", "margin, padding, margin", "padding, border, margin"],
        correct: "padding, border, margin",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};