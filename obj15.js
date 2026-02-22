let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let title = document.getElementById("title");
let subment = document.getElementById("subment");
let deletall = document.getElementById("deletall");
let mood = "create";
let temp;
let butdeletall =document.getElementById('butdeletall');
let p2 = document.querySelector('.p2')
let pp = document.querySelector('.pod .p2')

let getTotal = function () {
  if (price.value != "") {
    let rusult =
      Number(price.value) +
      Number(ads.value) +
      Number(taxes.value) -
      +discount.value;
    total.innerHTML = rusult;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
};

let datapro;
let cashe;
if (JSON.parse(localStorage.cashe)===null){
  localStorage.cashe=0
}
//localStorage.setItem('cashe',0)
//console.log(typeof JSON.parse(localStorage.cashe))
//console.log( JSON.parse(localStorage.cashe))
if(JSON.parse(localStorage.cashe)>0){
  cashe=JSON.parse(localStorage.cashe)
   p2.innerText=cashe
   pp.innerText=cashe
}else{
 cashe=0
   p2.innerText=cashe
   pp.innerText=cashe
}
if (localStorage.prodect != null) {
  datapro = JSON.parse(localStorage.prodect);
 

} else {
  datapro = [];
 
}

subment.onclick = function () {
  subment.innerHTML = "Create";

  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value!=''&&price.value!=''&&category.value!=''&& newpro.count<100){
      if (mood === "create") {
    if (newpro.count > 1) {
     for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
         clear();
      }
    } else
         {
       datapro.push(newpro);
         clear();
    }
  } else {
    datapro[temp] = newpro;
    mood = "create";
    count.style.display = "block";
  }

  }

  localStorage.setItem("prodect", JSON.stringify(datapro));
   clear();
  read();
};

let clear = function () {
  (title.value = ""),
    (price.value = ""),
    (discount.value = ""),
    (ads.value = ""),
    (category.value = ""),
    (taxes.value = ""),
    (count.value = ""),
    (total.innerHTML = "");
};

let read = function () {
  getTotal();
  let tbody = document.getElementById("tbody");
  let item = "";

  for (let i = 0; i < datapro.length; i++) {
    item +=
      "<tr><td>" +
      (i+1) +
      "</td> <td>" +
      datapro[i].title +
      "</td> <td>" +
      datapro[i].price +
      "</td><td>" +
      datapro[i].ads +
      "</td><td>" +
      datapro[i].taxes +
      "</td><td>" +
      datapro[i].discount +
      "</td><td>" +
      datapro[i].total +
      "</td><td>" +
      datapro[i].category +
      '</td>  <td><button class="update" onclick="updatedata(' +
      i +
      ')">update</button></td> <td><button  onclick="deletdata(' +
      i +
      ')" class="delet-">sell</button></td> </tr>';
     
  }
  
  butdeletall.innerHTML='Delet all('+datapro.length+')';
  tbody.innerHTML = item;
  if (datapro.length > 0) {
    deletall.style.display = "block";
  } else {
    deletall.style.display = "none";
  }
};

onload = function () {
  read();
};
let items=""
let totalsells=0
let total_sells=document.querySelector('.sell-other h4')
let sell_btn = document.getElementById('sell-btn')
let arritem=[]
 let tbody_sell = document.getElementById('tbody-sell')
//let avli=false
let deletdata = function (i) {
  
      items += "<tr><td>" +
      (i+1) +
      "</td> <td>" +
      datapro[i].title +
      "</td> <td>" +
      datapro[i].price +
      "</td><td>" +
      datapro[i].ads +
      "</td><td>" +
      datapro[i].taxes +
      "</td><td>" +
      datapro[i].discount +
      "</td><td>" +
      datapro[i].total +
      "</td><td>" +
      datapro[i].category +
      '</td>  <td><button class="update" onclick="updatedata(' +
      i +
      ')">update</button></td> <td class="delet-">X</td></tr>';

    tbody_sell.innerHTML=items;
    //console.log(i)
    arritem.push(i)
   let le = Number(datapro[i].total) 
     totalsells+=le
  // console.log(typeof totalsells)
  // console.log( typeof le)
  total_sells.innerHTML= 'Total : <strong>'+totalsells+'$</strong'
  sell_btn.onclick=()=>{
    for(let i=0 ; i<arritem.length;i++){
    datapro.splice(arritem[i], 1);
    }
    localStorage.prodect = JSON.stringify(datapro);
    read();
    items=""
    tbody_sell.innerHTML=items;
    ca_s(totalsells)
    totalsells=0
     total_sells.innerHTML= 'Total : <strong>'+totalsells+'$</strong'
  }
};



