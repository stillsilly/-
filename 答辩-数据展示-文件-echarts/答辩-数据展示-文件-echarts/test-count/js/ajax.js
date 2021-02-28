ROOT_PATH =''   // 'http://115.29.4.106:80'
function ajax(url, param, s, f) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            s && s(xmlhttp.responseText)
        }
    }
    xmlhttp.open("POST", ROOT_PATH + url, true)
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xmlhttp.send(getForm(param))
}

function getForm(param) {
    let formData = "";
    for (let key in param) {
        if (param[key] === undefined) {
            param[key] = ''
        }
        if (param[key] != null && typeof(param[key]) == 'object') {
            let obj = param[key]
            if (isArray(obj)) {
                formData += obj.reduce((str, now) => {
                    if (typeof(now) == 'object') {
                        return str
                    }
                    return str + `${key}=${encodeURIComponent(now)}&`
                }, '')
            }
            continue;
        } else {
            formData += `${key}=${encodeURIComponent(param[key])}&`
        }
    }
    if (formData == "") {
        return formData;
    } else {
        return formData.substr(0, formData.length - 1);
    }
}