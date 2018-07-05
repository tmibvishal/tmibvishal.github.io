let hdImageUrl;
//this is pure java script
function hdImage(username, func){
    console.log("HD Insta Profile Image Url Fetching Started");
    callAjax(`https://apinsta.herokuapp.com/u/${username}`,function (data) {
        let userid = data.graphql.user.id;
        callAjax(`https://i.instagram.com/api/v1/users/${userid}/info/`,function (data) {
            let hdimage = data.user.hd_profile_pic_url_info.url;
            func(hdimage);
        });
    });
    //return hdImageUrl;
}

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


