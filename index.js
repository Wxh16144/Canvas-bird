import obj from './init/res.js'; //初始化加载资源
import loading from './init/loading.js'; //画加载动画
import {
    startModule,
    setGonduitArr
} from './init/start.js'; //开始游戏
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
        upDownSpace: 280, //两个水管上下的间隙
        leftRightSpace: 200 //水管左右的间隙
    }
}

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');



let status = false,
    day = true;
const init = (data) => {
    let throttle = 0;
    let arr = setGonduitArr(ctx, data, res);
    (function start() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        window.requestAnimationFrame(start);
        startModule(ctx, data, res, arr, status, day);
        //切换白天和黑夜;
        (throttle++) % 330 == 0 ? day = !day : null;
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
    //单击开始
    canvas.addEventListener('click', () => {
        status = true;
    }, false);
    //键盘空格开始
    window.addEventListener('keyup', (e) => {
        e.keyCode == 32 ? status = true : null;
    }, false)
})