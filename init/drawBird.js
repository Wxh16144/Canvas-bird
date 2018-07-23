let index = 5, speed = 1, count = 1, he = 1;
export default (ctx, data, X = 0, Y = 0, ) => {
    const num = 0.65; //鸟的缩放大小
    let {
        'bird-1': b1,
        'bird-2': b2,
        'bird-3': b3,
        'bird-up-1': bUp1,
        'bird-up-2': bUp2,
        'bird-up-3': bUp3,
        'bird-down-1': bDown1,
        'bird-down-2': bDown2,
        'bird-down-3': bDown3,
    } = data;
    //获取鸟资源的大小
    let {
        height: H,
        width: W
    } = b1

    H *= num; //缩放尺寸
    W *= num; //缩放尺寸
    //ctx.drawImage(b1, X, Y, W, H);

    (function fly() {
        //ctx.rotate(-Math.PI / 4);
        switch (count) {
            case 1:
                ctx.drawImage(b1, X, Y, W, H);
                break;
            case 2:
                ctx.drawImage(b2, X, Y, W, H);
                break;
            case 3:
                ctx.drawImage(b3, X, Y, W, H);
                break;
        };

        if (he > 2.5) {
            index--
            speed = -speed;
        } else if (he <= .5) {
            index++
            speed = -speed;
        }
        he = (index += speed) / 10;
        count = Math.ceil(he);


        
    }());
}