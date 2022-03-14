const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numberEl = document.querySelector("#numbers");
const symbolEl = document.querySelector("#symbols");
const generateEl = document.querySelector("#generate");
const clipboardEl = document.querySelector("#clipboard");
const messageEl = document.querySelector("#message");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
  refreshClipboard();
});

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  //   alert("password copied to clipboard");
  shakeResult();
  hideMessage();
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;

  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  const newArray = [];

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      newArray.push(funcName);
      //   generatedPassword += randomFunc[funcName]();
    });
  }

  shuffle(newArray);
  const shuffledArray = newArray

  for (let i = 0; i < length; i += typesCount){
    shuffledArray.forEach(type => {
        const funcName = type
        generatedPassword += randomFunc[funcName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function refreshClipboard() {
  resultEl.style.color = "black";
  clipboardEl.style.color = "white";
  clipboardEl.style.background = "var(--blue-color)";
}

function shakeResult() {
  clipboardEl.style.color = "var(--blue-color)";
  clipboardEl.style.background = "white";
  resultEl.style.color = "var(--blue-color)";
  resultEl.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
}

function hideMessage() {
  messageEl.style.display = "block";
  clipboardEl.disabled = true;
  setTimeout(() => {
    messageEl.style.display = "none";
    resultEl.style.animation = "none";
    clipboardEl.disabled = false;
  }, 1000);
}
