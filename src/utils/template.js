const fs = require('fs');
const fse = require('fs-extra');
const got = require('got');

let projectName, templateName;

async function createTemplate(project, template) {

    projectName = project;
    templateName = template;

    fs.mkdirSync(projectName); // 创建项目文件夹

    handleDir().then((res) => {
        /**
         * //TODO: 收集所有目录，然后在用all一次全部请求？捕获全部下载完的状态？
         */
    }).catch((err) => {
        console.log('拉取文件失败了！');
        console.log(err.message);
        // 删除文件目录
        fse.remove(projectName, err => {
            if(err) console.log(err);
        })
    });
}

function getFetchURL(){
    const baseUrl = 'https://api.github.com';
    const user = 'lvdongy';
    const repositry = 'activity-project-template'; // 仓库的名称
    return `${baseUrl}/repos/${user}/${repositry}/contents/template/${templateName}` // 获取文件列表链接
}

async function handleDir(path = ''){

    const fetchURL = getFetchURL() + '/' + path;
    const { body: list } = await got(fetchURL);

    // 判断是否存在当前目录，不存在就新建
    if (path && !fs.existsSync(path)) {
        fs.mkdirSync(projectName + '/' + path);
    }

    // 深递归读取文件
    JSON.parse(list).forEach(item => {
        if(item.type === 'file'){
            createFile(item.path.replace(`template/${templateName}/`, ''), item.download_url);
        }
        if(item.type === 'dir'){
            handleDir(item.path.replace(`template/${templateName}/`, ''));
        }
    });
}

async function createFile(path, url){
    console.log(projectName + '/' + path + ' ✔️');
    try {
        const { body } = await got(url);
        fs.writeFileSync(projectName + '/' + path, body);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTemplate
}