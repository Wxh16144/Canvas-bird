import obj from './init/res.js'; //初始化加载资源
import loading from './init/loading.js'; //画加载动画
import {
    getGoldPoint,
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

    ],
    //进度条颜色
    color: {
        init: 'rgba(0,255,0,.1)',
        ok: 'rgba(0,255,0,.6)',
    },
    couduit: {
        upDownSpace: 260, //两个水管上下的间隙（基础值）
        upDownSpaceMin: 160, //最小间隙（高分时的最小值）
        upDownSpaceMax: 260, //最大间隙（初始时的最大值）
        leftRightSpace: 200, //水管左右的间隙
        // 移动端配置
        mobile: {
            upDownSpaceMin: 200, // 移动端最小间隙更大
            upDownSpaceMax: 320, // 移动端最大间隙更大
            // 横屏配置
            landscape: {
                upDownSpaceMin: 150, // 横屏时间隙较小（因为屏幕高度小）
                upDownSpaceMax: 200
            }
        }
    }
}

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');



let status = false,
    day = true,
    time,
    birdStatus,
    bird = getGoldPoint(ctx, 'lt'),
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // 检测是否为移动设备

// 检测屏幕方向
const isLandscape = window.innerWidth > window.innerHeight;

// 根据设备类型和屏幕方向调整物理参数
const getPhysicsParams = () => {
    const isCurrentLandscape = window.innerWidth > window.innerHeight;
    
    if (isMobile) {
        if (isCurrentLandscape) {
            // 移动端横屏：跳跃力度更小，避免撞到顶部
            return {
                gravity: 0.35,  // 移动端重力更小，下落更慢
                jumpForce: -5.5 // 横屏跳跃力度更小
            };
        } else {
            // 移动端竖屏
            return {
                gravity: 0.35,  // 移动端重力更小，下落更慢
                jumpForce: -7   // 竖屏跳跃力度正常
            };
        }
    }
    return {
        gravity: 0.5,   // PC端重力
        jumpForce: -8   // PC端跳跃力度
    };
};

const physics = getPhysicsParams();

// 初始化小鸟属性
bird.velocity = 0; // 垂直速度
bird.gravity = physics.gravity; // 重力加速度
bird.jumpForce = physics.jumpForce; // 跳跃力度
bird.score = 0; // 分数
bird.gameOver = false; // 游戏是否结束

let arr; // 水管数组

const init = (data) => {
    let throttle = 0;
    arr = setGonduitArr(ctx, data, res);

    (function start() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        window.requestAnimationFrame(start);
        time ? time++ : null;
        startModule(ctx, data, res, arr, status, day, time, birdStatus, bird);
        //切换白天和黑夜;
        (throttle++) % 330 == 0 ? day = !day : null;
    }());

}

// 重置游戏
const resetGame = (data) => {
    console.log('='.repeat(50));
    console.log('🔄 游戏重新开始!');
    console.log('='.repeat(50));
    status = false;
    bird = getGoldPoint(ctx, 'lt');
    const physics = getPhysicsParams();
    bird.velocity = 0;
    bird.gravity = physics.gravity;
    bird.jumpForce = physics.jumpForce;
    bird.score = 0;
    bird.gameOver = false;
    bird.gameOverTime = null;
    bird.lastLoggedSpeed = null; // 重置速度记录
    birdStatus = null;
    time = null;
    // 重新生成水管，从头开始
    arr = setGonduitArr(ctx, data, res);
    console.log(`👍 初始状态: 速度 2.0 px/帧 | 重力 ${physics.gravity} | ${isMobile ? '📱移动端' : '💻PC端'}`);
}



const up = (isEnter = false) => {
    if (bird.gameOver) {
        // 如果游戏结束，检查冷却时间
        const now = Date.now();
        const timeSinceDeath = now - (bird.gameOverTime || now);
        const threshold = 3000; // PC和移动端统一3秒冷却
        
        // 检查是否在冷却时间内
        if (timeSinceDeath < threshold) {
            return; // 在冷却时间内不允许重启
        }
        
        // 重新开始
        resetGame(window.gameData);
        return;
    }
    if (!status) {
        status = true; // 开始游戏
        console.log('🎮 游戏开始!');
    }
    bird.velocity = bird.jumpForce; // 向上飞
    time = 0.25;
    birdStatus = 'up';
}
const down = () => {
    birdStatus = 'down'
}


obj(res, (index) => {
    loading(ctx, index, res.color);
}).then(data => {
    for (let item in data) {
        data[item + '-size'] = 0.125;
    }
    
    // 保存data到全局，供重置游戏使用
    window.gameData = data;
    
    setTimeout(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        init(data);
    }, 500)

    window.addEventListener('resize', () => {
        setTimeout(() => {
            window.location.reload(true);
        }, 500); //用了延迟 为了防止出现自适应发生留白
    }, true)
    //触摸开始
    canvas.addEventListener('touchstart', () => {
        up(false); // 触摸不是空格
    }, false);
    //触摸抬起
    canvas.addEventListener('touchend', () => {
        down()
    }, false);
    //鼠标单击开始
    canvas.addEventListener('mousedown', () => {
        up(false); // 鼠标不是空格
    }, false);
    //鼠标单击抬起
    canvas.addEventListener('mouseup', () => {
        // 延迟调用down，让抬头动作可见
        setTimeout(() => {
            down()
        }, 100);
    }, false);
    //键盘控制
    window.addEventListener('keydown', (e) => {
        const key = e.key;
        const keyCode = e.keyCode;
        
        // 回车键只用于游戏结束后重新开始
        if (keyCode == 13 || key === 'Enter') {
            e.preventDefault();
            up(true); // 标记为回车键
            return;
        }
        
        // 空格键、a-z、0-9 都可以跳跃
        const isSpace = keyCode === 32 || key === ' ';
        const isLetter = (keyCode >= 65 && keyCode <= 90) || /^[a-zA-Z]$/.test(key);
        const isNumber = (keyCode >= 48 && keyCode <= 57) || /^[0-9]$/.test(key);
        
        if (isSpace || isLetter || isNumber) {
            e.preventDefault();
            up(false); // 非回车键
        }
    }, false);
    
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        const keyCode = e.keyCode;
        
        // 释放空格、a-z、0-9时小鸟下落
        const isSpace = keyCode === 32 || key === ' ';
        const isLetter = (keyCode >= 65 && keyCode <= 90) || /^[a-zA-Z]$/.test(key);
        const isNumber = (keyCode >= 48 && keyCode <= 57) || /^[0-9]$/.test(key);
        
        if (isSpace || isLetter || isNumber) {
            down();
        }
    }, false);
})