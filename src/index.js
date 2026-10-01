const bookmarkInput = document.getElementById('bookmarkInput');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');

let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];

const drawBookmarks = function () {
  bookmarkList.innerHTML = '';

  bookmarks.forEach((url, index) => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = url;
    a.textContent = url;
    a.target = '_blank';

    const btn = document.createElement('button');
    btn.className = 'delete';
    btn.textContent = 'X';
    btn.dataset.id = index;

    li.appendChild(a);
    li.appendChild(btn);
    bookmarkList.appendChild(li);
  });
};

const handleAddBookmark = function () {
  const url = bookmarkInput.value.trim();

  if (url !== '') {
    bookmarks.push(url);
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    bookmarkInput.value = '';
    drawBookmarks();
  }
};

const handleListClick = function (event) {
  if (event.target.classList.contains('delete')) {
    const indexToDelete = Number(event.target.dataset.id);

    bookmarks.splice(indexToDelete, 1);

    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    drawBookmarks();
  }
};

addBookmarkBtn.addEventListener('click', handleAddBookmark);
bookmarkList.addEventListener('click', handleListClick);

drawBookmarks();