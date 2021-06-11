const fs = require('fs');
const inquirer = require('inquirer');
const clearConsole = require('./utils/clear');
const prompts = require('./prompt/createPrompt');
const { createTemplate } = require('./utils/template');

module.exports = (...arg) => {

    let projectName;

    if(!(projectName = arg[0])){
        console.log('项目名称不能为空');
        return
    }

    // 判断是否存在当前目录
    if (fs.existsSync(projectName)) {
        console.log('该目录下已经存在名为：' + projectName + ' 的目录！')
        return
    }

    // 清空控制台
    clearConsole();

    /** 
     * 执行询问
     * inquirer的API：prompt(questions: Array) => promise 
     * 运行prompt方法即告诉终端启动 交互式命令界面，返回一个promise，拿到用户的答案
     */
    inquirer.prompt(prompts).then((answers) => {
        // console.log('ok',answers);
        // 拉取并创建模版文件
        createTemplate(projectName, answers.template);

    }).catch((error) => {
        console.log(error);
    })

}