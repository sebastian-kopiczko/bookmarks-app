document.getElementById('app-form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var bookmarkName = document.getElementById('bookmark-name').value;
    var bookmarkUrl = document.getElementById('bookmark-url').value;

    if(!validateForm(bookmarkName, bookmarkUrl)){
        return false;
    }

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
    document.getElementById('app-form').reset();
    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

//fetach bookmarks 
function fetchBookmarks() {
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResult = document.getElementById('bookmarks-result');

    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResult.innerHTML +=
            '<div class="panel-block">' + 
            '<h3><span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span>' + name + '</h3>' +  
            '<a href="' + url + '" class="button is-link">Visit</a>' + 
            '<button onclick="deleteBookmark(\''+ url + '\')" class="button is-danger">delete</button></div>';
    }
}
    
function validateForm(bookmarkName, bookmarkUrl){
    if(!bookmarkName || !bookmarkUrl){
        alert('Fill inputs')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!bookmarkUrl.match(regex)){
        alert('Use a valid URL');
        return false;
    }

    return true;
}
