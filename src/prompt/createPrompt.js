module.exports = [
    {
        name: 'template', // 问题名称key
        message: '请选择模版类型：', // 问题标题
        type: 'list', // 选项类型
        // 具体的选项
        choices: [
            { name: 'Vue', value: 'vue' },
            { name: 'Pug', value: 'pug' },
        ]
    },
    // {
    //     name: 'hasVueRouter',
    //     message: '是否引入VueRouter？', 
    //     type: 'confirm', 
    //     when: (answers) => {
    //         // answers是上面已经回答过问题的答案对象
    //         // 当when return true时当前这个问题才会出现
    //         return answers.template === 'vue'
    //     },
    // },
]