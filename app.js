const paragraph = document.querySelector(".text");
const inputFiel = document.querySelector(".typing_text");
const mistakesEl = document.querySelector(".mistakes");
const timerEl = document.querySelector(".timer");
const wpmEl = document.querySelector(".wpm");
const cpmEl = document.querySelector(".cpm");
const btnRefresh = document.querySelector(".refresh");

let chracterIndex = (isTyping = 0);
let mistakes = 0;
let timer;
let maxTime = 30;
let timeLeft = maxTime;

const updateParagraph = () => {
  let rondomObj = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  paragraph.innerHTML = "";
  rondomObj.split("").forEach((span) => {
    let letter = `<span>${span}</span>`;
    paragraph.innerHTML += letter;
  });

  document.addEventListener('click', () => inputFiel.focus());
  paragraph.addEventListener('click', inputFiel.focus());
  console.log(paragraph)
};

updateParagraph();

const testLetter = () => {
  let typedLetter = inputFiel.value.split("")[chracterIndex];
  const characters = paragraph.querySelectorAll("span");

  console.log(chracterIndex, characters.length - 1, timeLeft);

  if (chracterIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedLetter === undefined) {
      chracterIndex--;
      if (characters[chracterIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[chracterIndex].classList.remove("correct", "incorrect");
    } else {
      if (typedLetter === characters[chracterIndex].innerText) {
        characters[chracterIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[chracterIndex].classList.add("incorrect");
      }
      chracterIndex++;
    }

    paragraph.querySelectorAll("span").forEach((span) => {
      span.classList.remove("active");
    });
    characters[chracterIndex].classList.add("active");

    mistakesEl.innerText = mistakes;
    wpm = Math.round(
      ((chracterIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || wpm == Infinity || !wpm ? 0 : wpm;
    wpmEl.innerText = wpm;
    cpmEl.innerText = chracterIndex - mistakes;
  } else {
    inputFiel.value = "";
    clearInterval(timer);
  }
};

const initTimer = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timerEl.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
};

const initGame = () => {
  updateParagraph();
  clearInterval(timer);
  inputFiel.value = "";
  chracterIndex = isTyping = 0;
  timeLeft = maxTime;
  timerEl.innerText = timeLeft;
  mistakes = 0;
  mistakesEl.innerText = mistakes;
  wpmEl.innerText = 0;
  cpmEl.innerText = 0;
};

inputFiel.addEventListener("input", testLetter);
btnRefresh.addEventListener("click", initGame);
