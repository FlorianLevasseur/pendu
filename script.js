const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let animalsList = [
    "crevette",
    "girafe",
    "cheval",
    "espadon",
    "zebre",
    "tyrannosaure",
    "samoyede",
    "alligator",
    "chenille",
    "octodon",
    "rhinoceros",
    "alpaga",
    "salamandre",
    "narval",
    "tetraodon",
    "taiwanbeepanda",
    "coelacanthe"
]
let word = ""
let underWord = ""
let arrayWord = []
let arrayUnderWord = []
let myButtons = document.getElementsByTagName("button")
let score = 8

alphabet.forEach(element => {
    let myLetter = element.toUpperCase()
    let myButton = `<button type="button" class="col-1 m-2 btn btn-outline-primary" id="myKey${myLetter}">${myLetter}</button>`
    document.getElementById("myKeyboard").innerHTML += myButton
})

function randomWord(myList) {
    return myList[Math.floor(Math.random() * myList.length)]
}

function verifyWord(myWord, letter) {
    arrayWord = Array.from(myWord)
    let arrayIndex = []

    arrayWord.forEach((element, index) => {
        if (element == letter) {
            arrayIndex.push(index)
        }
    })

    if (arrayIndex.length == 0) {
        return null
    } else {
        return arrayIndex
    }
}

function reset() {
    for (let i = 1; i < myButtons.length; i++) {
        myButtons[i].disabled = false
    }
    document.getElementById('canvas').getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

}

function endGame() {
    for (let i = 1; i < myButtons.length; i++) {
        myButtons[i].disabled = true
    }
}

function dessiner() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    switch(score){
        case 7:
            ctx.beginPath();
            ctx.moveTo(50, 250);
            ctx.lineTo(250, 250);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(90, 250);
            ctx.lineTo(90, 50);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(90, 50);
            ctx.lineTo(200, 50);
            ctx.moveTo(90, 80);
            ctx.lineTo(120, 50)
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(200, 50);
            ctx.lineTo(200, 80);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(220, 100);
            ctx.arc(200, 100, 20, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(200, 120);
            ctx.lineTo(200, 180);
            ctx.stroke();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(175, 160);
            ctx.lineTo(200, 125);
            ctx.lineTo(225, 160);
            ctx.stroke();
            break;
        case 0:
            ctx.beginPath();
            ctx.moveTo(175, 215);
            ctx.lineTo(200, 180);
            ctx.lineTo(225, 215);
            ctx.moveTo(188, 90);
            ctx.lineTo(198, 100);
            ctx.moveTo(198, 90);
            ctx.lineTo(188, 100);
            ctx.moveTo(202, 90);
            ctx.lineTo(212, 100);
            ctx.moveTo(212, 90);
            ctx.lineTo(202, 100);
            ctx.stroke();
            break;
    }
}

function drawWin() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    document.getElementById('canvas').getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2, true);  // Cercle extérieur
    ctx.moveTo(185,150);
    ctx.arc(150, 150, 35, 0, Math.PI, false);  // Bouche (sens horaire)
    ctx.moveTo(140, 140);
    ctx.arc(135, 140, 5, 0, Math.PI * 2, true);  // Oeil gauche
    ctx.moveTo(170, 140);
    ctx.arc(165, 140, 5, 0, Math.PI * 2, true);  // Oeil droite
    ctx.stroke();
  }
  

document.getElementById("new").addEventListener("click", () => {
    reset()
    score = 8
    word = randomWord(animalsList)
    console.log(word)
    arrayWord = Array.from(word)
    underWord = ""

    arrayWord.forEach(element => {
        underWord += "_ "
    })

    document.getElementById("hiddenWord").innerHTML = underWord
    document.getElementById("myScore").innerHTML = `Nombre de tentatives restantes : ${score}`
})

const writeLetter = (e) => {
    if (e.target.nodeName == "BUTTON" && e.target.id != "new") {
        let letterId = Array.from(e.target.id).pop().toLowerCase()
        arrayUnderWord = underWord.split(" ")
        if (verifyWord(word, letterId) != null) {
            for (let i = 0; i < arrayWord.length; i++) {
                if (arrayWord[i] == letterId) {
                    arrayUnderWord[i] = letterId.toUpperCase()
                }
            }
            underWord = arrayUnderWord.join(" ")
            document.getElementById("hiddenWord").innerHTML = underWord
            if(!underWord.includes("_")){
                document.getElementById("myScore").innerHTML = `VICTOIRE !!!!!`
                drawWin()
                endGame()
            }

        } else {
            if(score <= 1) {
                score--
                document.getElementById("myScore").innerHTML = "PERDUUUUUUUU ! La bonne réponse était " + word.toUpperCase()
                dessiner()
                endGame()

            } else {
                score--
                dessiner()
                document.getElementById("myScore").innerHTML = `Nombre de tentatives restantes : ${score}`
            }
            
            

        }
        document.getElementById(e.target.id).disabled = true
    }
}

endGame()
document.addEventListener("click", writeLetter)

  