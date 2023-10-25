// followed tutorial by Code Sketch: https://www.youtube.com/playlist?list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw
const cards = document.querySelectorAll('.match-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let response = 'The game mechanics are simple. The user will click on an image to reveal it. It will stay revealed until the user clicks on a second image. If both images match, they will stay revealed.If they don’t, they will both change back into the hidden icon. Once all of the images have been revealed the game ends.';
let wins = 0;

document.querySelector('.score').textContent = score;
document.querySelector('.response').textContent = response;

function flipCard() {
 

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
 score++;
  document.querySelector('.score').textContent = score;
 

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? (wins++,isWon(),disableCards()) : unflipCards();
}

document.querySelector('.response').textContent = response;
function isWon() 
{
  if (wins >= 8) {
	  response = `You win! It took you ${score} tries.`;
	if (score > 50) {
		response += 'Wow, it is almost impressive how bad you did.';
		document.querySelector('.response').textContent = response;
	}
	else if (score > 30) {
		response += 'Could be better but certainly could be worse.';
		document.querySelector('.response').textContent = response;
	}
	else {
		response += 'Very impressive, I am proud of you.';
		document.querySelector('.response').textContent = response;
	}
  
  }
	
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restart() {
	window.location = window.location;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
