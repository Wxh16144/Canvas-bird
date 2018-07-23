export default (ctx, data, couduit, X = 0, Y = 500) => {
    //获取需要的资源
    let {
        'conduit-down': conduitDownImg,
        'conduit-down-size': conduitDownImgSize,
        'conduit-up': conduitUpImg,
        'conduit-up-size': conduitUpImgSize,
        'conduit': conduitImg,
        'conduit-size': conduitImgSize,
        'ground': groundImg,
        'ground-size': groundNum
    } = data
    //获取画布大小
    let {
        height: canH,
        width: canW
    } = ctx.canvas;
    //获取地面图片资源大小
    let {
        height: groundImgH,
        width: groundImgW
    } = groundImg;
    //下水管
    let {
        height: conduitDownImgH,
        width: conduitDownImgW
    } = conduitDownImg
    //上水管
    let {
        height: conduitUpImgH,
        width: conduitUpImgW
    } = conduitUpImg
    //水管
    let {
        height: conduitImgH,
        width: conduitImgW
    } = conduitImg

    conduitDownImgH *= conduitDownImgSize;  //下半截水管的缩放
    conduitDownImgW *= conduitDownImgSize;  //下半截水管的缩放

    conduitUpImgH *= conduitUpImgSize; //上半截水管的缩放
    conduitUpImgW *= conduitUpImgSize;  //上半截水管的缩放

    conduitImgH *= conduitImgSize;  //水管的缩放
    conduitImgW *= conduitImgSize;  //水管的缩放

    groundImgH *= groundNum;    //地面的缩放
    groundImgW *= groundNum;    //地面截水管的缩放


    //绘制下半截水管
    (function () {
        ctx.drawImage(conduitUpImg, X, Y, conduitUpImgW, conduitUpImgH);
        let surplusH = canH - (Y + conduitUpImgH) - groundImgH;
        ctx.drawImage(conduitImg, X + 3, Y + conduitUpImgH-2, conduitImgW, surplusH+2)

    }());
    // 绘制上半截水管
    (function () {
        ctx.drawImage(conduitDownImg, X, Y - couduit.upDownSpace, conduitDownImgW, conduitDownImgH);
        let surplusH = Y - couduit.upDownSpace+1;
        ctx.drawImage(conduitImg, X + 3, -1, conduitImgW, surplusH+2)
    }());
}