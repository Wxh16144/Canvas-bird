export default function (ctx, img) {
    const num = 0.125; //图片缩小倍数
    let {
        height: imgH,
        width: imgW
    } = img; //获取图片资源大小
    let {
        height: canH,
        width: canW
    } = ctx.canvas; //获取画布大小
    imgW *= num;
    imgH *= num;
    let flag = false;
    (function drawGround() {
        const count = window.requestAnimationFrame(drawGround);
        if (count % 16 == 0) {
            ctx.clearRect(0, canH - imgH, canW, imgH);
            if (flag) {
                for (let i = 0, l = Math.ceil(canW / imgW); i <= l; i++) {
                    ctx.drawImage(img, i * Math.floor(imgW), canH - imgH, imgW, imgH);
                    flag = false;
                }
            } else {
                for (let i = 0, l = Math.ceil(canW / imgW); i <= l; i++) {
                    ctx.drawImage(img, (i - 1) * Math.floor(imgW) + imgW / 2, canH - imgH, imgW, imgH);
                    flag = true;
                }
            }
        }
    }());
}