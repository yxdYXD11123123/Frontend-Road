
function ajax(options) {
    let dataStr = "";
    for (let k in options.data) {
        dataStr += k + "=" + options.data[k] + "&";
    };
    dataStr = dataStr.slice(0, -1);
    let type = (options.type || "get").toLowerCase();
    let url = options.url || "";
    let data = dataStr || "";
    let success = options.success;
    let xhr = new XMLHttpRequest();
    if (type == "get") {
        url = url + "?" + data;
        data = null;
    }
    xhr.open(type, url);
    if (type == "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    }
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            success(xhr.responseText);
        }
    }
}