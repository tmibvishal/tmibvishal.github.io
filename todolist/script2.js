window.onload = function () {
    let array = [];
    let doneArray = [];
    let textBox = document.getElementById("textBox");
    let btnAdd = document.getElementById("btnAdd");
    let btnShowDeletedItems = document.getElementById("btnShowDeletedItems");
    let list = document.getElementById("list");
    let doneList = document.getElementById("doneList");

    function deleteElement() {
        array.splice(this.id.substring(6), 1);
        loadlist();
    }
    function doneElement() {
        //console.log()
        doneArray.push(array[this.id.substring(7)]);
        array.splice(this.id.substring(7), 1);
        loadlist();
        loadDonelist();
    }
    function deleteElementinDone() {
        doneArray.splice(this.id.substring(12), 1);
        loadDonelist();
    }
    function undoneElementinDone() {
        array.push(doneArray[this.id.substring(13)]);
        doneArray.splice(this.id.substring(13), 1);
        loadlist();
        loadDonelist();
    }

    function loadlist() {
        let start = new Date();

        //algorith 1 take 15 milli sec to add 300 elements and will not go higer than this for lesser elements
        let string = "";
        for (let x = 0; x < array.length; x++) {
            string += `<li><input type="checkbox" value="done" name="doneCheckBox" id="btnDone${x}">${array[x]}<input type="button" value="x" name="deleteButton" id="btnDel${x}"></li>`;
        }
        list.innerHTML = string;
        let btnDelete = document.getElementsByName("deleteButton");
        btnDelete.forEach(function (y) {
            y.onclick = function () {
                deleteElement.call(y)
            }
        });
        let btnDone = document.getElementsByName("doneCheckBox");
        btnDone.forEach(function (y) {
            y.onclick = function () {
                doneElement.call(y)
            }
        });

        /*
                //algorith 2 take 15 milli sec to add 300 elements but sometime it will go as high as 30 milli second for lesser elements
                list.innerText = ""
                for (let x = 0; x < array.length; x++) {
                    let listitem = document.createElement("li");
                    let ButtonDelete = document.createElement("input");
                    ButtonDelete.type = "Button";
                    ButtonDelete.value = "x";
                    listitem.innerText = array[x];
                    ButtonDelete.id = "btnDel" + x;
                    ButtonDelete.onclick = function () {
                        deleteElement.call(ButtonDelete);
                    }
                    listitem.appendChild(ButtonDelete)
                    list.appendChild(listitem)
                }
        */
        console.log("Time taken to run loadlist" + (new Date() - start));
    }

    function loadDonelist() {
        let start = new Date();

        //algorith 1 take 15 milli sec to add 300 elements and will not go higer than this for lesser elements
        let string = "";
        for (let x = 0; x < doneArray.length; x++) {
            string += `<li><input type="checkbox" checked="true" value="done" name="doneCheckBoxinDone" id="btnDoneInDone${x}">${doneArray[x]}<input type="button" value="x" name="deleteButtoninDone" id="btnDelinDone${x}"></li>`;
        }
        doneList.innerHTML = string;

        let btnDelete = document.getElementsByName("deleteButtoninDone");
        btnDelete.forEach(function (y) {
            y.onclick = function () {
                deleteElementinDone.call(y)
            }
        });
        let btnDone = document.getElementsByName("doneCheckBoxinDone");
        btnDone.forEach(function (y) {
            y.onclick = function () {
                undoneElementinDone.call(y)
            }
        });

    }

    btnAdd.onclick = function () {
        array.push(textBox.value);
        loadlist();
    }
}