
//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){

    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!checkValidation(siteName, siteUrl)){
        return false;
    }

    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //local storage test
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    /*
    local storage is used to store data right in a web browser 
    meaning that the data will remain in the storage even after 
    the browswer window has been closed.
    */


    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);

        //save the item in the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{

        //turn string back to JSON array object 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        //save booksmarks with newly-added bookmark to the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();

}

function deleteBookmark(url){

    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            bookmarks.splice(i, 1);
        }
    }
    
    //re-set back to local storage 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //update the UI
    fetchBookmarks();

}

//display items on the UI
function fetchBookmarks(){

    //get bookmarks array 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get outpupt ID
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        //append bookmark names and urls
        bookmarksResults.innerHTML += '<div>' + 
                                        '<h3 style="font-size: 20px">' + name + 
                                        ' <a class="btn-default" target="_blank" href="'+ url +'" style="padding: 10px">Visit</a> ' + 
                                        ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn-danger" href="'+ "#" +'" style="background-color: #E34639">Delete</a> ' + 
                                        '</h3>' + 
                                        '</div>';
    }

}

function checkValidation(siteName, siteUrl){
    //check if input is empty
    if(!siteName || !siteUrl){
        alert('Please fill in the form.');
        //terminate the operation (or the input will be added)
        return false;
    }

    //check if the iput url is valid 
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please enter a valid URL.');
        return false;
    }

    return true;
}