import obj from './init/res.js'; //初始化加载资源
import loading from './init/loading.js'; //画加载动画
import drawGround from './init/drawGround.js'; //画地面

import drawCloud from './init/drawCloud.js'; //绘画云朵
//资源库
const res = {
    //本地资源地址
    local: [
        'bird-1.png',
        'bird-2.png',
        'bird-3.png',
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
    }
}

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');




const init = (data) => {
    drawGround(ctx, data); //绘制地面
    drawCloud(ctx, data) //绘画云朵
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
        ctx.fillStyle = 'rgb(78,192,203)'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        init(data);
    }, 500)

    // window.addEventListener('resize', () => {
    //     canvas.height = window.innerHeight;
    //     canvas.width = window.innerWidth;
    //     init(data)
    // }, true)
})