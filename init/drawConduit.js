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

    conduitDownImgH *= conduitDownImgSize;
    conduitDownImgW *= conduitDownImgSize;

    conduitUpImgH *= conduitUpImgSize;
    conduitUpImgW *= conduitUpImgSize;

    conduitImgH *= conduitImgSize;
    conduitImgW *= conduitImgSize;

    groundImgH *= groundNum;
    groundImgW *= groundNum;


    //绘制下半截水管
    (function () {
        ctx.drawImage(conduitUpImg, X, Y, conduitUpImgW, conduitUpImgH);
        let surplusH = canH - (Y + conduitUpImgH) - groundImgH;
        ctx.drawImage(conduitImg, X + 3, Y + conduitUpImgH, conduitImgW, surplusH)

    }());
    // 绘制上半截水管
    (function () {
        ctx.drawImage(conduitDownImg, X, Y - couduit.upDownSpace, conduitDownImgW, conduitDownImgH);
        let surplusH = Y - couduit.upDownSpace;
        ctx.drawImage(conduitImg, X + 3, 0, conduitImgW, surplusH)
    }());
}