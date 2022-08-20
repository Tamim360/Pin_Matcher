// global variables
let varifyPinButton = document.querySelector("#verify-pin")
let generatePinButton = document.querySelector("#generate-pin")
let typedNumbersField = document.getElementById("typed-numbers")
let displayPinField = document.getElementById("display-pin")
let buttons = document.querySelectorAll(".button")
let success = document.getElementById("pin-success")
let failure = document.getElementById("pin-failure")
let tryLeftField = document.getElementById("tryLeft")
let tryLeft = parseInt(tryLeftField.innerText)
let tryLefttxt = document.getElementById("tryLefttxt")

// generate pin
function generatePin() {
    let generatedPin = Math.round(Math.random() * 10000)
    return generatedPin
}

// pin checking and update display field value
function pinCheck() {
    let pin = generatePin()
    if ((pin + "").length < 4) {
        pinCheck()
    } else {
        displayPinField.value = pin
    }
}

// pin generator button
generatePinButton.addEventListener("click", function (e) {
    pinCheck()
})

// numbers buttons
document.getElementById("calculator").addEventListener("click", function (e) {
    if (e.target.className == "calc-button-row") {
        return false;
    } else {
        let numbers = e.target.innerText
        if (isNaN(numbers)) {
            if (numbers == "C") {
                typedNumbersField.value = ""
            } else if (numbers == "<") {
                let splited = typedNumbersField.value.split("")
                splited.pop()
                let joined = splited.join("")
                typedNumbersField.value = joined
            }
        } else {
            typedNumbersField.value += numbers
        }
    }
})


// varify pin
varifyPinButton.addEventListener("click", function (e) {
    let typedNumbers = document.getElementById("typed-numbers").value
    let displayPin = document.getElementById("display-pin").value

    if (typedNumbers === displayPin) {
        success.style.display = "block"
        failure.style.display = "none"
    } else {
        success.style.display = "none"
        failure.style.display = "block"
        tryLeft--
        tryLeftField.innerText = tryLeft
        if (tryLeft <= 0) {
            buttons.forEach(button => {
                button.style.pointerEvents = "none"
            })
            varifyPinButton.setAttribute("disabled", "true")
            generatePinButton.setAttribute("disabled", "true")
            tryLeftField.innerText = "Your life is over!"
            tryLefttxt.innerText = ""
        }
    }
    setTimeout(() => {
        success.style.display = "none"
        failure.style.display = "none"
    }, 2000);
})