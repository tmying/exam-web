// 引入axios模块
import $http from '@/apis/request';
// 引入qs模块，将复杂的请求参数对象字符串化，转换为简单对象
// import qs from 'qs';

// 1.学生添加接口   qs.stringify(data)
export const studentAdd = (data) => {
    return $http.post('/student/add', data).then(({ data }) => {
        // debugger
        return data;
    })
}

// 2.验证学生账号是否存在
export const studentExist = (account) => {
    return $http.get('/student/exist?account=' + account).then(({ data }) => data)
}

// 2.学生列表
export const studentList = (page, pageSize) => {
    return $http.get('/student/list?page=' + page + '&pageSize=' + pageSize).then(({ data }) => {
        return data
    })
}

// 3.一条学生信息
export const studentOne = (id) => {
    return $http.get('/student/readOne?id=' + id).then(({ data }) => data)
}
// 4. 编辑学生信息  qs.stringify(data)
export const studentEdit = (data) => {
    return $http.post('/student/edit', data).then(({ data }) => data)
}

// 5.删除数据
export const studentDel = (id) => {
    return $http.get('/student/delete?id=' + id).then(({ data }) => data)
}

// 6.获取学生列表
export const stuList = () => {
    return $http.get('/student/stulist').then(({ data }) => data)
}