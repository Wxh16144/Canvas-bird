let index = 1,
    speed = 1;
export default (ctx, data, X = 0, Y = 0, status = 0) => {
    const num = 0.65; //鸟的缩放大小
    let {
        'bird-1': b1,
        'bird-2': b2,
        'bird-3': b3,
    } = data;
    //获取鸟资源的大小
    let {
        height: H,
        width: W
    } = b1

    H *= num;
    W *= num;
    //ctx.drawImage(b1, X, Y, W, H);

    (function fly() {
        //ctx.rotate(-Math.PI / 4);
        if (status % 3 == 0) {
            // const img = 'b' + index++;
            switch (index += speed) {
                case 1:
                    ctx.drawImage(b1, X, Y, W, H);
                    break;
                case 2:
                    ctx.drawImage(b2, X, Y, W, H);
                    break;
                case 3:
                    ctx.drawImage(b3, X, Y, W, H);
                    break;
                default:
                    speed = -speed;
                    break;
            }
        };
    }());
}