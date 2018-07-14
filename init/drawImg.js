export default  (ctx, img, size) =>{
    let {
        height: canH,
        width: canW
    } = ctx.canvas; //获取画布大小
    let {
        imgW = 0,
            imgH = 0,
            X = 0,
            Y = 0
    } = size;
    for (let i = 0, l = Math.ceil(canW / imgW); i <= l; i++) {
        ctx.drawImage(img, X + i * Math.floor(imgW), Y, imgW, imgH);
    }
}