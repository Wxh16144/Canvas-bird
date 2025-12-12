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
        // 计算下水管可以延伸的最大高度（到地面为止）
        let maxSurplusH = canH - (Y + conduitUpImgH) - groundImgH;
        // 确保不会绘制到地面以下
        let surplusH = Math.max(0, maxSurplusH);
        
        // 先绘制水管主体，从Y位置开始，确保完全覆盖到帽子下方
        if (surplusH > 0) {
            // 主体从Y开始绘制，高度包含帽子高度加剩余高度
            ctx.drawImage(conduitImg, X + 3, Y, conduitImgW, conduitUpImgH + surplusH);
        }
        
        // 后绘制水管帽子，完全覆盖主体顶部
        ctx.drawImage(conduitUpImg, X, Y, conduitUpImgW, conduitUpImgH);

    }());
    // 绘制上半截水管
    (function () {
        let pipeTopY = Y - couduit.upDownSpace;
        let surplusH = pipeTopY;
        
        // 先绘制水管主体，从顶部到帽子底部
        if (surplusH > 0) {
            // 主体高度包含到帽子底部再多一点
            ctx.drawImage(conduitImg, X + 3, 0, conduitImgW, pipeTopY + conduitDownImgH);
        }
        
        // 后绘制水管帽子，覆盖主体底部
        ctx.drawImage(conduitDownImg, X, pipeTopY, conduitDownImgW, conduitDownImgH);
    }());
}