function getvidurl(wholeUrl){
    //http://localhost:63342/tmibvishal.github.io/tmibyoutube/download.htm?yurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0xT_2jfVaII
    let first = wholeUrl.indexOf("?")+1;
    let end = wholeUrl.length;
    wholeUrl = wholeUrl.slice(first, end);
    let yUrl = wholeUrl.split("=")[1]
    return decodeURIComponent(yUrl);
}

document.onload = function(){
    let current_url = document.URL;
    //console.log("current url 3 is :" + getvidurl(current_url));
    $.ajax({
        url : "http://tmibvishal.000webhostapp.com/getting_json.php",
        method : "get",
        data : {"link" : getvidurl(current_url)},
        success : function(data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    console.log("yeah");
}