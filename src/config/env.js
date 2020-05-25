const env = process.env
console.log(env)
if(env.NODE_ENV === 'development') { //开发环境
    console.log('=======开发环境');
} else if(env.NODE_ENV === 'testing') { //测试环境
    console.log('========测试环境');
} else if(env.NODE_ENV === 'prepub') { //预发布环境
    console.log('========预发布环境');
} else if(env.NODE_ENV === 'production') { //生产环境
    console.log('========生产环境');
}
export {
    env
}
