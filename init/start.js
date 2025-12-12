import drawGround from './drawGround.js'; //画地面
import drawDay from './drawDay.js'; //绘画白天资源
import drawNight from './drawNight.js'; //绘画白天资源
import drawConduit from './drawConduit.js'; //绘制一组上下水管
import drawBird from './drawBird.js'; //绘制会飞的鸟

//生成随机数
const random = (min, max) => {
  return Math.random() * (max - min) + min;
}

//绘制分数
const drawScore = (ctx, score) => {
  ctx.save();
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeText(score, 30, 50);
  ctx.fillText(score, 30, 50);
  ctx.restore();
}




//获取黄金点的四个坐标
export const getGoldPoint = (ctx, direction) => {
  //获取画布大小
  let {
    height: H,
    width: W
  } = ctx.canvas;
  const max = (Math.sqrt(5) - 1) / 2; //黄金分割比例
  const min = 1 - max; //黄金分割比例
  switch (direction) {
    case 'lb': //左下角
      return {
        x: W * min,
        y: H * max
      };
    case 'lt': //左上角
      return {
        x: W * min,
        y: H * min
      };
    case 'rb': //右下角
      return {
        x: W * max,
        y: H * max
      };
    case 'rt': //右上角
      return {
        x: W * max,
        y: H * min
      };

  }
}
//根据可视窗体大小生成水管
export const setGonduitArr = (ctx, data, res) => {
  //获取画布大小
  let {
    height: H,
    width: W
  } = ctx.canvas;

  let {
    x,
    y
  } = getGoldPoint(ctx, 'rt'); //获取右边的黄金点
  let {
    upDownSpace, //两个水管上下的间隙
    leftRightSpace //两个水管左右间距
  } = res.couduit;
  let {
    'conduit-down': conduitDownImg,
    'conduit-down-size': conduitDownImgSize
  } = data
  //下水管
  let {
    height: conduitDownImgH,
    width: conduitDownImgW
  } = conduitDownImg;
  conduitDownImgH *= conduitDownImgSize; //下半截水管的缩放
  conduitDownImgW *= conduitDownImgSize; //下半截水管的缩放
  //根据配置文件计算出需要绘制水管组数
  let oneWidth = leftRightSpace + conduitDownImgW;
  let count = Math.ceil((W - x) / oneWidth);
  let arr = []; //保存水管数组
  for (let i = 0; i < count; i++) {
    let arrData = getGone(ctx, x + i * oneWidth, res.couduit, conduitDownImgW, 0)
    arr.push(arrData)
  }
  return arr;
};

