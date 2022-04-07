let userSidebarDataSource = [
    {key: "inbox", text: "待办任务", type: "inbox", spriteCssClass: "", path: "/tasks?status=pending"},
    {key: "assign", text: "待签任务", type: "assign", spriteCssClass: "", path: "/tasks?status=candidate"},
    {key: "delegation", text: "代理任务", type: "delegation", spriteCssClass: "", path: "/tasks?status=delegate"},
    {key: "task_history", text: "任务历史", type: "task_history", spriteCssClass: "", path: "/tasks/history"},
    {key: "start_workflow", text: "发起流程", type: "start_workflow", spriteCssClass: "", path: "/process_definitions"},
    {key: "my_process", text: "我的流程", type: "my_process", spriteCssClass: "", path: "/process_instances"}
]

export {userSidebarDataSource};