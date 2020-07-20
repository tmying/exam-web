import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
Vue.use(VueRouter) //注册路由模块

export default new VueRouter({
  routes: [
    { path: '/', component: () => import('../views/Login.vue') }, //登录页
    {
      path: '/index', component: Index, children: [
        { path: '/', component: () => import('../views/IndexHome.vue'), meta: ['系统首页'] }, //默认路由-->首页
        // 教师系统路由
        { path: 'studentadd', component: () => import('../views/student/StudentAdd.vue'), meta: ['学生管理', '新增学生'] }, //学生管理
        { path: 'studentlist', component: () => import('../views/student/StudentList.vue'), meta: ['学生管理', '学生列表'] },
        { path: 'studentedit/:id', component: () => import('../views/student/StudentEdit.vue'), meta: ['学生管理', '学生编辑'] },
        { path: 'questionadd', component: () => import('../views/question/QuestionAdd.vue'), meta: ['题库管理', '新增试题'] }, //题库管理
        { path: 'questionlist', component: () => import('../views/question/QuestionList.vue'), meta: ['题库管理', '试题列表'] },
        { path: 'paperadd', component: () => import('../views/paper/PaperAdd.vue'), meta: ['试卷管理', '新增试卷'] }, // 试卷管理
        { path: 'paperlist', component: () => import('../views/paper/PaperList.vue'), meta: ['试卷管理', '试卷列表'] },
        { path: 'chartpaper', component: () => import('../views/chart/ChartPaper.vue'), meta: ['图表统计', '试卷统计'] }, // 图表统计
        { path: 'chartstudent', component: () => import('../views/chart/ChartStudent.vue'), meta: ['图表统计', '学生统计'] },
        { path: 'markpaper/:id', component: () => import('../views/chart/MarkPaper.vue'), meta: ['批改试卷'] },
        // 学生系统路由
        { path: 'changePwd', component: () => import('../views/student/ChangePwd.vue'), meta: ['修改密码'] },
        { path: 'mypaper', component: () => import('../views/student/MyPaper.vue'), meta: ['我的试卷'] },
        { path: 'exampaper/:id', component: () => import('../views/student/ExamPaper.vue'), meta: ['开始考试'] }
      ]
    },
    { path: '/logout', component: () => import('../views/Logout.vue') }, //退出登录
    { path: '*', redirect: '/index' } //错误地址重定向，回到首页
  ]
})