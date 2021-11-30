"use strict";

// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];

// const $goodsList = document.querySelector('.goods-list');
// const $cartBtn = document.querySelector(".cart-button");

// const renderGoodsItem = ({ title, price }) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };
  
// const renderGoodsList = (list = goods) => {
//     $cartBtn.addEventListener("click", () => {
//         if($goodsList.style.display=="none") {
//             $goodsList.style.display = "flex";
//         }
//         else {
//             $goodsList.style.display = "none";
//         }
//     })
//     let goodsList = list.map(
//             (item) =>  {
//                 return renderGoodsItem(item)
//             }
//         ).join(" ");

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
  
// renderGoodsList();

const $cartBtn = document.querySelector(".cart-button");
const $goodsList = document.querySelector('.goods-list');

$cartBtn.addEventListener("click", () => {
    if($goodsList.style.display=="none") {
         $goodsList.style.display = "flex";
    }
    else {
        $goodsList.style.display = "none";
    }
 });

class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
        this.goods = [
          { title: 'Shirt', price: 150 },
          { title: 'Socks', price: 50 },
          { title: 'Jacket', price: 350 },
          { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price);
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
    
    
    counterItems() {
        console.log("add plus one or minus one"); 
    }

    counterPriceItem() {
        console.log("multiplies the price of the product by the quantity")
    }
}

class CartList {
    constructor() {
        this.cartItems = [];
    }

    renderToCart() {
        console("render");
    }

    fetchItem()  {
        console.log("fetch");
    }

    addItemCartList() {
        console("add");
    }

    removeItemCArtList() {
        console("remove");
    }
}

const list = new GoodsList();        
list.fetchGoods();
list.render();
list.counterSum();