const form = document.getElementById("passngerForm1");
form.addEventListener("submit", validFormFieldInput);
var placeSearch, autocomplete;

const retDate = document.getElementById("return");
const depDate = document.getElementById("depart");
const fc = document.getElementById("cityfrom");
const tc = document.getElementById("cityto");

retDate.addEventListener("change", validateRetDate);
depDate.addEventListener("change", validateDepDate);
tc.addEventListener("change", validatecity);

 function validatecity(event) {
  const tocity = event.target.value;
  if ( tocity===fc.value || !fc.value){
    alert("Departure city and Destination city cannot be same");
    tc.value='';
    return false;
  }
 }

function validateDepDate(event) {
  event.preventDefault();
  const departeDate = event.target.value;
  console.log("DEPART:" + departeDate);
  const dt = new Date();
  let tday = (dt.getDate()+1).toString();
  tday.length<2 ? tday = '0'+ tday: tday;
  let tmonth = (dt.getMonth()+1).toString();
  console.log("Lenght:"+tmonth.length)
  tmonth.length<2 ? tmonth = '0'+tmonth: tmonth;
  const tyr = dt.getFullYear();
  const today = tyr+'-'+tmonth+'-'+tday
  console.log("TODAY:" + today);
  if (departeDate < today) {
    depDate.value=''
    alert("Depature date  must be Today or a Future date");
    return false;
  }
}

function validateRetDate(event) {
  event.preventDefault();
  const returnDate = event.target.value;
  console.log("DEP:"+depDate.value)
  if (returnDate < depDate.value || !depDate.value ) {
    retDate.value=''
    alert("Return date must be same as or higher than Departure date");
    return false;
  }
}

function validFormFieldInput(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);

  const formDataObj = Object.fromEntries(myFormData.entries());
  console.log(formDataObj);

  const roundTrip = document.getElementById("round");
  if (!formDataObj.returndate && roundTrip.checked) {
    alert("Return date is required");
    return false;
  }
  if (
    formDataObj.pfname1 === formDataObj.pfname2 &&
    formDataObj.plname1 === formDataObj.plname2
  ) {
    alert("Passenger 1 and Passenger 2  cannot be same");
    return false;
  }

  if (formDataObj.pfname1.length < 5 || formDataObj.pfname2.length < 5) {
    alert("First name less than 5 characters");
    return false;
  }
  if (formDataObj.age1 < 0 || formDataObj.age2 < 0) {
    alert("Age of must be greater than 0");
    return false;
  }
  if (!formDataObj.gender1 || !formDataObj.gender2) {
    alert("Gender is Mandatory");
    return false;
  }

  console.log(formDataObj);
}
