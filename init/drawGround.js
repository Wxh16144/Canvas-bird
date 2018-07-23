import drawImg from './drawImg.js';
let flag = false, index = 0;
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


        //如果地图是静置的
        if (!status) {
            drawImg(ctx, img, {
                imgW,
                imgH,
                Y: canH - imgH,
            })
        } else {
            //地图不是静置的
            ctx.clearRect(0, canH - imgH, canW, imgH);
            let a = index++ % 9;
            if (a == 0) {
                flag = !flag
            }
            if (flag) {
                drawImg(ctx, img, {
                    imgW,
                    imgH,
                    Y: canH - imgH,
                })
            } else {
                drawImg(ctx, img, {
                    imgW,
                    imgH,
                    Y: canH - imgH,
                    X: -imgW / 2
                })
            }
        }
    }());
}