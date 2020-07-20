import $http from '@/apis/request';
import qs from 'qs';

// 1.登录验证
export const userLogin = (data) => {
    return $http.post('/login', qs.stringify(data)).then(({ data }) => data)
}

// 2.验证token：保证只有登录了才能访问本系统
export const cheLogin = (token) => {
    return $http.post('/chelogin', qs.stringify(token)).then(({ data }) => data)
}

// 3.修改密码
export const changePwd = (data) => {
    return $http.post('/changepwd', data).then(({ data }) => data)
}

/* ------------------------------------------------------------------- */
// 获取当前学生的试卷表
export const stuExam = (account) => {
    return $http.get('/stuexam?account=' + account).then(({ data }) => data)
}

// 1.添加试卷信息到试卷列表中，并获取自增id
export const copyPaper = (id) => {
    return $http.get('/exam?id=' + id).then(({ data }) => data)
}

// 2.添加参考者信息，并获得当前试卷信息
export const addUser = (id, username, account) => {
    return $http.get('/examuser?id=' + id + '&username=' + username + '&account=' + account).then(({ data }) => data)
}

// 3.添加学生答案
export const addAnswer = (id, items) => {
    return $http.get('/examanswer?id=' + id + '&items=' + items).then(({ data }) => data)
}
// export const addAnswer = (data) => {
//     return $http.post('/examanswer', qs.stringify(data)).then(({ data }) => data)
// }

// 4.获取学生试卷列表
export const examList = (page, pageSize) => {
    return $http.get('/examlist?page=' + page + '&pageSize=' + pageSize).then(({ data }) => data)
}

// 5.获取当前试卷
export const examPaper = (id) => {
    return $http.get('/exampaper?id=' + id).then(({ data }) => data)
}

// 6.教师打分并改变答题状态
export const examMark = (id, items) => {
    return $http.get('/exammark?id=' + id + '&items=' + items).then(({ data }) => data)
}

// 7.更新学生总分
export const examGrade = (id, grade) => {
    return $http.get('/grade?id=' + id + '&grade=' + grade).then(({ data }) => data)
}