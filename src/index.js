const bookmarkInput = document.getElementById('bookmarkInput');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');

let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];

const drawBookmarks = function() {
  bookmarkList.innerHTML = '';
  
  for (let i = 0; i < bookmarks.length; i++) {
    const li = document.createElement('li');
    
    const a = document.createElement('a');
    a.href = bookmarks[i];
    a.textContent = bookmarks[i];
    a.target = "_blank";
    
    const btn = document.createElement('button');
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
};

const handleAddBookmark = function() {
  const url = bookmarkInput.value.trim();
  
  if (url !== '') {
    bookmarks.push(url);
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    bookmarkInput.value = '';
    drawBookmarks();
  }
};

addBookmarkBtn.addEventListener('click', handleAddBookmark);

drawBookmarks();