import drawGround from './drawGround.js'; //画地面
import drawDay from './drawDay.js'; //绘画白天资源
import drawNight from './drawNight.js'; //绘画白天资源
import drawConduit from './drawConduit.js'; //绘制一组上下水管
import drawBird from './drawBird.js'; //绘制会飞的鸟




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
    ciunduitSize: size //水管大小
  }
  return arrData;
}


export const startModule = (ctx, data, res, arr, status, day, time, birdStatus,bird) => {
  if (day) {
    ctx.fillStyle = 'rgb(78,192,203)' //白天背景
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawDay(ctx, data); //绘画白天静态资源
  } else {
    ctx.fillStyle = 'rgb(0,146,159)' // 晚上背景
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawNight(ctx, data); // 绘画晚上的静态资源
  }
  let {
    x,
    y
  } = bird;
  drawBird(ctx, data, x, y, birdStatus, time); //绘制小鸟
  drawGround(ctx, data, status); //绘制地面


  arr.map((item, index, arr) => {
    item.conduitDownX--; //控制水管向右移动

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
      // console.log(distance,ctx.canvas.width)
      // 如果大于画布 需要配置新的数组
      if (distance < ctx.canvas.width) {
        // let baseLine = ctx.canvas.height / 2; //参照画布中心为基线
        let newItem = { ...arr[0] };
        let arrDate = getGone(ctx, ctx.canvas.width, newItem.counduit, newItem.ciunduitSize);
        arr.push(arrDate);
      }
    }
    //console.log(arr.length)

    return item
  }).forEach((item, index, arr) => {
    let {
      conduitDownX,
      conduitDownY,
      conduitUpX,
      conduitUpY
    } = item
    // console.log(item)
    drawConduit(ctx, data, res.couduit, conduitDownX, conduitDownY); //绘画一组上下水管
    //drawConduit(ctx工具箱,图片,水管配置,水管距离左边的距离)
  })

  // console.log(status)
}