const path = require('path');
const program = require('commander');
const { name, version } = require('./utils/constants.js');
const { mapActions } = require('./utils/common.js');

// 初始化各个命令
Reflect.ownKeys(mapActions).forEach((action) => {
    program
        .command(action) // 配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(() => {  // 动作
            if(action === '*'){  // 访问不到对应的命令 就打印找不到命令
                console.log(mapActions[action].description); 
            }else{
                // 分解命令，输入几个命令process.argv都会保存下来
                // apc create project-name ->[(node), (apc), create, project-name]
                // 数组第一个指启动Node.js进程的可执行文件所在的绝对路径，第二个指当前执行的JavaScript文件路径，剩余的元素为其他命令行参数
                // console.log(process.argv);
                // 引入对应命令的文件函数并执行，把对应参数传进去
                require(path.join(__dirname, action))(...process.argv.slice(3));
            }
        })
})
program.version(name + ' ' + version).parse(process.argv); // process.argv就是用户在命令行中传入的参数