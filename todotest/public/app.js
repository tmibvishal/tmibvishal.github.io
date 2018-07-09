function makeRequest(){
    $.ajax({
        url: "/add",
        method: "get",
        success: function(data){
            console.log(data);
        }
    });
}