const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const $goodsList = document.querySelector('.goods-list');
const $cartBtn = document.querySelector(".cart-button");

const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
  
const renderGoodsList = (list = goods) => {
    $cartBtn.addEventListener("click", () => {
        if($goodsList.style.display=="none") {
            $goodsList.style.display = "flex";
        }
        else {
            $goodsList.style.display = "none";
        }
    })
    let goodsList = list.map(
            (item) =>  {
                return renderGoodsItem(item)
            }
        ).join(" ");

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();