let but_del_y = document.querySelector(".yes")
let but_del_N = document.querySelector(".no")
let deletdataall = function () {
  $(function () {
    $('.pup').slideDown(1000);
  });
  but_del_y.onclick=()=>{
  datapro.splice(0);
  $(function () {
    $('.pup').slideUp(1000);
  });
  localStorage.clear();
  read();
  }
  but_del_N.onclick=()=>{
$(function () {
    $('.pup').slideUp(1000);
  });
  }
};


let updatedata = function (i) {
  temp = i;
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  taxes.value = datapro[i].taxes;
  category.value = datapro[i].category;
  count.style.display = "none";
  subment.innerHTML = "update";
  getTotal();
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

//search

let moodsearch = "title";
let search = document.getElementById("search");
let getsearchmood = function (id) {
  if (id === "searchbycategory") {
    moodsearch = "categorey";
  } else {
    moodsearch = "title";
  }
  search.placeholder = "search by " + moodsearch;
  search.focus();
  search.value = "";
  read();
};

let getsearch = function (value) {
  let item = "";
    for (let i = 0; i < datapro.length; i++){
  if (moodsearch === "title") {
   
      if (datapro[i].title.includes(value.toLowerCase())||datapro[i].title.includes(value.toUpperCase())) {
        item +=
          "<tr><td>" +
          i +
          "</td> <td>" +
          datapro[i].title +
          "</td> <td>" +
          datapro[i].price +
          "</td><td>" +
          datapro[i].ads +
          "</td><td>" +
          datapro[i].taxes +
          "</td><td>" +
          datapro[i].discount +
          "</td><td>" +
          datapro[i].total +
          "</td><td>" +
          datapro[i].category +
          '</td>  <td><button class="update" onclick="updatedata(' +
          i +
          ')">update</button></td> <td><button  onclick="deletdata('+ i +')" class="delet-">sell</button></td> </tr>';
      }  
    }
      else  
       if (datapro[i].category.includes(value.toLowerCase())||datapro[i].category.includes(value.toUpperCase())) {
        item +=
          "<tr><td>" +
          i +
          "</td> <td>" +
          datapro[i].title +
          "</td> <td>" +
          datapro[i].price +
          "</td><td>" +
          datapro[i].ads +
          "</td><td>" +
          datapro[i].taxes +
          "</td><td>" +
          datapro[i].discount +
          "</td><td>" +
          datapro[i].total +
          "</td><td>" +
          datapro[i].category +
          '</td>  <td><button class="update" onclick="updatedata(' +
          i +
          ')">update</button></td> <td><button  onclick="deletdata(' +
          i +
          ')" class="delet">sell</button></td> </tr>';
      }  
    }
  
  tbody.innerHTML = item;
}
let close = document.querySelector('.close')
let pud =()=>{
  $('.pud').slideDown(1200);
  close.onclick=()=>{
     $('.pud').slideUp(1200);
  }
}
let ca_s=(cas)=>{
  cashe+=cas;
   localStorage.setItem("cashe",JSON.stringify(cashe))
   cashe= JSON.parse(localStorage.cashe)

   pp.innerText=cashe
  p2.innerText=cashe;
}
let pod = document.querySelector('.pod')
let pod_cl= document.querySelector('.pod .close')
let clos = document.querySelector('.clos');
let in_cl = document.getElementById('clo')
let close_d=()=>{
$(function () {
  $('.pod').slideDown(1200);
  pod_cl.onclick=()=>{
     $('.pod').slideUp(1000);
  }
  clos.onclick=()=>{
    $('.pod').slideUp(1000);
   
    let new_ = JSON.parse(localStorage.cashe)-Number(in_cl.value)
    cashe=new_
    localStorage.cashe=JSON.stringify (new_)
    pp.innerText=cashe
  p2.innerText=cashe;
    in_cl.value=""
    }
});
}


let se_input = document.getElementById('se_input')
let se_output= document.getElementById('output_sall')

let salles = ()=>{
se_input.style.display='none'
se_output.style.display="block"
}
let bayes=()=>{
  se_input.style.display='block'
se_output.style.display="none"
}


