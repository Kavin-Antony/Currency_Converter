fetch('https://api.frankfurter.app/currencies').then(res=>res.json()).then(res=>displayDropDown(res))
let select = document.querySelectorAll('.currency');
let btn = document.getElementById("btn");
let input = document.getElementById("input");
function displayDropDown(res){
    let array = Object.entries(res);
    for (let i = 0; i<array.length; i++){
        let opt = `<option value="${array[i][0]}">${array[i][0]}</option>`
        select[0].innerHTML += opt;
        select[1].innerHTML += opt;
    }
}

function convertor(curr1,curr2,inputval){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputval}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((data) => {
    document.getElementById('result').value = Object.values(data.rates)[0]
  });
}

function convert(){
    let curr1=select[0].value
    let curr2=select[1].value
    let inputval = input.value
    if (curr1 === curr2)
        alert("Choose different currencies");
    else{
        convertor(curr1,curr2,inputval);
    }
}

btn.addEventListener('click',convert)
