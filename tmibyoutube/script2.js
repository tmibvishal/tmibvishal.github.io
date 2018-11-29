function getvidurl(wholeUrl) {
    //http://localhost:63342/tmibvishal.github.io/tmibyoutube/download.htm?yurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0xT_2jfVaII
    let first = wholeUrl.indexOf("?") + 1;
    let end = wholeUrl.length;
    wholeUrl = wholeUrl.slice(first, end);
    let yUrl = wholeUrl.split("=")[1]
    return decodeURIComponent(yUrl);
}

window.onload = function () {
    let parent = document.getElementById("video");
    console.log("yo boi");
    let current_url = document.URL;
    //console.log("current url 3 is :" + getvidurl(current_url));
    $.ajax({
        url: "http://tmibvishal.000webhostapp.com/getting_json.php",
        method: "get",
        data: {"link": getvidurl(current_url)},
        success: function (data) {
            //console.log((data));
            let jsonfile = JSON.parse(data);
            console.log(jsonfile["videoTitle"]);
            console.log(jsonfile["videoAuthor"]);
            let DOMtitle = document.createElement("div");

            let str = `<strong>${jsonfile["videoTitle"]}</strong> <br>
<strong>Channel:</strong> ${jsonfile["videoAuthor"]} <br>`;
            if (jsonfile["videoViews"] != null)
                str += `<strong>Views:</strong> ${jsonfile["videoViews"]} <br>`;
            str += `<img src="${jsonfile["videoThumbURL"]}" width="355" height="200"> <br><br> <strong>Commonly used Available Formats</strong><br> <div style="margin: 10px;"><select>`;

            let commonlyUsedAvailableFormats = jsonfile["commonlyUsedAvailableFormats"];
            commonlyUsedAvailableFormats.forEach(function (item) {

                str+= `<option value="${item["url"]}">${item["quality"]} ${item["type"]}`;

                if (item["size"] != "0MB") {
                    str+= ` (${item["size"]})`;
                }

                str+= `</option>`;
            });

            str += `</select></div>`;
            DOMtitle.innerHTML = str;
            parent.innerText = "";
            parent.appendChild(DOMtitle);
        },
        error: function (data) {
            console.log("error occured");
        }
    });
    console.log("yeah22");
}