const languages = iso_languages;
const primaryLang = document.querySelector("#primary")
const secLang = document.querySelector("#secondary")
primaryLang.innerHTML = getSelections(languages)
secLang.innerHTML = getSelections(languages)

function getSelections(data) {
  return Object.entries(data)
  .map(([lang, langCode]) => `<option value=${langCode}>${langCode} | ${lang}</option>`)
  .join("")
}

document.querySelector("#translate").addEventListener("click", function (e) {
  e.preventDefault()
  langTranslate()
})

function langTranslate() {
  let primary = primaryLang.value
  let secondary = secLang.value
  let text = document.querySelector("#text").value
  
fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${primary}|${secondary}`) 
.then(res => res.json())
.then(data => {
let result = document.querySelector("#result")
result.style.display = "block"
result.innerHTML = data.responseData.translatedText
})
.catch(error => console.log(error))
}

function swap() {
let change = secLang.value;
  secLang.value = primaryLang.value;
  primaryLang.value = change
  
fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${change}|${primaryLang.value}`) 
.then(res => res.json())
.then(data => {

result.style.display = "block"
result.innerHTML = data.responseData.translatedText
})
.catch(error => console.log(error))
}
