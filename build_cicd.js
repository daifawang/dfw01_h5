const minimist = require('minimist')

//接受cicd传入数据
console.log("npm_lifecycle_event="+process.env.npm_lifecycle_event);
console.log(process.argv);
const local_env = minimist(process.argv).local_env
process.env.test_env =local_env
let command_exec = ''
if(local_env === 'FAT' || local_env === 'fat'){
  command_exec = 'npm run build'
  console.log("当前打包环境为测试环境："+local_env);
}else if(local_env === 'UAT' || local_env === 'uat'){
  command_exec = 'npm run prepub'
  console.log("当前打包环境为预发布环境："+local_env);
}else {
  command_exec = 'npm run publish'
  console.log("当前打包环境为生产环境："+local_env);
}
//执行构建命令
console.log("command_exec="+command_exec);
require('child_process').exec(command_exec,{ env:process.env },function(error, stdout, stderr) {
    try {
      console.log("====CI项目构建信息====");
      stdout.split("\n").forEach(str => {
        console.log(str);
      });
    } catch (exp) {
      console.log(JSON.stringify(exp));
    }
    try {
      console.log("====stderr====");
      stderr.split("\n").forEach(str => {
        console.log(str);
      });
    } catch (exp) {
      console.log(JSON.stringify(exp));
    }

    if(error){
       throw error
    }
    console.log("CI构建成功");
});