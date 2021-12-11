"use strict";

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const $cartBtn = document.querySelector(".cart-button");
const $goodsList = document.querySelector('.goods-list');
const $goodsItem = document.querySelector(".goods-item");
const $searchBtn = document.querySelector(".search-button");
const $searchInput = document.querySelector(".item-search");

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtered: [],
    cartItems: [],
    searchLine: '',
    visibleCart: true
  },
  methods: {
   filter() {
      this.searchLine = this.searchLine.trim();
      if(this.searchLine.length == 0) {
        this.filtered = this.goods;
        return
      }
      const reg = new RegExp(this.searchLine, "i");
      this.filtered = this.goods.filter((good) => reg.test(good.product_name));
   },
   addItemCartList(good) {
      fetch(`${API_URL}addToBasket.json`)
        .then(() => {
          this.cartItems.push(good)
        })      
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
  },
   checkCart() {
    this.visibleCart = !this.visibleCart;
   },
  },
  mounted() {
    this.fetchGoods();
    this.fetchItem();
  }
});
