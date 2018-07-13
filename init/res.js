const loadImg=(path)=>{
    return new Promise((resolve , reject)=>{
        const img = new Image();
        img.src = path;
        img.onload=function(){
           resolve(this)
        }
        img.onerror=function(err){
            reject(err)
        }
    })
}

const resArr=[
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
    'night-prairie.png'
]




const fn=function(){
    for (let item of resArr){
        console.log(item)
    }
}

export default {
    fn
}
