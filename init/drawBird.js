let index = 5,
    speed = 1,
    count = 1,
    he = 1;
export default (ctx, data, X = 0, Y = 0, direction, time = 0.8) => {
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

    X -= W / 2; //鸟的中心位置
    Y -= H / 2; //鸟的中心位置
    //ctx.drawImage(b1, X, Y, W, H);
    // Y = (9.8 + time * time) / 2;
    console.log(time);
    (function fly() {
        //ctx.rotate(-Math.PI / 4);
        let img1 = b1,
            img2 = b2,
            img3 = b3;
        if (direction == 'up') {
            img1 = bUp1;
            img2 = bUp2;
            img3 = bUp3;
        } else if (direction == 'down') {
            img1 = bDown1;
            img2 = bDown2;
            img3 = bDown3;
        }
        switch (count) {
            case 1:
                ctx.drawImage(img1, X, Y, W, H);
                break;
            case 2:
                ctx.drawImage(img2, X, Y, W, H);
                break;
            case 3:
                ctx.drawImage(img3, X, Y, W, H);
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