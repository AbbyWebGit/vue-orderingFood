<template>
  <div class="star" :class="starType">
    <!-- track-by="$index"是指数据修改的dom刷新，不修改不刷新 -->
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
//星星的个数
const LENGTH = 5;
//满星
const CLS_ON = "on";
//半星
const CLS_HALF = "half";
//空星
const CLS_OFF = "off";

export default {
  props: {
    //接收星星的尺寸大小的参数
    size: {
      type: Number
    },
    //接收评分多少
    score: {
      type: Number
    }
  },
  computed: {
    //拼接星星的class
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      //定义数组
      let result = [];
      //向下取0.5倍数，比如数据原来是4.6，计算结果是4.5。
      let score = Math.floor(this.score * 2) / 2;
      //用上面的计算结果对1取余数，4.5取余数是0.5
      let hasDecimal = score % 1 !== 0;
      //对第一步结果取整数，4.5整数是4
      let integer = Math.floor(score);
      //循环数组，添加整个星星的class
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      //存在半颗星星的添加半颗星星的class
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      //新的数组长度小于定义的星星长度，添加空的星星的class
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/sass/index.scss";

.star {
  font-size: 0;
  //星星的公共样式
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image("star48_on");
      }
      &.half {
        @include bg-image("star48_half");
      }
      &.off {
        @include bg-image("star48_off");
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image("star36_on");
      }
      &.half {
        @include bg-image("star36_half");
      }
      &.off {
        @include bg-image("star36_off");
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image("star24_on");
      }
      &.half {
        @include bg-image("star24_half");
      }
      &.off {
        @include bg-image("star24_off");
      }
    }
  }
}
</style>