const getGone = (ctx, X, couduit, size, score = 0) => {
  //获取画布大小
  let {
    height: H,
    width: W
  } = ctx.canvas;
  
  // 检测是否为移动设备和屏幕方向
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLandscape = W > H;
  
  let upDownSpaceMin, upDownSpaceMax, leftRightSpace;
  
  // 根据设备和屏幕方向选择配置
  if (isMobile) {
    if (isLandscape && couduit.mobile && couduit.mobile.landscape) {
      // 移动端横屏
      upDownSpaceMin = couduit.mobile.landscape.upDownSpaceMin;
      upDownSpaceMax = couduit.mobile.landscape.upDownSpaceMax;
    } else if (couduit.mobile) {
      // 移动端竖屏
      upDownSpaceMin = couduit.mobile.upDownSpaceMin;
      upDownSpaceMax = couduit.mobile.upDownSpaceMax;
    } else {
      // 兜底配置
      upDownSpaceMin = couduit.upDownSpaceMin;
      upDownSpaceMax = couduit.upDownSpaceMax;
    }
  } else {
    // PC端
    upDownSpaceMin = couduit.upDownSpaceMin;
    upDownSpaceMax = couduit.upDownSpaceMax;
  }
  
  leftRightSpace = couduit.leftRightSpace;
  
  // 根据分数动态调整间隙范围：分数越高，间隙越小
  // 每3分减少25像素，但不低于最小值（加快难度提升）
  let currentMax = Math.max(upDownSpaceMax - Math.floor(score / 3) * 25, upDownSpaceMin);
  let currentMin = Math.max(upDownSpaceMin, currentMax - 20); // 保证有一定的随机范围
  
  // 记录间隙变化
  if (score > 0 && score % 3 === 0) {
    console.log(`👍 分数: ${score} | 水管间隙范围: ${Math.round(currentMin)}-${Math.round(currentMax)}像素`);
  }
  
  // 随机生成水管间隙
  let upDownSpace = random(currentMin, currentMax);
  
  // 获取地面高度（需要从data中获取）
  // 假设地面高度约为屏幕高度的10-15%，这里使用保守估计
  let groundHeight = H * 0.15; // 预留地面空间
  let availableHeight = H - groundHeight; // 可用高度
  
  let baseLine = availableHeight / 2; //参照可用空间中心为基线
  
  // 确保水管不会超出屏幕，特别是移动端横屏时
  // 计算上水管最低点和下水管最高点，确保有足够空间
  let maxOffset = (availableHeight - upDownSpace) / 2 - 50; // 留50像素边距
  maxOffset = Math.max(maxOffset, 0); // 确保不为负
  
  let rand = random(-maxOffset, maxOffset); // 中心点偏移范围
  
  let {
    round
  } = Math;
  let conduitDownX = round(X); //下水管x
  let conduitDownY = round(baseLine + rand + upDownSpace / 2); //下水管的顶部位置
  let conduitUpX = conduitDownX; //上水管x
  let conduitUpY = round(baseLine + rand - upDownSpace / 2); //上水管的底部位置
  let arrData = {
    conduitDownX,
    conduitDownY,
    conduitUpX,
    conduitUpY,
    rightDis: W - conduitDownX,//水管距离最右边的距离
    counduit: couduit, //配置文件
    ciunduitSize: size, //水管大小
    passed: false, //是否已经通过
    upDownSpace: upDownSpace //保存该水管的实际间隙
  }
  return arrData;
}


