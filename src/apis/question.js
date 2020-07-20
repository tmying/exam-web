import $http from './request';
import qs from 'qs'

// 1.试题添加
export const questionAdd = (data) => {
    return $http.post('/question/add', qs.stringify(data)).then(({ data }) => data)
}

// 2.试题列表并分页
export const questionList = (page, pageSize) => {
    return $http.get('/question/list?page=' + page + '&pageSize=' + pageSize).then(({ data }) => data)
}

// 3.筛选试题并分页
export const questionSelect = (type, page, pageSize) => {
    return $http.get('/question/select?type=' + type + '&page=' + page + '&pageSize=' + pageSize).then(({ data }) => data)
}

// 4.删除数据
export const questionDel = (id) => {
    return $http.get('/question/delete?id=' + id).then(({ data }) => data)
}

// 5.获取试题列表
export const questionAll = () => {
    return $http.get('/question/listAll').then(({ data }) => data)
}