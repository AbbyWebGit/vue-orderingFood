// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router'
import router from './router/index'
import VueResource from 'vue-resource'

// import '/src/common/sass/index.scss'
// import '/src/common/sass/icon.scss'

Vue.use(Router);
Vue.use(VueResource)
    // 0.7版本的router.start
const app = new Vue({
    el: "#app",
    router,
    // render: h => h(App)
    components: {
        App
    }

});
// 0,7版本是router.go
router.push('/goods');