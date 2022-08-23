

let setstorage=document.getElementById("libraryForm")
setstorage.addEventListener("submit",settingstorage)

function settingstorage(){


console.log("book1")
let name1 = document.getElementById('bookName').value;
let author1 = document.getElementById('author').value;
let book1 = localStorage.getItem("book1");
if (book1 == null) {
    bookObj = [];
    
}
else {
    bookObj = JSON.parse(book1);
   
}
let myObj = {
    givenname:name1,
    givenauthor: author1
}
bookObj.push(myObj);
localStorage.setItem("book1",JSON.stringify(bookObj));

}
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        // console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr id="row">
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                           <td> <button id="btn" onclick="deletebook();">delete</button></td>
                        </tr>
                       `;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('status');
      
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Message:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}


// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
   
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

function deletebook(){
  console.log("i m deleting")
  let book1 = localStorage.getItem("book1");
  if (book1 == null) {
      bookObj = [];

  }
  else {
      bookObj = JSON.parse(book1);
  }
  document.getElementById("row").remove();


  localStorage.setItem("book1", JSON.stringify(bookObj));
}

let searchtext= document.getElementById("searchTxt");
searchtext.addEventListener("input",function(){
    // console.log("hey")
    let inputval=searchtext.value.toLowerCase();
  
  var bookrow=document.getElementById("row")
    Array.from(bookrow).forEach(function(element) {
        // console.log("hey1")
        let bookhub=table.getElementsByTagName("td").innerText;

        // console.log("het")
        if(bookhub.includes(inputval)){
            element.style.display="block";
            // console.log("input fired",inputval);
        }
        else{
           element.style.display="none";
        //    console.log("input not fired",inputval);
        }
    });
});
