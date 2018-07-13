import obj from './init/res.js';
import drawGround from './init/drawGround.js';


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
    long1: [
        'http://www.wxhboy.com/img/a.jpg',
        'http://www.wxhboy.com/pic/flower1.jpg',
        'http://www.wxhboy.com/pic/flower2.jpg',
        'http://www.wxhboy.com/pic/flower3.jpg',
        'http://www.wxhboy.com/pic/flower5.jpg',
        'http://www.wxhboy.com/img/n.jpg',
    ]
}

const ctx =document.querySelector('canvas').getContext('2d');
// console.log(obj)


obj(res,(index)=>{
    console.log(`资源加载完成:${index}%`)
}).then(data => {
    //console.log(data)
    // console.log(data['bird-1']);
     drawGround(ctx,data['ground'])
})
