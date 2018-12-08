window.onload = function() {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/getData2", true);
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            console.log(xmlHttp.responseText);  // 这里请求成功了打印给我返回的内容(这里因为是由index.http文件调用,所以打印在浏览器上)
            console.log(typeof xmlHttp.responseText) // 打印内容的类型
        }
    }
}