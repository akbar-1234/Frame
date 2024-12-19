var elements = document.querySelector(".c-calendar-dates span");

// Bugungi kun
var today = new Date().getDate();

// Elementlarni solishtirish
for (var i = 0; i < elements.length; i++) {
  var element = elements[i];
  var elementDate = parseInt(element.textContent);
  console.log(elementDate);

  if (elementDate < today) {
    element.classList.add("is-NG is-nosale is-weekday");
  } else {
    element.classList.add("is-OK is-saturday is-sale");
  }
}



var aylantirish1 = document.getElementById("aylantirish1");
aylantirish1.addEventListener("click", function () {
  is_acc(document.querySelector("#aylantirish").innerHTML * 1 + 1);
});
var aylantirish1 = document.getElementById("aylantirish2");
aylantirish1.addEventListener("click", function () {
  if (document.querySelector("#aylantirish").innerHTML) {
    is_acc(document.querySelector("#aylantirish").innerHTML * 1 - 1);
  }
});


  var data = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];




var this_date = new Date();
var getMonth = this_date.getMonth();
var num1 = getMonth;
var num2 = getMonth + 5;
var this_months = data.slice(num1, num2);
var currentYear1 = this_date.getFullYear();

this_months.map((item, key) => {
  document.querySelector(".swiper-wrapper").innerHTML += `
    <div class="swiper-slide" onclick='is_acc(${key})'> <span class="text-left">${item}</span></div>
    `;
});

function updateCalendar(selectedMonthIndex = 0) {
  var calendarElement = document.getElementById("calendar");
  calendarElement.innerHTML = "";

  var today = new Date();
  var currentDay = today.getDate();
  var currentMonth = today.getMonth() + selectedMonthIndex + 1;
  var currentYear = today.getFullYear();



    var calendarHTML = '<table class="calendar table">';
  calendarHTML += "<thead>";
  calendarHTML += "<tr>";
  calendarHTML += '<td class="calendar-day-head">Sun</td>';
  calendarHTML += '<td class="calendar-day-head">Mon</td>';
  calendarHTML += '<td class="calendar-day-head">Tue</td>';
  calendarHTML += '<td class="calendar-day-head">Wed</td>';
  calendarHTML += '<td class="calendar-day-head">Tue</td>';
  calendarHTML += '<td class="calendar-day-head">Fri</td>';
  calendarHTML += '<td class="calendar-day-head">Sat</td>';
  calendarHTML += "</tr>";
  calendarHTML += "</thead>";
  calendarHTML += "<tbody>";
  
  

  var totalDays = new Date(currentYear, currentMonth, 0).getDate();

  var firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  var dayOfWeek = 0;

  calendarHTML += "<tr>";
  for (var i = 0; i < firstDayOfMonth; i++) {
    calendarHTML += "<td></td>";
    dayOfWeek++;
  }

  for (var i = 1; i <= totalDays; i++) {
    var dayClass = "";
    if (
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() + 1 &&
      i < currentDay
    ) {
      dayClass = " smal_today";
    }  else {
      calendarHTML += `<td onclick="pasport(${dayOfWeek},${i},${currentYear},${currentMonth})" class="calendar-day  text-left" style="background: #ceead0">
      <div class="day-number active" data-date="12/05/2024">${i}</div>
                  </td>`;
    }

    if (
      currentYear < today.getFullYear() ||
      (currentYear === today.getFullYear() &&
        currentMonth < today.getMonth() + 1) ||
      (currentYear === today.getFullYear() &&
        currentMonth === today.getMonth() + 1 &&
        i < currentDay)
    ) {
      calendarHTML += `<td class="calendar-day  text-left" style="background: #000">
      <div class="day-number " data-date="1/05/2024">${i}</div>
                  </td>`;
    }

    dayOfWeek++;
    if (dayOfWeek === 7) {
      calendarHTML += "</tr>";
      if (i < totalDays) {
        calendarHTML += "<tr>";
      }
      dayOfWeek = 0;
    }
  }

  calendarHTML += "</tbody>";
  calendarHTML += "</table>";

  calendarElement.innerHTML = calendarHTML;
}

function is_acc(key) {
  document.querySelector("#aylantirish").innerHTML = key;
  var list = document.querySelectorAll(".swiper-slide");
  list.forEach((item) => item.classList.remove("is-active"));
  list[key].classList.add("is-active");
  updateCalendar(key);
}

