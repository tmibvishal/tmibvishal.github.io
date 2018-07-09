let textbox;
let btnAdd;
let list;

$(document).ready(function () {
    textbox = $("#textbox");
    btnAdd = $("#btnAdd");
    list = $("#list");
    todolist = [];
    btnAdd.click(makeRequest);

    displayTheWholeList();

});

function displayTheWholeList(){
    $.ajax({
        url: `/givetodo`,
        method: "get",
        success: function(data){
            data.forEach(function(data){
                addEle(data)
            });
        }
    });
}
function makeRequest(){
    $.ajax({
        url: `/add`,
        //or send through url like this url: `/add?name=${textbox.val()}`
        data: {name: `${textbox.val()}`},
        method: "post",
        success: function(data){
            console.log(data);
            addEle(data);
        }
    });
}

function addEle(data){
        let value = `<li>
                        <input type="hidden">
                        <span>${data}</span>
                        <input onclick="editEle(this)" type="button" value="Edit">
                        <input onclick="updateEle(this)" type="hidden" value="Update">
                        <input onclick="delEle(this)" type="button" value="Delete">
                     </li>`;
        list.append(value);
}

function editEle(jsEle){
    let editButton = $(jsEle);
    let text = editButton.prev();
    let grandParent = text.prev();
    editButton.attr("type","hidden");
    grandParent.val(text.text());
    text.text("")
    grandParent.attr("type","text");
    editButton.next().attr("type","button");
}

function updateEle(jsEle){
    let updateButton = $(jsEle);
    let editButton = updateButton.prev();
    let text = editButton.prev();
    let grandParent = text.prev();
    let number = updateButton.parent().index()
    $.ajax({
        url: `/update`,
        method: "post",
        data: {name: grandParent.val(), number: number },
        success: function(data){
            console.log(data);
            grandParent.attr("type","hidden");
            text.text(data)
            editButton.attr("type","button");
            updateButton.attr("type","hidden");
        }
    });
}

function delEle(jsEle){
    let delButton = $(jsEle);
    $.ajax({
        url: `/delete?number=${(delButton.parent().index())}`,
        method: "get",
        success: function(data){
            delButton.parent().remove();
        }
    });

}