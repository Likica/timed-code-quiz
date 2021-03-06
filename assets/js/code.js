// variables
var main = document.getElementsByTagName('main')[0];

var viewHsLink = document.getElementById('view_hs_link');
var timeDisplay = document.getElementById('time_display');
var startQuizBtn = document.getElementById('start_quiz_btn');
var questionsBox = document.getElementById('questions_box');
var questionDisplay = document.getElementById('question_display');
var answerList = document.getElementById('answer_list');
var answerFeedback = document.getElementById('answer_feedback');
var scoreDisplay = document.getElementById('score_display');
var initialsInput = document.getElementById('initials_input');
var submitInitialsBtn = document.getElementById('submit_initials_btn');
var hsList = document.getElementById('highscore_list');
var goToStartPageBtn = document.getElementById('go_to_start_pg_btn');
var clearHighscoresBtn = document.getElementById('clear_hs_btn');

// list of questions/answers for the player - total of 10 questions
const questions = [
    {
        'question': 'A very useful tool used during development and debugging for printing content to the debugger is:',
        'answers': ['terminal/bash', 'JavaScript', 'Debugger', 'console.log'],
        'correct_index': 3
    },
    {
        'question': 'Which program is used by web clients to view web pages?',
        'answers': ['Protocol', 'Web Browser', 'Web Server', 'Search Engine'],
        'correct_index': 1
    },
    {
        'question': 'Commonly used data types DO NOT include:',
        'answers': ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        'correct_index': 2
    },
    {
        'question': 'Arrays in JavaScript can be used to store _________',
        'answers': ['Numbers and strings', 'Booleans', 'Other Arrays', 'All of the above'],
        'correct_index': 3
    },
    {
        'question': 'String values must be enclosed within ______ when being assigned to variables.',
        'answers': ['Quotes', 'Curly Brackets', 'Commas', 'Parenthesis'],
        'correct_index': 0
    },
    {
        'question': 'The condition in an "if/else" statement is enclosed within _________.',
        'answers': ['Quotes', 'Curly Brackets', 'Parenthesis', 'Square Brackets'],
        'correct_index': 2
    },
    {
        'question': 'The three equal signs "===" comparison is operator is used for comparing ___________.',
        'answers': ['Values and Types', 'Types', 'numbers and Strings', 'Values'],
        'correct_index': 0
    },
    {
        'question': 'The "________" keyword is a reference to the current object, whose method is being called upon',
        'answers': ['These', 'Object', 'This', 'Propery Of'],
        'correct_index': 0
    },
    {
        'question': 'Which are used with a tag to modify its function?',
        'answers': ['Files', 'Attributes', 'Functions', 'Documents'],
        'correct_index': 1
    },
    {
        'question': 'HTML document should begin with the ______',
        'answers': ['<HEAD> tag', '<TITLE> tag', '<BODY> tag', '<HTML> tag'],
        'correct_index': 3
    }
]

// time given to players
const startTime = questions.length * 10
// Penalty - time deduction of 10 sec per incorrect answer
const timePenalty = 10
// countdown clock
var remainingTime
// timer
var timer
// number of correct answers
var score

// timer function
function startTimer() {
    remainingTime = startTime
    timeDisplay.textContent = formatSeconds(remainingTime)

    timer = setInterval(function () {
        remainingTime--
        // if time runs out, end and bring the initals page up
        if (remainingTime < 0) {
            clearInterval(timer)
            displayInitialsPage()
        } else {
            timeDisplay.textContent = formatSeconds(remainingTime)
        }
    }, 1000)
}

