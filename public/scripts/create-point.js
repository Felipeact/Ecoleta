 

 function populateUFS() {
     const ufSelect =  document.querySelector("select[name=uf]");

     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( res => (
            res.json()
     ))
     .then( states => {

        for(state  of states) {
            ufSelect.innerHTML  +=  `<option value ="${state.id}">${state.nome}</option>`
        }

     })
 }

populateUFS(); 



function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedsState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedsState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade </option>";
    citySelect .disabled = true;

    fetch(url)
     .then( res => (
            res.json()
     ))
     .then( cities => {

        for(city  of cities) {
            citySelect.innerHTML  +=  `<option value ="${city.nome}">${city.nome}</option>`;

        }

        citySelect .disabled = false; 

     })
 }
    
 document.querySelector("select[name=uf]")
 .addEventListener("change", getCities);

 //Items de coleta
//pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( item of itemsToCollect ) {
    item.addEventListener("click", handleSelectedItem)
}

//

//atualizar o campo escondido com os dados selecionados 
const collectedItems = document.querySelector("input[name=items]")

let selectItems = []

function handleSelectedItem() {

    const itemLi = event.target;

    // add or remove one class with javascript
    itemLi.classList.toggle("selected")
    

    const itemId = itemLi.dataset.id;

    //COLOCAR CONSOLE.LOG ITEMID PARA VERIFICAR OQUE TEMOS

    //verificar SE existem items selecionados 

    const alreadySelected = selectItems.findIndex( item =>  {
        const itemFound = item === itemId; // isso sera true or false
        return itemFound;
    })
    //se ja estiver selecionado tirar da selecao
    if ( alreadySelected >= 0){
        //remover da selecao
        const filteredItems = selectItems.filter( item => {
            const itemIsDifferent = item != itemId
            
            return itemIsDifferent;
        })

        selectItems = filteredItems
        //se nao estiver selecionado adicionar a selecao
    }else {
        selectItems.push(itemId)
    }

    collectedItems.value = selectItems;

    //VERIFICAR SELECTITEMS NO CONSOLE LOG 
}