function selectDay() {
  var calendarDays = document.querySelectorAll("#calendar .is-OK");
  calendarDays.forEach(function (day) {
    day.addEventListener("click", function () {
      calendarDays.forEach(function (day) {
        day.classList.remove("selected-day");
      });
      this.classList.add("selected-day");
    });
  });
}


updateCalendar();
selectDay();

document.querySelector(".date_perf").innerHTML=""

function getDayOfWeek(dateString) {
  var daysOfWeek = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  var date = new Date(dateString);
  var dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

var today = new Date();
var dayOfWeek = getDayOfWeek(today);

  function pasport(dayOfWeek, i, currentYear, currentMonth) {
    document.querySelector(".productcont").style = "display:none"
    var daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daysMont = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var weeks = daysWeek.slice(dayOfWeek, dayOfWeek + 1);
    var months = daysMont.slice(currentMonth - 1, currentMonth);
    document.querySelector(".date_perf").innerHTML=weeks+","+" "+i+" "+months+" "+currentYear
   
      localStorage.setItem('select_data',`${i}/${currentMonth}/${currentYear}`)
      console.log(`${i}/${currentMonth}/${currentYear}`);

      if (localStorage.getItem("select_data")=="11/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="4888"
      }
      if (localStorage.getItem("select_data")=="12/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5963"
      }
      if (localStorage.getItem("select_data")=="13/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5968"
      }
      if (localStorage.getItem("select_data")=="14/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5954"
      }
      if (localStorage.getItem("select_data")=="15/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5972"
      }
      if (localStorage.getItem("select_data")=="16/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5990"
      }
      if (localStorage.getItem("select_data")=="17/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5972"
      }
      if (localStorage.getItem("select_data")=="18/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5969"
      }
      if (localStorage.getItem("select_data")=="19/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5970"
      }
      if (localStorage.getItem("select_data")=="20/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5982"
      }
      if (localStorage.getItem("select_data")=="21/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5980"
      }
      if (localStorage.getItem("select_data")=="22/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5978"
      }
      if (localStorage.getItem("select_data")=="23/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5986"
      }
      if (localStorage.getItem("select_data")=="24/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5980"
      }
      if (localStorage.getItem("select_data")=="25/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5971"
      }
      if (localStorage.getItem("select_data")=="26/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5976"
      }
      if (localStorage.getItem("select_data")=="27/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5959"
      }
      if (localStorage.getItem("select_data")=="28/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5987"
      }
      if (localStorage.getItem("select_data")=="29/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5968"
      }
      if (localStorage.getItem("select_data")=="30/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5976"
      }
      if (localStorage.getItem("select_data")=="31/5/2024") {
        document.querySelector(".qtyavailable").innerHTML="5898"
      }
      if (localStorage.getItem("select_data")=="1/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5957"
      }
      if (localStorage.getItem("select_data")=="2/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="3/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5992"
      }
      if (localStorage.getItem("select_data")=="4/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5993"
      }
      if (localStorage.getItem("select_data")=="5/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="6/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="7/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5991"
      }
      if (localStorage.getItem("select_data")=="8/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5978"
      }
      if (localStorage.getItem("select_data")=="9/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5995"
      }
      if (localStorage.getItem("select_data")=="10/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="11/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="12/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="13/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="14/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="15/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5994"
      }
      if (localStorage.getItem("select_data")=="16/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5996"
      }
      if (localStorage.getItem("select_data")=="17/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="18/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="19/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5995"
      }
      if (localStorage.getItem("select_data")=="20/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5996"
      }
      if (localStorage.getItem("select_data")=="21/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="22/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="23/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="24/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="25/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5991"
      }
      if (localStorage.getItem("select_data")=="26/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="27/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5998"
      }
      if (localStorage.getItem("select_data")=="28/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="6000"
      }
      if (localStorage.getItem("select_data")=="29/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5995"
      }
      if (localStorage.getItem("select_data")=="30/6/2024") {
        document.querySelector(".qtyavailable").innerHTML="5989"
      }
    }

var datat = 0

function add_cart(key) {
  var saqlanganMalumotlar = localStorage.getItem("AllData");
  var saqlangan = JSON.parse(localStorage.getItem("product"));

  var malumotlar = [];
  if (saqlanganMalumotlar) {
    malumotlar = JSON.parse(saqlanganMalumotlar);
  } else {
    malumotlar = [];
  }
  var input_0 = document.querySelector("#input_0").value;
  var input_1 = document.querySelector("#input_1").value;
  var input_2 = document.querySelector("#input_2").value;

  var Adult = {
    title: "Adult",
    count: input_0,
    price: 50,
    date: localStorage.getItem("select_data"),
  };

  var Children = {
    title: "Children",
    count: input_1,
    price: 20,
    date: localStorage.getItem("select_data"),
  };

  var Pod = {
    title: "Pod",
    count: input_2,
    price: 0,
    date: localStorage.getItem("select_data"),
  };

  var dates = localStorage.getItem("select_data");
  var Alltovar = JSON.parse(localStorage.getItem("AllData"));

  var r = true;
  var key0 = -1;
  var key1 = -1;
  var key2 = -1;

  if (key === 0 && input_0 > 0) {
    localStorage.setItem("count", input_0);

    var key_adult = malumotlar.findIndex(function (item) {
      return item.title === "Adult" && item.date === dates;
    });

    if (key_adult !== -1) {
      r = false;
      key0 = key_adult;
    }

    if (r) {
      malumotlar.push(Adult);
    } else {
      var a = localStorage.getItem("count");
      malumotlar[key0].count = parseInt(malumotlar[key0].count) + parseInt(a);
    }

    localStorage.setItem("AllData", JSON.stringify(malumotlar));
    window.location.reload();
  }

  if (key === 1 && input_1 > 0) {
    localStorage.setItem("count_1", input_1);

    var key_children = malumotlar.findIndex(function (item) {
      return item.title === "Children" && item.date === dates;
    });

    if (key_children !== -1) {
      r = false;
      key1 = key_children;
    }

    if (r) {
      malumotlar.push(Children);
    } else {
      var a = localStorage.getItem("count_1");
      malumotlar[key1].count = parseInt(malumotlar[key1].count) + parseInt(a);
    }

    localStorage.setItem("AllData", JSON.stringify(malumotlar));
    window.location.reload();
  }

  if (key === 2 && input_2 > 0) {
    localStorage.setItem("count_2", input_2);

    var key_pod = malumotlar.findIndex(function (item) {
      return item.title === "Pod" && item.date === dates;
    });

    if (key_pod !== -1) {
      r = false;
      key2 = key_pod;
    }

    if (r) {
      malumotlar.push(Pod);
    } else {
      var a = localStorage.getItem("count_2");
      malumotlar[key2].count = parseInt(malumotlar[key2].count) + parseInt(a);
    }

    localStorage.setItem("AllData", JSON.stringify(malumotlar));
    window.location.reload();
  }
}

  var plus_0 = 0
  var plus_1 = 0
  var plus_2 = 0

  function for_plus_0() {
    plus_0 += 1
    console.log(plus_0);
    document.querySelector("#input_0").value=plus_0
  }

  function for_plus_1() {
    plus_1 += 1
    console.log(plus_1);
    document.querySelector("#input_1").value=plus_1
  }

  function for_plus_2() {
    plus_2 += 1
    console.log(plus_2);
    document.querySelector("#input_2").value=plus_2
  }

  function for_minus_0() {
    if (plus_0 > 0) {
      plus_0 -= 1
      document.querySelector("#input_0").value=plus_0 
    }
  }

  function for_minus_1() {
    if (plus_1 > 0) {
      plus_1 -= 1
      document.querySelector("#input_1").value=plus_1 
    }
  }

  function for_minus_2() {
    if (plus_2 > 0) {
      plus_2 -= 1
      document.querySelector("#input_2").value=plus_2 
    }
  }


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
        <div class="col-md-2 col-xs-2 text-center" style="padding:0;">
          <a onclick='delete_product(${key})' class="delcart" rel="49118" title="delete">
            <img src="https://ticketingsales.dubaiframe.ae/components/com_snapp/assets/images/close.png" class="img-responsive" data-toggle="tooltip" data-placement="top" style="max-width:40px;" title="" data-original-title="Empty">
          </a>
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
  
  // Total narxni HTML elementiga qo'shamiz




function delete_product(key) {
    Products.splice(key, 1);
    localStorage.setItem("AllData", JSON.stringify(Products));
    window.location.reload();
}




    function nextPage() {
      document.querySelector(".productcont").style = "display:block"
    }

document.querySelector(".subTotal").innerHTML=totalPrice.toFixed(0)
document.querySelector(".komissiya").innerHTML=(totalPrice/100*5).toFixed(0)
document.querySelector(".totalPrice").innerHTML=(totalPrice+totalPrice/100*5).toFixed(0)

  




