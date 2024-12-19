var Products = JSON.parse(localStorage.getItem("AllData"));
var aksiya = localStorage.getItem("for_aksiya") * 1;
var totalsprice = (100 - aksiya) / 100; // bu yerda foizni to'g'rilaymiz

console.log(totalsprice);

// HTML elementini tanlab olamiz
const cartContainer = document.querySelector(".for_cart");

// Narxlar uchun total qiymatni o'zgartiruvchi o'zgaruvchi
let totalPrice = 0;

// Products arraydagi har bir element uchun forEach() metodini ishlatamiz
Products.forEach((item, key) => {
  // Har bir element uchun narxni hisoblaymiz
  const itemPrice = item.count * item.price;
  
  // Aksiya qo'llangandan keyin narxni hisoblaymiz
  const discountedPrice = itemPrice * totalsprice;

  // Total narxga qo'shib qo'yamiz
  totalPrice += discountedPrice;

  // HTML qismiga qo'shish
  cartContainer.innerHTML += `
    <div class="cartitem row-height valignmiddle" style="white-space:normal">
      <div class="col-md-10 col-xs-10" style="padding:0;">
        <div class="col-md-12 col-xs-12 nopadding text-left" style="padding-left:0;">
          ${item.title}
        </div>
        <br clear="all" style="padding:5px 0;">
        <div class="col-md-6 col-xs-6 nopadding text-left" style="padding-left:0;margin-top:10px;">
          <span>${item.count}</span>
        </div>
        <div style="padding: 0 !important" class="col-md-6 col-xs-6 nopadding text-left" style="padding-left:0;margin-top:10px;">
          <span><span style="text-decoration: line-through;"  class="for_Price">AED ${itemPrice.toFixed(0)}</span><br>AED <span class="for_aksiya">${discountedPrice.toFixed(0)}</span></span>
        </div>
      </div>
      <br clear="all">
      <div class="row-height valignmiddle row" style="border-bottom:1px solid #fff;">
        <div class="col-md-12">
          <table class="table table-striped" style="margin: 0;">
            <tbody>
              <tr>
                <td colspan="2" style="border-top:none; padding-top:0;">
                  <span style="font-size:11px;">${item.date}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="margin-top: 10px;padding-top:10px;">
        <div class="col-md-15 text-center">
        </div>
        <div class="col-md-15 text-center">
        </div>
      </div>
    </div>`;
});

document.querySelector(".subTotal").innerHTML=totalPrice.toFixed(0)
document.querySelector(".komissiya").innerHTML=(totalPrice/100*5).toFixed(0)
document.querySelector(".totalPrice").innerHTML=(totalPrice+totalPrice/100*5).toFixed(0)