// format time in seconds
function formatSeconds(seconds) {
    let m = Math.floor(seconds / 60).toString().padStart(2, '');
    let s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`
}

// function to initialize the quiz
function startQuiz() {
    // add event listener for startQuizBtn
    startQuizBtn.addEventListener('click', function (event) {
        //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        event.preventDefault()
        displayQuestionPg()
    })
    //check player answers, add points for correct, or deduct time for incorrect answers
    answerList.addEventListener('click', function (event) {
        event.preventDefault()
        if (event.target.matches('button')) {
            var button = event.target
            if (button.classList.contains('correct')) {
                answerFeedback.textContent = 'Correct ???'
                questionsBox.children[nextQuestionIndex - 1].classList.add('correct')
                score++
            } else {
                answerFeedback.textContent = 'Wrong ???'
                questionsBox.children[nextQuestionIndex - 1].classList.add('wrong')
                remainingTime -= timePenalty
            }
            if (remainingTime > 0) displayNextQuestion()
            else displayInitialsPage()
        }
    })

    // add eventListener with localStorage for initials player input
    submitInitialsBtn.addEventListener('click', function (event) {
        event.preventDefault()
        var initials = initialsInput.value.toUpperCase()
        // if no initials are entered, prompt player for initials
        if (!initials) {
            window.alert("Please enter your intitials")
        }
        if (initials) {
            var highscores = JSON.parse(localStorage.getItem('highscores')) || []
            // add time, hs and push to localStorage
            timeStamp = Date.now()
            highscores.push({
                'timeStamp': timeStamp,
                'score': score,
                'initials': initials,
                'timeRemaining': remainingTime
            })
            // sort hs
            highscores = highscores.sort(function (a, b) {
                if (a.score != b.score) return b.score - a.score
                if (a.timeRemaining != b.timeRemaining) return b.timeRemaining - a.timeRemaining
                if (a.timeStamp != b.timeStamp) return a.timeStamp - b.timeStamp
                return 0
            })
            //save to localStorage with JSON.stringify
            localStorage.setItem('highscores', JSON.stringify(highscores))

            displayHsPg()
            initialsInput.value = ''
        }
    })
    // return to start page
    goToStartPageBtn.addEventListener('click', function (event) {
        event.preventDefault()
        displayStartPg()
    })
    //clear highscores that are saved in localStorage
    clearHighscoresBtn.addEventListener('click', function (event) {
        var confirmed = confirm('Do you want to clear all of your highscores?')
        if (confirmed) {
            event.preventDefault()
            localStorage.setItem('highscores', '[]')
            displayHsPg()
        }
    })
    // view highscores saved to localStorage
    viewHsLink.addEventListener('click', function (event) {
        event.preventDefault()
        displayHsPg()
    })

    // return to start page
    displayStartPg()
}

// display/hide pages function by id
function displayPage(id) {
    main.querySelectorAll('.page').forEach(page => {
        if (page.id == id) {
            page.classList.remove('hidden')
        } else {
            page.classList.add('hidden')
        }
    })
    return 10
}

// function to display the start page
function displayStartPg() {
    displayPage('start_page')
    // need to clear previous stage of pages
    clearInterval(timer)
    remainingTime = 0
    timeDisplay.textContent = formatSeconds(remainingTime)
}
// question currently on the screen for the player
var nextQuestionIndex
// randomized questions array
var randomizeQuestions

//function for questions to display
function displayQuestionPg() {
    displayPage('questions_pg')

    questionsBox.innerHTML = ''

    for (let i = 0; i < questions.length; i++) {
        var el = document.createElement('span')
        el.textContent = i + 1
        questionsBox.appendChild(el)
    }

    randomizeQuestions = randomizeArray(questions)

    // reset values to 0/default
    nextQuestionIndex = 0
    score = 0

    // start timer
    startTimer()

    // Display 1st question
    displayNextQuestion()
}

//function to display the next/following question
function displayNextQuestion() {
    if (nextQuestionIndex < questions.length) {
        // retrieve questions and answers
        const question = randomizeQuestions[nextQuestionIndex].question
        const answers = randomizeQuestions[nextQuestionIndex].answers
        const randomizedAnswers = randomizeArray(answers)
        const correctAnswer = answers[randomizeQuestions[nextQuestionIndex].correct_index]

        questionDisplay.textContent = question
        answerList.innerHTML = ''
        answerFeedback.textContent = ''
        //check for correct answer
        for (let i = 0; i < randomizedAnswers.length; i++) {
            let answer = randomizedAnswers[i]
            let button = document.createElement('button')
            button.classList.add('answer')
            if (answer == correctAnswer)
                button.classList.add('correct')
            button.textContent = `${i + 1}. ${answer}`
            answerList.appendChild(button)
        }
        nextQuestionIndex++
    } else {
        clearInterval(timer)
        displayInitialsPage()
    }
}

// function for Initials page display
function displayInitialsPage() {
    displayPage('get_initials_pg')
    if (remainingTime < 0) remainingTime = 0
    timeDisplay.textContent = formatSeconds(remainingTime)
    scoreDisplay.textContent = score
}

// function for hiscores page display
function displayHsPg() {
    displayPage('hs_pg')
    questionsBox.innerHTML = ''

    hsList.innerHTML = ''

    clearInterval(timer)

    var highscores = JSON.parse(localStorage.getItem('highscores'))

    var i = 0
    for (const key in highscores) {
        i++
        let highscore = highscores[key]
        var el = document.createElement('div')

        let initials = highscore.initials.padEnd(3, '')
        let playerScore = highscore.score.toString().padStart(3, '')
        let timeRemaining = formatSeconds(highscore.timeRemaining)
        el.textContent = `${i}. ${initials} - Score: ${playerScore} - Time: ${timeRemaining}`
        hsList.appendChild(el)
    }
}

// function to randomize questions array
function randomizeArray(array) {
    clone = [...array]
    output = []

    while (clone.length > 0) {
        let r = Math.floor(Math.random() * clone.length);
        let i = clone.splice(r, 1)[0]
        output.push(i)
    }
    return output
}

startQuiz()
