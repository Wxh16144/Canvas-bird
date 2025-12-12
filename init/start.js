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
    let arrData = getGone(ctx, x + i * oneWidth, res.couduit, conduitDownImgW)
    arr.push(arrData)
  }
  return arr;
};

const getGone = (ctx, X, couduit, size) => {
  //获取画布大小
  let {
    height: H,
    width: W
  } = ctx.canvas;
  let {
    upDownSpace, //两个水管上下的间隙
    leftRightSpace //两个水管左右间距
  } = couduit;
  let baseLine = H / 2; //参照画布中心为基线
  let rand = random(0, upDownSpace);
  let {
    round
  } = Math;
  let conduitDownX = round(X); //下水管x
  let conduitDownY = round(baseLine + rand); //下水管相对画布中线的随机范围y
  let conduitUpX = conduitDownX; //上水管x
  let conduitUpY = round(baseLine + rand - upDownSpace); //上水管相对画布中线的随机范围和配置文件的间隙
  let arrData = {
    conduitDownX,
    conduitDownY,
    conduitUpX,
    conduitUpY,
    rightDis: W - conduitDownX,//水管距离最右边的距离
    counduit: couduit, //配置文件
    ciunduitSize: size, //水管大小
    passed: false //是否已经通过
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
  drawGround(ctx, data, status); //绘制地面


  arr.map((item, index, arr) => {
    if (status && !bird.gameOver) {
      item.conduitDownX -= 2; //控制水管向右移动
      
      // 检查小鸟是否通过了水管（水管右边缘移到小鸟左侧）
      if (!item.passed && item.conduitDownX + item.ciunduitSize < bird.x) {
        item.passed = true;
        bird.score++;
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
        // let baseLine = ctx.canvas.height / 2; //参照画布中心为基线
        let newItem = { ...arr[0] };
        let arrDate = getGone(ctx, ctx.canvas.width, newItem.counduit, newItem.ciunduitSize);
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
    const threshold = 3000; // PC和移动端统一3秒
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