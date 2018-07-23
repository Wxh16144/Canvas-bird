import drawImg from './drawImg.js';
let flag = false;
export default (ctx, data, status = false) => {
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
    (function drawGround() {
        ctx.clearRect(0, canH - imgH, canW, imgH);
        if (flag && status) {
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
    }());
}