<template>
 <div class="goods">
   <div class="menu-wrapper" ref="menuWrapper">    
    <ul>
     <li v-for="(item,key) in dat"  :key="key"  class="menu-item" :class="{'current':currentIndex === key}" @click="selectMenu(key,$event)">
       <span class="text">
       <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
        {{item.name}}
       </span>
     </li>
    </ul>
       <!-- vuex部分 -->
    <!-- <div>
    {{num}}
    <button @click="zengjia">增加</button>
    <button @click="jianshao">减少</button>
   </div> -->
   </div>
<div class="foods-wrapper" ref="foodsWrapper" >

  <ul>
   <li v-for="(item,key) in dat"  class="food-list food-list-hook" :key="key">
     <h1 class="title">{{item.name}}</h1>
      <ul>
         <li v-for="(food,ind) in item.foods" class="food-item" :key="ind" >
         <div class="icon">
          <img :src="food.icon" width="57" height="57">
          </div>
         <div class="content">
            <h2 class="name">{{food.name}}</h2>
             <p class="desc">{{food.description}}</p>
             <div class="extra">
            <span class="count">月售{{food.sellCount}}份</span>
             </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
         </div>
        </li>
       </ul>
    </li>
   </ul>
</div>
<shopcart :select-foods="selectFoods"  :delivery-price="seller.deliveryPrice"  :min-price="seller.minPrice"></shopcart>

 </div>
</template>

<script>
// import { mapGetters} from 'vuex'
//导入better-scroll
import BScroll from "better-scroll";
// 引入购物车组件
import shopcart from "../shopcart/shopcart";
// 引入商品数量控制组件
import cartcontrol from "../cartcontrol/cartcontrol";

export default {
  // 接收从app中路由传递过来的数据
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      dat: [],
      //foods区域的各个区块高度
      listHeight: [],
      // 滚动位置
      scrollY: 0
    };
  },
  // 计算属性
  computed: {
    // 对应getter里面的方法，这里面num是getter里面的方法名字
    // getNum() {
    //   return this.$store.getters.num;
    // }
    // ...mapGetters(["num"])

    // 左侧栏当前索引值在哪，根据当前滚动条位置
    // 当前函数在li上引用，用来对比加class值
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //  console.log(this.scrollY)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if (this.dat.length>0){
        this.dat.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
      }
      return foods;
     
    }
  },

  created() {
    // 注册到vue的实体上面
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // 接收app组件传递的值，监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
    Event.$on("getDat", dat => {
      this.dat = dat;
      // console.log(this.dat);
      //使用$nextTick来等待异步完成之后更新dom
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    });
  },
  methods: {
    // 点击左边，对应右边滚动
    selectMenu(index, event) {
      //忽略掉BScroll的点击事件，下面实例化时候增加了自己的点击事件
      if (!event._constructed) {
        return;
      }
      //  取到dom元素值
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      // 取到当前索引值的对应的dom位置
      let el = foodList[index];
      // better-scroll插件中scrollToElement可以跳到指定的位置
      this.foodsScroll.scrollToElement(el, 300);
    },
    // better-scroll插件实例化并绑定dom
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        // 插件里面增加点击事件
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        // 结合BScroll的接口使用,3实时派发scroll事件
        probeType: 3,
        click: true
      });
      // better-scroll插件的接口，实时监听scroll事件，回调函数返回的pos是鼠标坐标位置
      this.foodsScroll.on("scroll", pos => {
        //abs是绝对值，round() 方法可把一个数字舍入为最接近的整数
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 计算每个栏目的高度，一块的高度区间
    _calculateHeight() {
      //找到ref为foodsWrapper，class名为food-list-hook的节点，并将数组给foodList
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);

      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      //两个值，一个是整个块的起始值，一个是整个块的结束值
      //console.log( this.listHeight);
    }

    // vuex方法，点击之后进入方法，通过dispatch给actions传递函数
    // zengjia() {
    //   this.$store.dispatch("add");
    // },
    // jianshao() {
    //   this.$store.dispatch("js");
    // }
  },
  components: {
    shopcart,
    cartcontrol
  },

  mounted() {
    // this.zengjia();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../common/sass/index.scss";

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
      }
    }

    .icon {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      height: 12px;
      margin-right: 2px;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      &.decrease {
        @include bg-image("decrease_3");
      }
      &.discount {
        @include bg-image("discount_3");
      }
      &.guarantee {
        @include bg-image("guarantee_3");
      }
      &.invoice {
        @include bg-image("invoice_3");
      }
      &.special {
        @include bg-image("special_3");
      }
    }
    .text {
      display: table-cell;
      width: 56px;
      vertical-align: middle;
      font-size: 12px;
    }
  }

  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child {
        margin-bottom: 0;
      }
    }
    .icon {
      flex: 0 0 57px;
      margin-right: 10px;
    }
    .content {
      flex: 1;
      position: relative;
      .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc,
      .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .desc {
        line-height: 12px;
        margin-bottom: 8px;
      }
      .extra {
        .count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;

        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
      }
    }
  }
}
</style>
