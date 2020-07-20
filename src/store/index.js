// 1.引入
import Vue from 'vue';
import Vuex from 'vuex';
import { cheLogin } from "@/apis";
import moment from 'moment'
import { Message } from 'element-ui'
import router from '../router'

// 2.注册
Vue.use(Vuex);

// 3.定义仓库
const store = new Vuex.Store({
    // 配置1：state状态，定义全局共享的"响应式数据"
    state: {
        // 登录者信息
        user: {
            name: '',
            account: '',
            pwd: '',
            role: ''
        },
        // 当前试卷数据
        // examData: {
        //     name: "",
        //     username: "",
        //     account: "",
        //     items: [],
        //     state: "",
        //     grade: ""
        // }
    },
    // 配置2：mutations变化，修改state中的数据【唯一方式】
    mutations: {
		//参数1：state对象  参数2：参数对象
        getInfo(state, param) {
            state.user = param.info;
        }
    },
    // 配置3：actions异步请求处理，发起异步请求，然后通过mutation修改state
    actions: {
        // 获取登录者信息
        getInfo(context) {
            // debugger
            let tokenId = sessionStorage.getItem("token"); //获取token字符串
            let obj = { tokenId }; //自定义对象，作为axios请求参数
            cheLogin(obj).then(data => {
                if (data.code) {
                    // 数据请求成功，把数据传给mutation
                    context.commit({
                        type: 'getInfo',
                        info: data.data
                    })
                } else {
                    Message.error(data.msg);
                    router.replace("/");
                }
            });
        },
        // 更新参考者信息，并获得当前试卷数据   addUser
        // getPaper() { 
        //     addUser(
        //         this.$route.params.id,
        //         this.storeUser.name,
        //         this.storeUser.account
        //     ).then(data => {
        //         if (data.code) {
        //             this.examData = data.data;
        //         }
        //     });
        // }
    },
    // 配置4：getter全局计算属性，针对全局state数据进行加工   // 参数1：state对象
    getters: {
		//参数1：state对象
        getRole(state) {
            let { role } = state.user;
            if (role == 0) {
                role = moment(role).format('教师')
            } else {
                role = moment(role).format('学生')
            }
            return role;
        }
    }
})
// 调用action方法
store.dispatch({
    type: 'getInfo'
})

// 4.导出
export default store;