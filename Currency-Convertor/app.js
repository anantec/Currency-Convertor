const BASE_URL=  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const btn  = document.querySelector("form button");
// accessing the elemetns of drop down for country currency
const dropdown = document.querySelectorAll(".dropdown select");

const msg= document.querySelector(".msg");
let i=0;
for(let select of dropdown){
for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value= currCode;
    if(select.name==="from" && currCode === "USD"){
        newOption.selected = "selected";
    }else  if(select.name==="to" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
})
}


// for changing the country flag according to the selection of currency
const updateFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src=newSrc;
}
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    // accessing the amount entered by user
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
// converting the currency
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate =data[toCurr.value.toLowerCase()];
     
    let finalAmout = amtVal *rate;
    msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmout} ${toCurr.value}`;
})