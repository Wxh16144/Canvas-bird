//兼容requestAnimationFrame
(function () {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                var self = this,
                    start, finish;
                return window.setTimeout(function () {
                    start = +new Date();
                    callback(start);
                    finish = +new Date();
                    self.timeout = 1000 / 60 - (finish - start);
                }, self.timeout);
            });
    }
    //随机数
    window.random = (min = 0, max = 0) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}());

const loadImg = (path) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = function () {
            resolve(this)
        }
        img.onerror = function (err) {
            reject(err)
        }
    })
}

const getRes = (res = []) => {
    let newResArr = []
    if (res.local) {
        newResArr = res.local.map((item) => {
            return `./pic/${item}`
        })
    }
    if (res.long) {
        for (let item of res.long) {
            newResArr.push(item)
        }
    }
    return newResArr
};

export default async function (res = [], call) {
    const obj = {};
    const arr = getRes(res);
    let index = 1;

    for (let item of arr) {
        const img = await loadImg(item).then(data => data);
        const str = item.lastIndexOf('/'); //计算出最后一个反斜杠位置
        const newItem = item.substring(str + 1);
        obj[newItem.replace(/\.(png|jpg)$/, '')] = img;
        //资源加载进度条
        call(Math.ceil(index++/ arr.length * 100));
            }
            return obj
        }