// variables
var main = document.getElementsByTagName('main')[0];

var viewHsLink = document.getElementById('view_hs_link');
var timeDisplay = document.getElementById('time_display');
var startQuizButton = document.getElementById('start_quiz_btn');
var questionsBox = document.getElementById('questions_box');
var questionDisplay = document.getElementById('question_display');
var answerList = document.getElementById('answer_list');
var answerFeedback = document.getElementById('answer_feedback');
var scoreDisplay = document.getElementById('score_display');
var initialsInput = document.getElementById('initials_input');
var submitInitialsButton = document.getElementById('submit_initials_btn');
var hsList = document.getElementById('highscore_list');
var goToStartPageButton = document.getElementById('go_to_start_pg_btn');
var clearHighscoresButton = document.getElementById('clear_hs_btn');

// list of questions for the player to answer
const questions = [
    {
        'question': "A very useful tool used during development and debugging for printing content to the debugger is:",
        'answers': ["terminal/bash", "JavaScript", "Debugger", "console.log"],
        'correct_index': 3
    },
    {
        'question': "Which program is used by web clients to view web pages?",
        'answers': ["Protocol", "Web Browser", "Web Server", "Search Engine"],
        'correct_index': 1
    },
    {
        'question': "Commonly used data types DO NOT include:",
        'answers': ["Atrings", "Booleans", "Alerts", "Numbers"],
        'correct_index': 2
    },
    {
        'question': "Arrays in JavaScript can be used to store _________",
        'answers': ["Numbers and strings", "Booleans", "Other Arrays", "All of the above"],
        'correct_index': 3
    },
    {
        'question': "String values must be enclosed within ______ when being assigned to variables.",
        'answers': ["Quotes", "Curly Brackets", "Commas", "Parenthesis"],
        'correct_index': 0
    },
    {
        'question': "The condition in an 'if/else' statement is enclosed within _________.",
        'answers': ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        'correct_index': 2
    },
    {
        'question': "Which are used with a tag to modify its function?",
        'answers': ["Files", "Attributes", "Functions", "Documents"],
        'correct_index': 1
    },
    {
        'question': "HTML document should begin with the ______",
        'answers': ["<HEAD> tag", "<TITLE> tag", "<BODY> tag", "<HTML> tag"],
        'correct_index': 3
    }
]