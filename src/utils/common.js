// 命令的名称以及功能，映射表

const mapActions = {
    create: {
        alias: 'c', // 别名
        description: '创建一个项目', // 描述
        //用法
        examples: [ 
            'apc create <project-name>'
        ]
    },
    //配置文件
    config: { 
        alias: 'conf',
        description: 'config project variable',
        examples: [
            'apc config set <k> <v>',
            'apc config get <k>'
        ] 
    },
    '*': {
        alias: '',
        description: 'command not found',
        examples: []
    }
}

module.exports = {
    mapActions
}