"use strict";

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';


Vue.component("goods-list", {
  props:["filtered"],
  template: `<div class="goods-list">
              <div class="goods-item" v-for="good of filtered" v-on:click="addItemCartList(good)">
                <h3 >{{good.product_name}}</h3>
                <p>\${{good.price}}</p>
              </div>
              <div class="goods-item"  v-if="filtered.length == 0">no data available</div>
             </div> `,
  methods: {
    addItemCartList(good) {
      fetch(`${API_URL}addToBasket.json`)
        .then(() => {
          this.$emit('add', good)
        })      
   }
  }
})

Vue.component("cart-list", {
  data() {
    return {
      visibleCart: true
    }
  },
  props:['cartItems'],
  template: `<div class="cart">
              <button class="cart-button" type="button" @click="checkCart">Cart</button>
              <div class="cart-list" v-if="visibleCart">
                <div class="cart-item" v-for="item of cartItems" :key="item.id_product">
                  <h3>{{item.product_name}}</h3>
                  <p>{{item.price}}</p>
                  <div class="cart-delete fas fa-times" v-on:click="removeItemCartList(item)"></div>
                </div>
                <div class="cart-sum">total amount: \${{getPrice()}}</div>  
              </div>
            </div>`,
  methods: {
    checkCart() {
      this.visibleCart = !this.visibleCart;
     },
    removeItemCartList(item) {
      fetch(`${API_URL}deleteFromBasket.json`)
      .then(() => {
        const delItem = this.cartItems.findIndex((goodItem) => goodItem.id_product == item.id_product);
        this.cartItems.splice(delItem, 1);
      })
     },
     getPrice() {
      return this.cartItems.reduce((acm,item) => acm + item.price, 0)
     },  
  }
})

Vue.component("filterForm", {
  data() {
    return {
      searchLine: ""
    }
  },
  template: `<form action="#" class="search-form">
              <button type="button" class="search-button" @click="filter(searchLine)">search</button>
              <input type="text" class="item-search" @input="filter(searchLine)" v-model="searchLine">
             </form>`,
  methods: {
    filter(src) {
      this.$emit("filter", src)
    }
  }
})

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtered: [],
    cartItems: [],
  },
  methods: {
   filter(src) {
      src = src.trim();
      if(src.length == 0) {
        this.filtered = this.goods;
        return
      }
      const reg = new RegExp(src, "i");
      this.filtered = this.goods.filter((good) => reg.test(good.product_name));
   },
   addItemCartList(good) {
    this.cartItems.push(good)          
   },
   fetchGoods() {
    fetch(`${API_URL}catalogData.json`)
    .then((response) => response.json())
    .then((request) => {
      this.goods = request;
      this.filtered = request;
      })
  .catch((err) => { 
    console.log(err.text)
  })
   },
   fetchItem()  {
    fetch(`${API_URL}getBasket.json`)
      .then((response) => response.json())
      .then((request) => {
        this.cartItems = request.contents;
      })
      .catch((err) => { 
      console.error(err.text)
      })
  }
},
  mounted() {
    this.fetchGoods();
    this.fetchItem();
  }
});

