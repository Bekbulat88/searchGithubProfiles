const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')
//мой код

const formEl = document.createElement('form');
formEl.classList.add('search');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log(new FormData(e.target))
  const inputsValue = Object.fromEntries(new FormData(e.target))
const response  = await fetch(`https://api.github.com/users/${inputsValue.name}`)

if (response.ok) {
const data = await response.json();
wrapper.appendChild(createProfileEl(data));
mainEl.appendChild(wrapper);
inputEl.value = '';


} else {
    alert('пользователь не найден')
}
})


const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name')

const searchButton = document.createElement('button');
searchButton.classList.add('search-button');
searchButton.setAttribute('type', 'submit');
searchButton.innerHTML = 'Поиск'

formEl.appendChild(inputEl);
formEl.appendChild(searchButton);
mainEl.appendChild(formEl);

function createProfileEl (profileData) {
const element = document.createElement('div');
element.classList.add('profile');
element.innerHTML = `
<img class = 'search-image' src = ${profileData.avatar_url}></img>
<p class = 'search-text'><span>Имя</span>${profileData.name}</p>
<p class = 'search-text'><span>Город</span>${profileData.location}</p>
<p class = 'search-text'><span>О себе</span>${profileData.bio}</p>
`
element.appendChild(createDeleteBtnEl())
return element
}

function createDeleteBtnEl () {
const element = document.createElement('button');
element.classList.add('delete-button');
element.textContent = 'Удалить';
element.addEventListener('click', (e) => {
wrapper.innerHTML = ''
})
return element
}


