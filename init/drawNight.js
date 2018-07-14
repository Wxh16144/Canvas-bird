import drawImg from './drawImg.js';
export default (ctx, data) => {
    //获取需要的资源
    let {
        'night-cloud': nightCloudImg,
        'night-cloud-size': nightCloudImgSize,
        'night-house': nightHouseImg,
        'night-house-size': nightHouseImgSize,
        'night-prairie': nightPrairieImg,
        'night-prairie-size': nightPrairieImgSize,
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
        height: nightCloudImgH,
        width: nightCloudImgW
    } = nightCloudImg;
    //获取白天房屋图片资源大小
    let {
        height: nightHouseImgH,
        width: nightHouseImgW
    } = nightHouseImg;
    //获取白天草原图片资源大小
    let {
        height: nightPrairieImgH,
        width: nightPrairieImgW
    } = nightPrairieImg;

    nightCloudImgW *= nightCloudImgSize;
    nightCloudImgH *= nightCloudImgSize;
    nightHouseImgW *= nightHouseImgSize;
    nightHouseImgH *= nightHouseImgSize;
    nightPrairieImgW *= nightPrairieImgSize;
    nightPrairieImgH *= nightPrairieImgSize;

    const groundH = groundImg.height * groundNum;
    (function drawCloud() {
        //绘画白天的云朵
        drawImg(ctx, nightCloudImg, {
            imgW: nightCloudImgW,
            imgH: nightCloudImgH,
            Y: canH - groundH - nightCloudImgH,
            X: 0
        })
        //绘画白天的房子
        drawImg(ctx, nightHouseImg, {
            imgW: nightHouseImgW,
            imgH: nightHouseImgH,
            Y: canH - groundH - nightHouseImgH,
            X: 0
        })
        //绘制白天草原
        drawImg(ctx, nightPrairieImg, {
            imgW: nightPrairieImgW,
            imgH: nightPrairieImgH,
            Y: canH - groundH - nightPrairieImgH,
            X: 0
        })
    }());
}