import { menuArray } from './data.js'

const form = document.getElementById('payment-form')

document.addEventListener('click', function(e){
    if (e.target.classList.contains('add-button')){
        const productName = e.target.parentElement.querySelector('h3').textContent
        const product = menuArray.find(item => item.name === productName)
        
        const existingItem = cart.find(item => item.id === product.id)
        
        if(existingItem){
            existingItem.quantity++
        } else {
            cart.push({
                id: product.id,
                name: productName,
                price: product.price,
                quantity: 1
            })
        }
        
        render()
        
    } else if (e.target.classList.contains('remove')){
        const idToRemove = Number(e.target.dataset.id)
        const item = cart.find(item => item.id === idToRemove)
        if (item){
            item.quantity--
            if(item.quantity === 0){
                cart.splice(cart.indexOf(item), 1)
            }
            render()
        }
    }
})

document.addEventListener('click', function(e){
    if(e.target.classList.contains('complete-btn')){
        document.getElementById('payment-modal').classList.remove('hidden')
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    
    const name = form.name.value.trim()
    const card = form.card.value.trim()
    const cvv = form.cvv.value.trim()
    
    if(!name || !card || !cvv){
        alert('please complete all fields')
        return
    }
    
    document.getElementById('payment-modal').classList.add('hidden')
    
    cart = []
    render()
    
    const thankyou = document.getElementById('thank-you')
    thankyou.textContent = `Thanks, ${name}! Your order is on its way!`
    thankyou.classList.remove('hidden') 
    
    setTimeout(() => {
        thankyou.classList.add('hidden')
    }, 10000)
})

function getFeedHtml(){
    
    let feedHtml = ''
    
    menuArray.forEach(function(product){
         feedHtml += `
            <div class="product">
                    <img class="inner-product" src="./img/${product.image}"> 
                    <div class="menu-info">
                        <h3>${product.name}</h3>
                        <p>${product.ingredients}</p>
                        <span class="product-price">$${product.price}</span>
                    </div>
                <button class="add-button" id="add-button">+</button>
            </div> 
         `
    })
    
    return feedHtml
    
}

let cart = [
    {
        id: 0,
        name: 'pizza',
        price: 14,
        quantity: 1
    }
]

function getOrderHtml(){
    
    if(cart.length === 0) return ''
    
    let itemsHtml = ''
    let totalPrice = 0
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity
        totalPrice += itemTotal
        
        itemsHtml +=`
        <div class="order-item">
            <p>${item.name} x${item.quantity} <span class="remove" data-id="${item.id}">remove</span></p>
            <p class="price">$${itemTotal}</p>
        </div>
        `
        totalPrice += item.price
    })    
    
    return `
    <h2 class="order-title">Your Order</h2>
    <div class="order-items">
        ${itemsHtml}
    </div>
    <div class="order-total">
        <p>Total price:</p>
        <p class="price">$${totalPrice}</p>
    </div>
    <button class="complete-btn">Complete Order</button>
    `   
}



function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    document.getElementById('order').innerHTML = getOrderHtml()
}

render()

