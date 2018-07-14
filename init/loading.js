class loading {
    constructor(ctx, initColor = 'rgba(0,0,0,.1)', okColor = 'rgba(0,0,0.7)') {
        this.ctx = ctx;
        this.centerX = ctx.canvas.width / 2; //Canvas中心点x轴坐标
        this.centerY = ctx.canvas.height / 2; //Canvas中心点y轴坐标
        this.initColor = initColor;
        this.okColor = okColor;
    }

    blueCircle(index) {
        let ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = this.okColor; //设置描边样式
        ctx.lineWidth = 5; //设置线宽
        ctx.beginPath(); //路径开始
        ctx.arc(this.centerX,
            this.centerY,
            100, -Math.PI / 2, -Math.PI / 2 + index * Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
            false);
        //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        ctx.stroke(); //绘制
        ctx.closePath(); //路径结束
        ctx.restore();
    }
    whiteCircle() {
        let ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2; //设置线宽
        ctx.strokeStyle = this.initColor;
        ctx.arc(this.centerX, this.centerY, 100, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    text(index) {
        let ctx = this.ctx;
        ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        ctx.fillStyle = this.okColor; //设置描边样式
        ctx.font = "32px Arial"; //设置字体大小和字体
        //绘制字体，并且指定位置
        ctx.fillText(index.toFixed(0) + "%", this.centerX - 35, this.centerY + 10);
    }
}

export default (ctx, index, color) => {
    const load = new loading(ctx, color.init, color.ok);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    load.whiteCircle();
    load.text(index);
    load.blueCircle(index);

}