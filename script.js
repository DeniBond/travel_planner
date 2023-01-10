const city = document.querySelector('#dest_city')
const country = document.querySelector('#dest_country')
const budget = document.querySelector('#budget_value')
const startDate = document.querySelector('#start_date')
const endDate = document.querySelector('#end_date')
const persons = document.querySelector('#persons')
const transfer = document.querySelector('#transfer_type')
const outputDiv = document.querySelector('.out')
const outDetails = document.querySelector('.details-of-travel')

let storage = localStorage.getItem("travel-data")
let database = (storage) ? JSON.parse(storage) : [];
// On click actions
const actionsIcons = () => {
    document.querySelectorAll('.remove').forEach(value => {
        value.addEventListener('click', removeTravel);
    });
    document.querySelectorAll('.details').forEach(value => {
        value.addEventListener('click', details);
    });
}
// Removing travel
const removeTravel = value => {
    const id = Number(value.target.getAttribute('index'))
    database.splice(id, 1)
    localStorage.setItem('travel-data', JSON.stringify(database))
    render()
}
// Details about travel
const details = value => {
    const id = Number(value.target.getAttribute('index'))
    console.log(database[id])
    outDetails.innerHTML = `
     <div class="card text-bg-info travel-card">
     <h4>Info about travel ${id + 1}</h4> 
                    <div class="title">
                        <h5>From ${database[id].City} to ${database[id].Country}</h5>
                    </div>
                    <span>Expected budget: ${database[id].Budget} ILS</span>
                    <span>${database[id].dStart} - ${database[id].dEnd} | ${database[id].Persons} persons | Type of transfer: ${database[id].TransferType} </span>
                </div>`;
    render()
}
// Display card with our travel
const render = () => {
    outputDiv.innerHTML = database.map((value, index) => `
        <div class="card travel-card">
                    <div class="title">
                        <h4>From ${database[index].City} to ${database[index].Country}</h4>
                        <i class="bi bi-pencil-square edit" index="${index}"></i>
                        <i class="bi bi-x-circle remove" index="${index}"></i>
                        <i class="bi bi-three-dots-vertical details" index="${index}"></i>
                    </div>
                    <span>Expected budget: ${database[index].Budget} ILS</span>
                    <span>${database[index].dStart} - ${database[index].dEnd} | ${database[index].Persons} persons | Type of transfer: ${database[index].TransferType} </span>
                </div>
        `).join("");
    actionsIcons();
}
render()
// Checking date 
function checkDate() {
    if (startDate.value===''|| endDate.value===''){
        console.log('EmptyDate')
        return true;
    }
    return endDate.valueAsNumber - startDate.valueAsNumber >= 0;
}
//Saving travel to database and localStorage
function save() {
    if (budget.value<=0){
        console.log('Try without money :D')
    }
    if (city.value && country.value && checkDate()) {
        database.push({
            City: city.value,
            Country: country.value,
            Budget: budget.value.toString(),
            dStart: startDate.value,
            dEnd: endDate.value,
            Persons: persons.value,
            TransferType: transfer.value
        })
    } else if (!city.value) {
        alert('Please, enter city')
    } else if (!country.value) {
        alert('Enter country')
    } else if (!checkDate()){
        alert('Wrong return date')
    }

    localStorage.setItem('travel-data', JSON.stringify(database))
    render()
}



