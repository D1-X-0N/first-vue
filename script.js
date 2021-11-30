"use strict";

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const $cartBtn = document.querySelector(".cart-button");
const $goodsList = document.querySelector('.goods-list');
const $goodsItem = document.querySelector(".goods-item");
const $cartList = document.querySelector(".cart-list");

$cartBtn.addEventListener("click", () => {
    if($cartList.style.display=="none") {
         $cartList.style.display = "flex";
    }
    else {
        $cartList.style.display = "none";
    }
 });

class GoodsItem {
    constructor(id_product,product_name, price) {
      this.id_product = id_product;
      this.product_name = product_name;
      this.price = price;
    }

    render() {
      return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
      .then((response) => {
        return response.json();
      })
      .then((request) => {
        this.goods = request.map(good => ({id_product:good.id_porduct ,product_name: good.product_name, price: good.price}))
        this.render();
      })
      .catch((err) => { 
        console.log(err.text)
      })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.id_porduct, good.product_name, good.price);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    counterSum() {
        let sum = 0;
        this.goods.forEach((item) => {
            sum += item.price;
        })
        console.log(sum);
    }
    
}  

class CartItem extends GoodsItem {
    
    render() {
        return `<div class="cart-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <div class="cart-delete fas fa-times"></div>
        </div>`;
      }
}

class CartList {
    constructor() {
        this.cartItems = [];
    }

    fetchItem()  {
        fetch(`${API_URL}getBasket.json`)
        .then((response) => {
            return response.json();
        })
        .then((request) => {
            this.cartItems = request.contents.map(good => ({id_product: good.id_product, product_name: good.product_name, price: good.price}))
            this.renderToCart();
          })
          .catch((err) => { 
            console.log(err.text)
          })
    }

    renderToCart() {
        let listHtml = '';
        this.cartItems.forEach(item => {
          const cartItem = new CartItem(item.id_product, item.product_name, item.price);
          listHtml += cartItem.render();
        });
        document.querySelector('.cart-list').innerHTML = listHtml;
        this.counterSum();
    }

    addItemCartList() {
      $goodsList.addEventListener("click", (event) => {
        let count = 0;
        let titleItem = "";
        for(let i = 0; i<event.path.length; i++) {
        if(event.path[i].className == "goods-item" && count<1) {
          titleItem = event.path[i].childNodes[0].innerText;
          count+=1;
        }
      }
      fetch(`${API_URL}catalogData.json`)
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          for (const item of request) {
            if(item.product_name === titleItem) {
              this.cartItems.push(item);
              this.renderToCart();
              }
          }
         })
        })
     }
    removeItemCartList() {
        $cartList.addEventListener("click", (event) => {
          let count = 0;
          for (const itemCart of this.cartItems) {
            if(event.target.classList.contains("cart-delete") && event.target.parentNode.firstElementChild.innerText == itemCart.product_name) {             
              this.cartItems.splice(count, 1);
              break
            }
            count+=1;
          }
          this.renderToCart();
        })
     }

     counterSum() {
      let sum = 0;
      this.cartItems.forEach((item) => {
          sum += item.price;
      })
      $cartList.insertAdjacentHTML("beforeend", `<div class="cart-sum">total amount: ${sum}</div>`);
  }
  
}

const list = new GoodsList();        
list.fetchGoods();
list.render();

const cartList = new CartList();
cartList.fetchItem();
cartList.renderToCart();
cartList.addItemCartList();
cartList.removeItemCartList();