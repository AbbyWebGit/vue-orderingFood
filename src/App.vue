<template>
  <div id="app">
    <vheader  v-bind:seller="seller"></vheader>
   <div class="tab">
     <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
     <div class="tab-item"> 
       <router-link to="/ratings">评论</router-link>
       </div>
     <div class="tab-item">
       <router-link to="/seller">商家</router-link>
       </div>
   </div>
   <router-view></router-view>
  </div>
</template>

<script>
import vheader from "./components/header/header";

export default {
  data() {
    return {
      seller: {},
      goods:[],
      ratings:[],
    
    };
  },
 

  created() {                                                                                                                                                                                                                                                              
    this.$http.get("data.json").then(res => {
      // es6深度复制对象
      this.seller = Object.assign({}, this.seller, res.data.seller);
      // es6深度复制数组
      this.goods = [...res.data.goods];
      this.ratings =  [...this.ratings, res.data.ratings];
      // console.log(typeof(this.seller));
      // 触发当前实例上的事件，并将参数回调，数据发射给兄弟组件
      Event.$emit("getDat",this.goods);
      //console.log(this.seller.avatar);
    });
  },
  mounted(){
     
  },
  components: {
    vheader: vheader
  }
};
</script>

<style lang="scss" >
// @import "./common/sass/index.scss";
// @import "common/sass/icon.scss";

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
