document.getElementById('app-form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();
    var bookmarkName = document.getElementById('bookmark-name').value;
    var bookmarkUrl = document.getElementById('bookmark-url').value;
    var bookmark = {
        name: bookmarkName,
        url: bookmarkUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}