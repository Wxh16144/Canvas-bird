import drawImg from './drawImg.js';
export default (ctx, data) => {
    let {
        'ground': img,
        'ground-size': num //图片缩小倍数
    } = data
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
    let flag=false;
    (function drawGround() {
        const count = window.requestAnimationFrame(drawGround);
        if (count % 13 == 0) {
            ctx.clearRect(0, canH - imgH, canW, imgH);
            if (flag) {
                drawImg(ctx, img, {
                    imgW,
                    imgH,
                    Y: canH - imgH,
                })
                flag = false;
            } else {
                drawImg(ctx, img, {
                    imgW,
                    imgH,
                    Y: canH - imgH,
                    X: -imgW / 2
                })
                flag = true;
            }
        }
    }());
}