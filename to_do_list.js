function getAndUpdate() {
    console.log("updating list...");
    // This adds event listener for clicking event on 'Add to list' button. So whenever we click on Add to list, it will print 'updating list...' in console in inspect.
    // currently the local storage is empty, and if we check localstorage.getItem('itemsJSON') ..then it will show null


    tit = document.getElementById('title').value; // tit stores whatever is the value of elem with id=title
    desc = document.getElementById('description').value; // desc stores whatever is the value of elem with id=description
    if (localStorage.getItem('itemsJSON') == null) {  // if condition for itemsJSON=null
        itemJsonArray = []; // creates an empty array
        itemJsonArray.push([tit, desc]); // push the values of tit & desc to the array
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray)); // When we call localStorage.setItem(key, value), it stores the specified value under the specified key in the browser's localStorage.
        // stringify function in JavaScript converts an object into a JSON string. This method is commonly used to send data from the client side to a web server in a string format
        // Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays. But, JavaScript arrays are best described as arrays.
    }
    else { // if the localstorage is not empty
        itemJsonArrayStr = localStorage.getItem('itemsJSON'); // since the output will be string so we need to parse it first
        itemJsonArray = JSON.parse(itemJsonArrayStr); // parse convert a JSON string into a JavaScript object
        itemJsonArray.push([tit, desc]); // this continues to add on the data to localstorage even if its not empty
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem('itemsJSON') == null) {  // if condition for itemsJSON=null
        itemJsonArray = [];
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray)); // When we call localStorage.setItem(key, value), it stores the specified value under the specified key in the browser's localStorage.
        // stringify function in JavaScript converts an object into a JSON string. This method is commonly used to send data from the client side to a web server in a string format
        // Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays. But, JavaScript arrays are best described as arrays.
    }
    else { // if the localstorage is not empty
        itemJsonArrayStr = localStorage.getItem('itemsJSON'); // since the output will be string so we need to parse it first
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // populate the table for display
    let tableBody = document.getElementById("tableBody"); // This line gets the part of the table where we want to add new rows which is by id=tableBody
    let str = ""; // empty string to store the HTML for the new rows
    itemJsonArray.forEach((Element, index) => { // This line goes through each item in the itemJsonArray one by one. Element is the current item, and index is its position in the array.
        str +=
            `
        <tr>
            <th scope="row">${index + 1}</th> 
            <td>${Element[0]}</td>
            <td>${Element[1]}<td>
            <td><button class="btn btn-sm btn-primary" onclick = "deleted(${index})">Delete</button></td>
        </tr>`;
        /* This line adds a row to the string str for each item. Think as str = str(blank string)+ `items in row`
        Each row includes:
        The item's position in the list (index). // index+1 so that numbering starts from 1 and not 0
        The first value of the item (Element[0]).
        The second value of the item (Element[1]).
        A "Delete" button.
        NOTE : backtick `` are used for multi-line strings (template literals) to avoid using concatenation and escape sequence
        With template literals, you can embed expressions within a string using ${expression} syntax. This is known as string interpolation. eg : `My name is ${name}` where name is a variable*/
    });
    tableBody.innerHTML = str; // puts all the rows we created into the table body, so they show up on the web page
}

// adds eventlistener to the add to list button
add = document.getElementById('add'); // add is the id of 'Add to list' button and hence it targets it
add.addEventListener('click', getAndUpdate);
update();

// for working of delete button
function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJSON');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1); // 1 will only delete that one row
    localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
    update();
}

// for working of clear button
function clearStorage() {
    if (confirm("Do you really want to clear ?")) { // confirms if the user really want to clear everything
        console.log("clearing the storage");
        localStorage.clear();
        update();
    }
}

/* VERY IMPORTANT LEARNING :
Variables declared by let are only available inside the block where they’re defined.
Variables declared by var are available throughout the function in which they’re declared.
If you declare a variable without "let or var", it scopes the variable globally.
That is what creates some unexpected behaviour when declaring a variable by let, var specially inside a function and calling it outside the function.
*/