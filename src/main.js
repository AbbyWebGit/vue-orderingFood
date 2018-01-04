// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import Router from 'vue-router'
import router from './router/index'
import VueResource from 'vue-resource'

// import './common/sass/index.scss'
// import './common/sass/icon.scss'

// 实例化路由
Vue.use(Router);
// 实例化vuex
Vue.use(Vuex);
// 实例化VueResource
Vue.use(VueResource);
// 定义一个事件
Event = new Vue();

// 定义一个vuex对象
const store = new Vuex.Store({
    // 初始数据状态
    state: {
        num: 0
    },
    // 对数据进行操作
    mutations: {
        // addNum对应actions里面commit的函数名字
        addNum(state, dat) {
            state.num += dat.num;
        },
        jsNum(state) {
            state.num -= 10;
        }
    },
    actions: {
        // add对应子组件dispatch过来的，方法第一个参数是对象类型，里面含有commit方法
        add({ commit }) {
            new Promise((res, rej) => {
                setTimeout(() => {
                    let dat = { num: 9 };
                    // 提交commit请求到 mutations
                    commit("addNum", dat);
                    res();
                }, 3000);
            })

        },
        // 也可以把参数的对象定义为这个样子
        js(ctx) {
            ctx.commit("jsNum");
        }
    },
    // 获取数据
    getters: {
        // num对应子组件computed里面的方法
        num(state) {
            return state.num;
        }
    }
})

// 0.7版本的router.start
const app = new Vue({
    el: "#app",
    router,
    store,
    // render: h => h(App)
    components: {
        App
    }

});
// 0,7版本是router.go
router.push('/goods');