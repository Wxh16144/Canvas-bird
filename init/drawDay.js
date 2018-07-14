import drawImg from './drawImg.js';
export default function (ctx, data) {
    //获取需要的资源
    let {
        'day-cloud': dayCloudImg,
        'day-cloud-size': dayCloudImgSize,
        'day-house': dayHouseImg,
        'day-house-size': dayHouseImgSize,
        'day-prairie': dayPrairieImg,
        'day-prairie-size': dayPrairieImgSize,
        'ground': groundImg,
        'ground-size': groundNum
    } = data
    //获取画布大小
    let {
        height: canH,
        width: canW
    } = ctx.canvas;
    //获取白天云朵图片资源大小
    let {
        height: dayCloudImgH,
        width: dayCloudImgW
    } = dayCloudImg;
    //获取白天房屋图片资源大小
    let {
        height: dayHouseImgH,
        width: dayHouseImgW
    } = dayHouseImg;
    //获取白天草原图片资源大小
    let {
        height: dayPrairieImgH,
        width: dayPrairieImgW
    } = dayPrairieImg;

    dayCloudImgW *= dayCloudImgSize;
    dayCloudImgH *= dayCloudImgSize;
    dayHouseImgW *= dayHouseImgSize;
    dayHouseImgH *= dayHouseImgSize;
    dayPrairieImgW *= dayPrairieImgSize;
    dayPrairieImgH *= dayPrairieImgSize;

    const groundH = groundImg.height * groundNum;
    (function drawCloud() {
        //绘画白天的云朵
        drawImg(ctx, dayCloudImg, {
            imgW: dayCloudImgW,
            imgH: dayCloudImgH,
            Y: canH - groundH - dayCloudImgH,
            X: 0
        })
        //绘画白天的房子
        drawImg(ctx, dayHouseImg, {
            imgW: dayHouseImgW,
            imgH: dayHouseImgH,
            Y: canH - groundH - dayHouseImgH,
            X: 0
        })
        //绘制白天草原
        drawImg(ctx, dayPrairieImg, {
            imgW: dayPrairieImgW,
            imgH: dayPrairieImgH,
            Y: canH - groundH - dayPrairieImgH,
            X: 0
        })
    }());
}