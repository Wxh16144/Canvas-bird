import obj from './init/res.js'; //初始化加载资源
import loading from './init/loading.js'; //画加载动画
import drawGround from './init/drawGround.js'; //画地面

import drawDay from './init/drawDay.js'; //绘画白天资源
import drawNight from './init/drawNight.js'; //绘画白天资源

import drawConduit from './init/drawConduit.js'; //绘制一组上下水管

import drawBird from './init/drawBird.js'; //绘制会会的鸟

import startModule from './init/start.js'; //开始游戏
//资源库
const res = {
    //本地资源地址
    local: [
        'bird-1.png',
        'bird-2.png',
        'bird-3.png',
        'bird-up-1.png',
        'bird-up-2.png',
        'bird-up-3.png',
        'bird-down-1.png',
        'bird-down-2.png',
        'bird-down-3.png',
        'conduit.png',
        'conduit-down.png',
        'conduit-up.png',
        'day-cloud.png',
        'day-house.png',
        'day-prairie.png',
        'night-cloud.png',
        'night-house.png',
        'night-prairie.png',
        'ground.png'
    ],
    //网络资源地址
    long: [
        'http://www.wxhboy.com/img/b.jpg',
        // 'http://www.wxhboy.com/pic/flower1.jpg',
        // 'http://www.wxhboy.com/pic/flower2.jpg',
        // 'http://www.wxhboy.com/pic/flower3.jpg',
        // 'http://www.wxhboy.com/pic/flower5.jpg',
        // 'http://www.wxhboy.com/img/n.jpg',
    ],
    //进度条颜色
    color: {
        init: 'rgba(0,255,0,.1)',
        ok: 'rgba(0,255,0,.6)',
    },
    couduit: {
        upDownSpace: 250, //两个水管上下的间隙
        leftRightSpace: 350 //水管左右的间隙
    }
}

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');



let index = 0;
const init = (data) => {
    let throttle = 0;
    (function start() {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        window.requestAnimationFrame(start);
        // index-=10;
        index--

        ctx.fillStyle = 'rgb(78,192,203)' //白天背景
        // ctx.fillStyle = 'rgb(0,146,159)' // 晚上背景
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        drawDay(ctx, data); //绘画白天静态资源
        // drawNight(ctx, data); // 绘画晚上的静态资源

        for (let i = 1; i <= 60; i++) {
            drawConduit(ctx, data, res.couduit, index + 250 * i, 500); //绘画一组上下水管
            //drawConduit(ctx工具箱,图片,水管配置,水管距离左边的距离)
        }

        // if (Date.now() > throttle) {
        let { x, y } = startModule(ctx);
        drawBird(ctx, data, x, y, 'down'); //绘制小鸟
        drawGround(ctx, data, true); //绘制地面
        throttle = Date.now() + 170;


    }());

}




obj(res, (index) => {
    //console.log(`资源加载完成:${index}%`)
    loading(ctx, index, res.color);
}).then(data => {
    for (let item in data) {
        data[item + '-size'] = 0.125;
    }
    setTimeout(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        init(data);
    }, 500)

    window.addEventListener('resize', () => {
        setTimeout(() => {
            window.location.reload(true);
        }, 500); //用了延迟 为了防止出现自适应发生留白
    }, true)

})