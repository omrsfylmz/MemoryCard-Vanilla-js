const card = document.querySelectorAll(".memory-card");
let hasFlipped = false;
let firtCard, secondCard;
let lockBoard = false;
function flipCard() {
  if (lockBoard) return;

  if (this === firtCard) return;
  this.classList.add("flip");

  if (!hasFlipped) {
    hasFlipped = true;
    firtCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}
function disableCards() {
  firtCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unflipedCard() {
  lockBoard = true;
  setTimeout(() => {
    firtCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}
function checkForMatch() {
  let isMatched = firtCard.dataset.framework === secondCard.dataset.framework;
  isMatched ? disableCards() : unflipedCard();
}
function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firtCard, secondCard] = [null, null];
}
(function suffle() {
  card.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
card.forEach((card) => card.addEventListener("click", flipCard));
