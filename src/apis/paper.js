// 引入
import $http from '@/apis/request';
import qs from 'qs';

// 1.内嵌表单添加
export const paperItem = (data) => {
    return $http.post('/paper/addItem', qs.stringify(data)).then(({ data }) => data)
}

// 2.删除内嵌表一条数据
export const delItem = (num) => {
    return $http.get('/paper/delOne?num=' + num).then(({ data }) => data)
}

// 3.获取内嵌表单列表
export const itemList = () => {
    return $http.get('/paper/getItems').then(({ data }) => data)
}

// 4.试卷添加并清空内嵌表数据
export const paperAdd = (data) => {
    return $http.post('/paper/add', qs.stringify(data)).then(({ data }) => data)
}

// 5.获取试卷列表
export const paperList = (page, pageSize) => {
    return $http.get('/paper/list?page=' + page + '&pageSize=' + pageSize).then(({ data }) => data)
}

// 6.删除试卷(only one)
export const delPaper = (id) => {
    return $http.get('/paper/delPaper?id=' + id).then(({ data }) => data)
}