export const startModule = (ctx, data, res, arr, status, day, time, birdStatus, bird) => {
  if (day) {
    ctx.fillStyle = 'rgb(78,192,203)' //白天背景
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawDay(ctx, data); //绘画白天静态资源
  } else {
    ctx.fillStyle = 'rgb(0,146,159)' // 晚上背景
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawNight(ctx, data); // 绘画晚上的静态资源
  }
  
  // 获取地面高度
  let groundHeight = data['ground'].height * data['ground-size'];
  let canvasHeight = ctx.canvas.height;
  
  // 应用重力和速度
  if (status) {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // 检查是否撞到地面
    if (bird.y >= canvasHeight - groundHeight - 30) {
      bird.y = canvasHeight - groundHeight - 30;
      bird.velocity = 0;
      if (!bird.gameOver) {
        bird.gameOver = true;
        bird.gameOverTime = Date.now(); // 记录游戏结束时间
        console.log('='.repeat(50));
        console.log('💥 游戏结束! 撞到地面');
        console.log(`🏆 最终得分: ${bird.score}`);
        console.log('='.repeat(50));
      }
    }
    
    // 检查是否飞出上边界
    if (bird.y <= 30) {
      bird.y = 30;
      bird.velocity = 0;
    }
  }
  
  let {
    x,
    y
  } = bird;
  drawBird(ctx, data, x, y, birdStatus, time); //绘制小鸟
  drawGround(ctx, data, status && !bird.gameOver); //绘制地面，游戏结束时停止移动


  arr.map((item, index, arr) => {
    if (status && !bird.gameOver) {
      // 根据分数缓慢加速：基础速度2 + 每5分增加0.2速度，最大4.5
      let baseSpeed = 2;
      let speedIncrease = Math.floor(bird.score / 5) * 0.2;
      let maxSpeed = 4.5;
      let currentSpeed = Math.min(baseSpeed + speedIncrease, maxSpeed);
      
      // 记录速度变化（仅在速度变化时记录一次）
      if (!bird.lastLoggedSpeed || bird.lastLoggedSpeed !== currentSpeed) {
        console.log(`🚀 速度提升! 当前速度: ${currentSpeed.toFixed(1)} px/帧 (分数: ${bird.score})`);
        bird.lastLoggedSpeed = currentSpeed;
      }
      
      item.conduitDownX -= currentSpeed; //控制水管向左移动
      
      // 检查小鸟是否通过了水管（水管右边缘移到小鸟左侧）
      if (!item.passed && item.conduitDownX + item.ciunduitSize < bird.x) {
        item.passed = true;
        bird.score++;
        console.log(`✅ 得分! 当前分数: ${bird.score}`);
      }
    }

    //判断第一个水管是否左边出去了
    if (index === 0) {
      if (item.conduitDownX < -(item.ciunduitSize * 2 + item.counduit.leftRightSpace)) {
        arr.shift(); //删除第一根水管
      }
    }

    //判断最后一根水管是否出现完成并且应该出现后一个了
    if (index === arr.length - 1) {
      let endItem = arr[arr.length - 1]; //获取到最后一组水管
      //计算最后一组水管的x加上自己组件的宽度加上配置文件的右边距离
      let distance = endItem.conduitDownX + endItem.counduit.leftRightSpace + endItem.ciunduitSize;
      // 如果大于画布 需要配置新的数组
      if (distance < ctx.canvas.width) {
        let newItem = { ...arr[0] };
        let arrDate = getGone(ctx, ctx.canvas.width, newItem.counduit, newItem.ciunduitSize, bird.score);
        arr.push(arrDate);
      }
    }

    return item
  }).forEach((item, index, arr) => {
    let {
      conduitDownX,
      conduitDownY,
      conduitUpX,
      conduitUpY,
      ciunduitSize,
      counduit
    } = item
    
    // 碰撞检测
    if (status && !bird.gameOver) {
      let birdLeft = bird.x - 20;
      let birdRight = bird.x + 20;
      let birdTop = bird.y - 20;
      let birdBottom = bird.y + 20;
      
      let pipeLeft = conduitDownX;
      let pipeRight = conduitDownX + ciunduitSize;
      let pipeTopBottom = conduitUpY; // 上水管的底部
      let pipeBottomTop = conduitDownY; // 下水管的顶部
      
      // 检查是否在水管的x范围内
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // 检查是否撞到上水管或下水管
        if (birdTop < pipeTopBottom || birdBottom > pipeBottomTop) {
          if (!bird.gameOver) {
            bird.gameOver = true;
            bird.gameOverTime = Date.now(); // 记录游戏结束时间
            console.log('='.repeat(50));
            console.log('💥 游戏结束! 撞到水管');
            console.log(`🏆 最终得分: ${bird.score}`);
            console.log('='.repeat(50));
          }
        }
      }
    }
    
    drawConduit(ctx, data, res.couduit, conduitDownX, conduitDownY); //绘画一组上下水管
    //drawConduit(ctx工具箱,图片,水管配置,水管距离左边的距离)
  })
  
  // 绘制分数
  drawScore(ctx, bird.score);
  
  // 如果游戏结束，显示提示
  if (bird.gameOver) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const now = Date.now();
    const timeSinceDeath = now - (bird.gameOverTime || now);
    const threshold = 1500;
    const canRestart = timeSinceDeath >= threshold;
    
    ctx.save();
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';
    let gameOverText = 'Game Over';
    let scoreText = `Score: ${bird.score}`;
    let restartText;
    
    // 根据设备类型和时间显示不同提示
    if (isMobile) {
      restartText = canRestart ? 'Tap to Restart' : `Wait ${Math.ceil((threshold - timeSinceDeath) / 1000)}s...`;
    } else {
      if (canRestart) {
        restartText = 'Press Any Key to Restart';
      } else {
        restartText = `Wait ${Math.ceil((threshold - timeSinceDeath) / 1000)}s...`;
      }
    }
    
    ctx.strokeText(gameOverText, ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);
    ctx.fillText(gameOverText, ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);
    
    ctx.font = 'bold 35px Arial';
    ctx.strokeText(scoreText, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.fillText(scoreText, ctx.canvas.width / 2, ctx.canvas.height / 2);
    
    ctx.font = 'bold 25px Arial';
    ctx.strokeText(restartText, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    ctx.fillText(restartText, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    ctx.restore();
  }
}