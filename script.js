const resultEl = document.querySelector('.result'); // Changed from 'result' to '.result'
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbols'); // Changed from 'symbol' to 'symbols'
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lowerFn: getRandomLowercase,
    upperFn: getRandomUppercase,
    numberFn: getRandomNumbers,
    symbolFn: getRandomSymbols
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

// clipboardEl.addEventListener('click', () => {
//     const textarea = document.createElement('textarea');
//     textarea.value = resultEl.innerText;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textarea);
//     alert('Text Copied!');
// })

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.value = resultEl.innerText;
    if (textarea.value === '') {
        alert('No Text Present');
    } else {
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Text Copied!');
    }
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[`${funcName}Fn`]();
        });
    }

    return generatedPassword.slice(0, length);
}

// To generate lower case letter we have to between 97 to 122 char code
function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Upper case letter - 65 to 90
function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// To generate number you to be between 48 to 57
function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate Symbols
function getRandomSymbols() {
    const symbols = "!@#$%^&*()_+~`|}{[]:";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
