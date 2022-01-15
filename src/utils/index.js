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

export {getImageBytes};