let hdImageUrl;
//this is pure java script
function hdImage(username, funcsuccess, funcusernamenotfound){
    console.log("HD Insta Profile Image Url Fetching Started");
    callAjax(`https://apinsta.herokuapp.com/u/${username}`,function (data) {
        console.log(data);
        data = JSON.parse(data);

        let userid = data.graphql.user.id;
        callAjax(`https://i.instagram.com/api/v1/users/${userid}/info/`,function (data) {
            data = JSON.parse(data);
            let hdimage = data.user.hd_profile_pic_url_info.url;
            funcsuccess(hdimage);
        },function(){});
    },funcusernamenotfound);
    //return hdImageUrl;
}

function callAjax(url, callback, funcusernamenotfound){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4){
            if(xmlhttp.status == 200){
                callback(xmlhttp.responseText);
            }
            else{
                funcusernamenotfound();
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


