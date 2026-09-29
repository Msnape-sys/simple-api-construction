const baseURL = "https://estimationpro.ai/api/v1"

fetch(`${baseURL}/trades`)
.then(res =>res.json())
.then(data =>{
    console.log(data)
    let trades = data.data.trades
    let tradeSelect = document.getElementById('trade-select')
        trades.forEach(tradeObj =>{
            let tradeName= tradeObj.trade
            let option = document.createElement('option')
            option.innerText = tradeName
            option.value = tradeName
            tradeSelect.appendChild(option)
            
        })
    
})
.catch(err => console.log(err))

document.getElementById('trade-select').addEventListener('change',getServices)


function getServices(){
    let trade = document.getElementById('trade-select').value
fetch(`${baseURL}/costs?trade=${trade}`)
.then(res => res.json())
.then(data => {
    console.log(data)
    let services = data.data.items
    let serviceSelect = document.getElementById('service-select')
    serviceSelect.innerHTML =''
    services.forEach(itemObj =>{
        let service = itemObj.description
        let option = document.createElement('option')
        option.innerText = service
        option.value = service
        serviceSelect.appendChild(option)
    })
})
.catch(err => console.log(err))

}
document.getElementById('zipcode-btn').addEventListener('click',getEstimate)

function getEstimate(){
let trade = document.getElementById('trade-select').value
let service = document.getElementById('service-select').value
let zip = document.getElementById('zipcode-input').value

fetch(`${baseURL}/costs?trade=${trade}&zip=${zip}`)
.then( res=> res.json())
.then(data =>{
    let services= data.data.items
    let selectedService = services.find(itemObj =>{
        return itemObj.description ===service
    })
let results = document.getElementById('estimate-results')
results.innerHTML = ''
let estimate = document.createElement('p')
estimate.innerText = `Average cost: $${selectedService.typical} / ${selectedService.unit}`
results.appendChild(estimate)
})
}