"use strict";

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const $cartBtn = document.querySelector(".cart-button");
const $goodsList = document.querySelector('.goods-list');
const $goodsItem = document.querySelector(".goods-item");
const $cartList = document.querySelector(".cart-list");
const $searchBtn = document.querySelector(".search-button");
const $searchInput = document.querySelector(".item-search");

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
      this.filtred = [];
    }

    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
      .then((response) => {
        return response.json();
      })
      .then((request) => {
        this.goods = request.map(good => ({id_product:good.id_porduct ,product_name: good.product_name, price: good.price}))
        this.filtred = this.goods;
        this.render();
      })
      .catch((err) => { 
        console.log(err.text)
      })
    }

    filter(searchStr) {
      searchStr = searchStr.trim();

      if(searchStr.length === 0) {
        this.filtred = this.goods;
        this.render()
        return
      }

      const reg = new RegExp(searchStr, "i");
      this.filtred = this.goods.filter((good) => reg.test(good.product_name));
      this.render()
    }

    render() {
        let listHtml = '';
        document.querySelector('.goods-list').textContent = "";
        this.filtred.forEach(good => {
          const goodItem = new GoodsItem(good.id_porduct, good.product_name, good.price);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML("afterbegin",listHtml);
    }
 
    getPrice() {
      return this.filtred.reduce((acm,item) => acm + item.price, 0)
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
      return $cartList.insertAdjacentHTML("beforeend", `<div class="cart-sum">total amount: ${this.getPrice()}</div>`);    
  }
    getPrice() {
      return this.cartItems.reduce((acm,item) => acm + item.price, 0)
    } 
}

const list = new GoodsList();        
list.fetchGoods();
list.render();
$searchInput.addEventListener("input", () => {
  list.filter($searchInput.value);
})

const cartList = new CartList();
cartList.fetchItem();
cartList.renderToCart();
cartList.addItemCartList();
cartList.removeItemCartList();