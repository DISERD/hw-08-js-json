import Handlebars from 'handlebars';
import sourceTemplate from 'bundle-text:./template.hbs';

const template = Handlebars.compile(sourceTemplate);

let bookmarkInput = document.getElementById('bookmarkInput');
let addBookmarkBtn = document.getElementById('addBookmarkBtn');
let bookmarkList = document.getElementById('bookmarkList');

let bookmarks = [];
if (localStorage.getItem('myBookmarks')) {
  bookmarks = JSON.parse(localStorage.getItem('myBookmarks'));
}

function drawBookmarks() {
  bookmarkList.innerHTML = '';
  
  for (let i = 0; i < bookmarks.length; i++) {
    let li = document.createElement('li');
    
    let a = document.createElement('a');
    a.href = bookmarks[i];
    a.textContent = bookmarks[i];
    
    let btn = document.createElement('button');
    btn.className = 'delete';
    btn.textContent = 'X';
    
    btn.onclick = function() {
      bookmarks.splice(i, 1);
      localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
      drawBookmarks();
    };

    li.appendChild(a);
    li.appendChild(btn);
    bookmarkList.appendChild(li);
  }
}

addBookmarkBtn.onclick = function() {
  if (bookmarkInput.value !== '') {
    bookmarks.push(bookmarkInput.value);
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    bookmarkInput.value = '';
    drawBookmarks();
  }
};

drawBookmarks();

let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let saveBtn = document.getElementById('saveBtn');

if (localStorage.getItem('userLogin')) {
  usernameInput.value = localStorage.getItem('userLogin');
}
if (localStorage.getItem('userPass')) {
  passwordInput.value = localStorage.getItem('userPass');
}

saveBtn.onclick = function() {
  localStorage.setItem('userLogin', usernameInput.value);
  localStorage.setItem('userPass', passwordInput.value);
  alert('Дані збережені!');
};

let productsContainer = document.getElementById('productsContainer');
let searchInput = document.getElementById('searchInput');

let products = [
  { name: 'Apple', price: '10$', description: 'Смачне яблуко' },
  { name: 'Banana', price: '15$', description: 'Жовтий банан' },
  { name: 'Orange', price: '20$', description: 'Солодкий апельсин' }
];

productsContainer.innerHTML = template(products);

searchInput.oninput = function() {
  let text = searchInput.value.toLowerCase();
  let foundProducts = [];
  
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(text)) {
      foundProducts.push(products[i]);
    }
  }
  
  productsContainer.innerHTML = template(foundProducts);
};