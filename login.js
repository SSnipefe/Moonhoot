const forms = document.querySelector("form");
let pin = document.querySelector("#pin");
const error = document.querySelector(".error-bar")
forms.onsubmit = function () {
    let game_codes =
        {
            "127418": [
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

    if (!containsObject(pin.value, keys)) {
        // if (pin.classList.contains("shaking")){
        pin.classList.remove("shaking")
        // }
        setTimeout(function () {
            pin.classList.add("shaking", "error")
        }, 1)
        error.style.display = "block";
        pin.value = "";
    } else {
        pin.classList.remove("shaking", "error")
        error.style.display = "none";

        location.href = "index.html?pin=" + pin.value;
    }
    return false;
}
