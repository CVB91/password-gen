import './style.css'
const resultElement = document.getElementById('result')
const lengthElement = document.getElementById('length')
const lengthLabelElement = document.getElementById('lengthLabel')
const uppercaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const generateButton = document.getElementById('generate')
const clipboardButton = document.getElementById('clipboard')
const copiedElement = document.getElementById('copied')
const strength1 = document.getElementById('strength1')
const strength2 = document.getElementById('strength2')
const strength3 = document.getElementById('strength3')
const strength4 = document.getElementById('strength4')
const strengthText = document.getElementById('strengthText')

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}
// Generate Event Listener
generateButton.addEventListener('click', () => {
  const length = +lengthElement.value // added plus sign to make 'length' a number
  const hasLower = lowercaseElement.checked
  const hasUpper = uppercaseElement.checked
  const hasNumber = numbersElement.checked
  const hasSymbol = symbolsElement.checked

  resultElement.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  )
})

// change strength elements

lengthElement.addEventListener('change', () => {
  if (lengthElement.value < 5) {
    strength1.classList.remove('bg-[#fb7c58]')
    strength2.classList.remove('bg-[#fb7c58]')
    strength1.classList.remove('bg-[#f8cd65]')
    strength2.classList.remove('bg-[#f8cd65]')
    strength3.classList.remove('bg-[#f8cd65]')
    strength1.classList.remove('bg-[#a4ffaf]')
    strength2.classList.remove('bg-[#a4ffaf]')
    strength3.classList.remove('bg-[#a4ffaf]')
    strength4.classList.remove('bg-[#a4ffaf]')
    strength1.classList.add('bg-[#f64A4A]')
    strengthText.innerText = 'TOO WEAK!'
  }

  if (lengthElement.value >= 5) {
    strength1.classList.remove('bg-[#f64A4A]')
    strength1.classList.remove('bg-[#f8cd65]')
    strength2.classList.remove('bg-[#f8cd65]')
    strength3.classList.remove('bg-[#f8cd65]')
    strength1.classList.remove('bg-[#a4ffaf]')
    strength2.classList.remove('bg-[#a4ffaf]')
    strength3.classList.remove('bg-[#a4ffaf]')
    strength4.classList.remove('bg-[#a4ffaf]')

    strength1.classList.add('bg-[#fb7c58]')
    strength2.classList.add('bg-[#fb7c58]')
    strengthText.innerText = 'WEAK'
  }

  if (lengthElement.value >= 10) {
    strength1.classList.remove('bg-[#fb7c58]')
    strength2.classList.remove('bg-[#fb7c58]')
    strength1.classList.remove('bg-[#a4ffaf]')
    strength2.classList.remove('bg-[#a4ffaf]')
    strength3.classList.remove('bg-[#a4ffaf]')
    strength4.classList.remove('bg-[#a4ffaf]')
    strength1.classList.add('bg-[#f8cd65]')
    strength2.classList.add('bg-[#f8cd65]')
    strength3.classList.add('bg-[#f8cd65]')
    strengthText.innerText = 'MEDIUM'
  }
  if (lengthElement.value >= 15) {
    strength1.classList.remove('bg-[#fb7c58]')
    strength2.classList.remove('bg-[#fb7c58]')
    strength1.classList.remove('bg-[#f8cd65]')
    strength2.classList.remove('bg-[#f8cd65]')
    strength3.classList.remove('bg-[#f8cd65]')
    strength1.classList.add('bg-[#a4ffaf]')
    strength2.classList.add('bg-[#a4ffaf]')
    strength3.classList.add('bg-[#a4ffaf]')
    strength4.classList.add('bg-[#a4ffaf]')
    strengthText.innerText = 'STRONG'
  }
})

// Copy password to clipboard

clipboardButton.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultElement.innerText // using innertext to grab the content of the result element.

  if (!password) {
    return
  }

  textarea.value = password

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  copiedElement.innerText = 'COPIED'
})

// Generate Password Function

function generatePassword(lower, upper, number, symbol, length) {
  //1. Initialise password variable
  //2. Filter out unchecked types
  //3. loop over the length and then call a generator function for each type
  //4. add final password to the password variable and return it.

  let generatedPassword = ''

  const typesCount = lower + upper + number + symbol

  console.log('typesCount:', typesCount)

  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  ) // wrapping the array elements in curly braces gives us an object with the elements as keys so that we get {lower:true} {upper: true} etc etc

  //console.log('typesArray', typesArray)

  if (typesCount === 0) {
    return ''
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const functionName = Object.keys(type)[0]

      //console.log('functionName:', functionName)

      generatedPassword += randomFunction[functionName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, length)

  copiedElement.innerText = ''

  return finalPassword
}

// Generator Functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#£$%^&*()[]{}=<>?/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

console.log(getRandomSymbol())
