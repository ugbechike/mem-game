var cardDeck = document.getElementById('card-deck');
var cards = document.getElementsByClassName('card');
console.log(cardDeck);
console.log(cards);
var arrayOfCards = [...cards]; //here we spread the cards in an array and stored in arrayOfCards.
console.log(arrayOfCards);
var openCards = []; //we are creating an empty array for our open cards
var clicks = 0;
/*we want to shuffle the cards in the array,
therefore we will use for loop through the array.
*/
var matchedCardlist = [];
var modal = document.getElementById("popup1");

//timer global variable
var time;
var interval;


function shuffle(inputArray) {
    for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
        var temporaryValue = inputArray[currentIndex];
        var randomIndex = Math.floor(Math.random() * currentIndex); //we want the cards to generate randomly
        //now lets switch the cards

        inputArray[currentIndex] = inputArray[randomIndex]
        inputArray[randomIndex] = temporaryValue;
    }
    return inputArray;
}
// we ow want to replace the card-deck with the shuffled card
// //so to do this, we will have to empty our card-deck by using the DOM target
// but note that we already stored the DOM in a var called cardDeck
function startGame() {
    cardDeck.innerHTML = " "; //this will empty our card-deck.
    var fiveMinutes = 60 * 5,
        display = document.querySelector('.timer');
    startTimer(fiveMinutes, display);
    arrayOfCards = shuffle(arrayOfCards); //shuffle card array.
    for (var i = 0; i < arrayOfCards.length; i++) {
        cardDeck.appendChild(arrayOfCards[i]);
        arrayOfCards[i].addEventListener("click", displayCard);
        arrayOfCards[i].classList.remove("open", "show", "match", "disabled"); //we don't want our cards to show when we refresh the game, hence we have to remove the class.
        arrayOfCards[i].addEventListener("click", cardOpen); //this function will make sure we don't open more than 2 cards and will match the card if they are thesame.
        clicks = 0;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;
        arrayOfCards[i].addEventListener("click", congrats);

    }

}
document.body.onload = startGame;

function refreshMe() {
    clearInterval(interval);
    startGame();
}

//Now we want to display the cards in the deck, recall that we created a loop for our arrayofcards, let add an event listener on the loop
//to show, open and disable the card after clcik once. therefore we added the function on the startGame().
function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}



//for the matched cards, we will refence our openCards var to store any two cards we open.
//now lets create a function
function cardOpen() {
    openCards.push(this);

    if (openCards.length == 2) {
        clicks++;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;
        if (openCards[0].type == openCards[1].type) {
            matchedCard(...openCards);
        } else {
            unmatchedCard(...openCards);
        }
    }

}

//but let us create the matched cards function here
function matchedCard(firstCard, secondCard) {
    firstCard.classList.add("match", "disabled");
    secondCard.classList.add("match", "disabled");
    firstCard.classList.remove("open", "show");
    secondCard.classList.remove("open", "show");
    matchedCardlist.push(firstCard, secondCard);
    openCards = [];
}
//lets create a function for unmatchedCard
function unmatchedCard(firstCard, secondCard) {
    firstCard.classList.add("unmatched", "open", "show", "disabled");
    secondCard.classList.add("unmatched", "open", "show", "disabled");
    disabled();
    setTimeout(function() {
        firstCard.classList.remove("unmatched", "open", "show", "disabled");
        secondCard.classList.remove("unmatched", "open", "show", "disabled");
        enabled();
        openCards = [];

    }, 1000);

}

function disabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.add("disabled");
    });
};


function enabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.remove("disabled");
    });
    matchedCardlist.forEach(function(card) {
        card.classList.add("disabled");
    });
};

function congrats() {
    if (matchedCardlist.length == arrayOfCards.length) {
        modal.classList.add("show");
        document.getElementById('totalTime').innerHTML = time;
        // var stars = document.querySelector("starRating").innerHTML;
        // document.getElementById("starRating").innerHTML = starRating;
    }
    closeIcon.addEventListener("click", closeCongrats);
};

var closeIcon = document.getElementById("close-icon");

function closeCongrats() {
    modal.classList.remove("show");
    startGame();
}

function playAgain() {
    modal.classList.remove("show");
    refreshMe();
    location.reload();
};

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        time = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//timer
// var mySeconds = setInterval(showSeconds, 1000);
// var myMinutes = setInterval(showMinutes, 60000);
// var myHours = setInterval(showHours, 360000);

// function showSeconds() {
//     if (sec < 59) {
//         sec++;
//         //document.getElementById('seconds').innerHTML = sec;
//         document.querySelector(".sec").innerHTML = sec;
//     } else if (sec = 60) {
//         sec = 0;
//         // document.getElementById('seconds').innerHTML = "0" + sec;
//         document.querySelector(".sec").innerHTML = "0" + sec;
//     }

// }

// function showMinutes() {
//     if (min < 59) {
//         min++;
//         document.getElementById('second').innerHTML = min;
//     } else if (sec = 60) {
//         min = 0;
//         document.getElementById('seconds').innerHTML = min;
//     }

// }

// function showHours() {
//     if (hours < 23) {
//         hours++;
//         document.getElementById('seconds').innerHTML = hours;
//     } else if (sec = 24) {
//         hours = 0;
//         document.getElementById('seconds').innerHTML = hours;
//     }

// }

// function clearTimer() {
//     clearInterval(mySeconds);
//     clearInterval(myMinutes);
//     clearInterval(myHours);

// }
//starRating