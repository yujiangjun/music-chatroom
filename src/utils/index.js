function getBase64Image(img){
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    let dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

function dataURLtoBlob(dataUrl){
    let arr = dataUrl.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return u8arr
}

function getImageBytes(image){
    return dataURLtoBlob(getBase64Image(image))
}

function parseLyric(lyricStr){
    let result=[]
    let lycArr=[]
    lycArr = lyricStr.split('\n'); //拆分为数组
    for (let i=0;i<lycArr.length;i++){
        // console.log(lycArr[i])
        let item=lycArr[i]
        let flag = false;
        let arr = item.match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        if (!arr){
            // result.push({
            //     c:item
            // })
            continue;
        }
        let start = 0;
        for (let k of arr) {
            start += k.length; //计算歌词位置（用于下一步提取歌词）
        }
        let content = item.substring(start); //提取从start提取文字一直到最后
        for (let value of arr) {
            let t = value.substring(1, value.length - 1); //取[]间的内容
            let s = t.split(":"); //分离:前后文字
            let time = (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(0);
            for (let t of arr) {
                if (time == t.time) {//防止时间重复
                    flag = true;
                    t.c += ` ${content}`;
                    break;
                }
            }
            if (!flag) {//如果时间不重复
                result.push({
                    //对象{t:时间,c:歌词}加入ms数组
                    time: time,
                    c: content
                });
            }
        }
    }
    if (lycArr==null){
        return ''
    }
    //生成html
    let html = ``;
    for (let item of result) {
        html += `<p id=${item.time}>${item.c}</p>`;
    }
    return html
}
export {getImageBytes,parseLyric};