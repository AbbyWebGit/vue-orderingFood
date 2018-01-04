<template>
  <div class="header">
    <!-- 头部信息 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64"  height="64" v-bind:src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">    
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports"  class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports"  @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
  </div>
  <!-- 公告 -->
  <div  class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span>
    <span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
 <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
  </div>
  <!-- 弹层 vue动画配置-->
   <transition name="fade">
  <div class="detail" v-show="detailShow" >
     <div class="detail-wrapper clearfix">
       <!-- 内容 -->
       <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- 评分的星星 -->
          <div class="star-wrapper">
            <star :size="48"  :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 优惠信息列表 -->
           <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!-- 商家公告内容 -->
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
       </div>
     </div>
     <!-- 关闭按钮 -->
     <div class="detail-close" @click="hideDetail">
       <i class="icon-close"></i>
     </div>
  </div>
  </transition>
</div>

</template>

<script >
import star from "../star/star";
export default {
  props: {
    // 子组件接受父组件的数据
    seller: {}
  },
  data() {
    return {
      // 定义弹层的弹出与隐藏
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    // 注册到vue的实体上面
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    star
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import "../../common/sass/index.scss";
@import '../../common/sass/icon.scss';

.header {
  color: #ffffff;
  background: rgba(7, 17, 27, 0.5);
  position: relative;
  overflow: hidden;
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0px;
    position: relative;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      font-size: 14px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-image("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      // 优惠的icon
      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image("decrease_1");
          }
          &.discount {
            @include bg-image("discount_1");
          }
          &.guarantee {
            @include bg-image("guarantee_1");
          }
          &.invoice {
            @include bg-image("invoice_1");
          }
          &.special {
            @include bg-image("special_1");
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    // 单个优惠信息
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        font-size: 10px;
        line-height: 24px;
        margin-left: 2px;
      }
    }
  }
  // 公告栏
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      @include bg-image("bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
  // 头部背景图片
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  // 详细信息的弹层
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    
    // 背景虚化
    backdrop-filter: blur(10px);
    opacity: 1; //这是动画设置
    background: rgba(7, 17, 27, 0.8);
    // vue动画配置
    &.fade-enter-active,
    &.fade-leave-active {
      //vue的动画需要参考vue动画配置理解
      transition: all 0.5s;
    }
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }

    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
      }
      .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }
      // 评论分数的星星
      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
      }
      .title {
        display: flex;
        width: 80%;
        margin: 30px auto 24px auto;
        .line {
          flex: 1;
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text {
          padding: 0 12px;
          font-weight: 700;
          font-size: 14px;
        }
      }
      // 优惠信息
      .supports {
        width: 80%;
        margin: 0 auto;
        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;
          &:last-child {
            margin-bottom: 0;
          }
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image("decrease_2");
            }
            &.discount {
              @include bg-image("discount_2");
            }
            &.guarantee {
              @include bg-image("guarantee_2");
            }
            &.invoice {
              @include bg-image("invoice_2");
            }
            &.special {
              @include bg-image("special_2");
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
          }
        }
      }
      // 商家公告
      .bulletin {
        width: 80%;
        margin: 0 auto;
        .content {
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
    // 关闭按钮
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      font-size: 32px;
      color: #ffffff;
    }
  }
}
</style>
