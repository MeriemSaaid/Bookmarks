//Add eventlistner the form
document.querySelector("#myForm").addEventListener("submit", saveBookMark);
document.querySelector("#filter").addEventListener("keyup", filterBoormarks);

function saveBookMark(e) {
  e.preventDefault();

  // Get User input
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  // Create an object for bookmark
  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Check if name or url is empty
  if (siteName === "" || siteUrl === "") {
    alert("Site name and url cannot be empty");
    return false;
  }

  // Check if the bookmarks array exists
  if (localStorage.getItem("bookmarks") === null) {
    // Init bookmarks array
    var bookmarks = [];
    // Adding new bookmark into array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add new bookmark into bookmarks
    bookmarks.push(bookmark);
    //reset bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  // Rest the form
  document.querySelector("#myForm").reset();

  fetchBookmarks();
}
//Function to print the bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get the output div by id
  var bookmarksResult = document.getElementById("bookmarksResult");

  // console.log(bookmarksResult);

  // Reset the output div
  bookmarksResult.innerHTML = "";

  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    //Div
    var newDiv = document.createElement("div");

    //Print title
    var h5 = document.createElement("h5");
    h5.textContent = name;
    h5.className = "name";
    //h5.setAttribute("style", "display:inline;");
    newDiv.appendChild(h5);

    var visitLink = document.createElement("a");
    visitLink.setAttribute("class", "btn btn-success");
    // visitLink.setAttribute("style", "display:inline;");
    visitLink.setAttribute("href", url);
    visitLink.textContent = "Visit";
    newDiv.appendChild(visitLink);

    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger");
    deleteBtn.setAttribute("style", "display:inline;");
    deleteBtn.setAttribute(
      "onclick",
      "deleteBookmarks('" + bookmarks[i].name + "');"
    );
    deleteBtn.textContent = "Delete";
    newDiv.appendChild(deleteBtn);
    bookmarksResult.appendChild(newDiv);
  }
}
//Fuction to delete a bookmark
function deleteBookmarks(name) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === name) {
      bookmarks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}
function filterBoormarks() {
  var bookmarks = document.querySelectorAll(".name");
  var inputFilter = document.querySelector("#filter").value.toUpperCase();
  // alert(inputFilter);
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].textContent.toUpperCase();
    if (name.includes(inputFilter)) {
      bookmarks[i].parentElement.style.display = "block";
    } else {
      bookmarks[i].parentElement.style.display = "none";
      alert(2);
    }
  }
}
