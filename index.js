const one = document.querySelector("#one")
const two = document.querySelector("#two")
const three = document.querySelector("#three")
const four = document.querySelector("#four")

const buttons = [one, two, three, four]
const shaded_color = ["#bb2a2a", "#bbbb2a", "#2abb51", "#2aa1bb"]
const normal_color = ["#e07575", "#e0e075", "#75e092", "#75cce0"]

const question = document.querySelector("#question")

const volume = document.querySelector(".fa")
const result = document.querySelector(".submit")

volume.addEventListener("click", function(){
    if (volume.classList.contains("fa-volume-up")){
        volume.classList.remove("fa-volume-up");
        volume.classList.add("fa-volume-mute")
    } else{
        volume.classList.remove("fa-volume-mute")
        volume.classList.add("fa-volume-up");
    }
})

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (!urlParams.has("pin")){
    window.location.href = "login.html";
}
let pin = urlParams.get("pin");


let game_codes = 
{
    "127418" : [
        {
            "question": "What is 1+1?",
            "answers": [
                "2",
                "3",
                "1",
                "4"
            ],
            "correct": 1
        },
        {
            "question": "What is 2+2?",
            "answers": [
                "2",
                "3",
                "1",
                "4"
            ],
            "correct": 4
        }
    ]
};
let keys = Object.keys(game_codes);
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
if (!containsObject(pin, keys)){
    window.location.href = "login.html";
}

let questions = game_codes[pin]

let next_question = true;

let i = -1;

for (let j = 0; j < 4; j++) {
    buttons[j].addEventListener("mouseover", function () {
        buttons[j].style.backgroundColor = shaded_color[j];
    })
    buttons[j].addEventListener("mouseout", function(){
        buttons[j].style.backgroundColor = normal_color[j];
    })
}

let submit = false;
function removeAlert(){
    result.style.display = "none";
    if (i >= questions.length){
        result.style.backgroundColor = "yellow"
        result.innerText = "You finished";
        result.style.display = "flex";

        result.removeEventListener("click", removeAlert)
    } 
}
result.addEventListener("click", removeAlert)

const id = setInterval(function (){
    if (next_question){
        i++
        if (i < questions.length){
            question.innerText = questions[i]['question']

            for (let j = 0; j < 4; j++) {
                buttons[j].innerText = questions[i]['answers'][j]
            }


            next_question = false;

            for (let j = 0; j < 4; j++) {
                buttons[j].addEventListener("click", function () {
                    next_question = true;
                    result.style.display = "flex";
                    
                    if (questions[i]['correct'] - 1 === j) {
                        result.style.backgroundColor = "green";
                        result.innerText = "Correct"
                    } else {
                        result.style.backgroundColor = "red";
                        result.innerText = "Incorrect"
                    }
                    
                })
            }
        } else{
            clearInterval(id);
        }

    }
}, 100)
