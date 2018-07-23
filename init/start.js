const getGoldPoint = (ctx, direction) => {
  //获取画布大小
  let {
    height: H,
    width: W
  } = ctx.canvas;
  const max = (Math.sqrt(5) - 1) / 2; //黄金分割比例
  const min = 1 - max; //黄金分割比例
  switch (direction) {
    case 'lb':  //左下角
      return { x: W * min, y: H * max };
    case 'lt': //左上角
      return { x: W * min, y: H * min };
    case 'rb': //右下角
      return { x: W * max, y: H * max };
    case 'rt': //右上角
      return { x: W * max, y: H * min };

  }
}

export default (ctx) => {
  return getGoldPoint(ctx, 'lt');
}