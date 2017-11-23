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
      seller: {}
    };
  },
  // mounted: function() {
  //   this.$nextTick(function() {
  //     this.cartView();
  //   });
  // },
  // methods: {
  //   cartView() {
  //     //es6
  //     this.$http.get("data.json", { id: 123 }).then(res => {
  //       this.seller = Object.assign({}, this.seller, res.data.seller);
  //       //console.log(this.seller);
  //     });
  //   }
  // },

  created() {
    this.$http.get("data.json", { id: 123 }).then(res => {
      this.seller = Object.assign({}, this.seller, res.data.seller);
      //console.log(this.seller.avatar);
    });
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
