window.onload = function () {
    let textBox = document.getElementById("textBox");
    let btnAdd = document.getElementById("btnAdd");
    let btnShowDeletedItems = document.getElementById("btnShowDeletedItems");
    let list = document.getElementById("list");

    let currentcount =0;
    list.removeChild(list.childNodes[0]);
    let hiddenItemsArray = [];
    btnAdd.onclick = function () {
        let listItem = document.createElement("li");
        listItem.innerText = textBox.value;
        let btnRemove = document.createElement("input");
        btnRemove.type = "submit";
        btnRemove.value = "Remove";
        btnRemove.count = currentcount;
        btnRemove.id = "btnID" + currentcount;
        listItem.id = "listID" + currentcount;
        currentcount++;
        btnRemove.onclick = function () {
            let listItem = document.getElementById("listID" + btnRemove.count);
            listItem.style.display = "none";
            hiddenItemsArray.push(btnRemove.count);
            listItem.children[0].value = "Delete Permently";
            btnRemove.onclick = function () {
                list.removeChild(listItem);
            }
            let btnRestore = document.createElement("input");
            btnRestore.type = "button"
            btnRestore.value = "Restore"
            btnRestore.id = "btnRestoreID"+ btnRemove.count;
            btnRestore.count = btnRemove.count;
            btnRestore.onclick = function () {

            }
            /*
            for(let x=0; x<list.childElementCount; x++){
                if(list.children[x].children[0].count == btnRemove.count){
                    list.children[x].style.display = "none";
                    hiddenItemsArray.push(btnRemove.count);
                    //list.removeChild(list.childNodes[x]);
                }

            }
            */

        }
        listItem.appendChild(btnRemove);
        list.appendChild(listItem);
    }
    btnShowDeletedItems.onclick = function () {

            for (let x = 0; x < list.childElementCount; x++) {
                for(let j=0;j<hiddenItemsArray.length;j++) {
                    if (hiddenItemsArray[j] == list.children[x].children[0].count) {
                        list.children[x].style.display = "list-item";
                    }
                }
            }

    }
}