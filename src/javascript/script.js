// 🛒 CARRINHO - Onde guardamos os produtos que o cliente escolheu
let cart = []; 

// ➕ FUNÇÃO: Adicionar produto ao carrinho
function addToCart(id,name,price) {
    // Verifica se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Se já existe, aumenta a quantidade
        existingItem.quantity++;
    } else {
        // Se não existe, adiciona novo item
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
        });
    }

    // Atualiza a tela
    uptadeCartCount();

    // Mostra mensagem de sucesso
    alert(`${name} adicionado ao carrinho! 🎉`);
}

// 🔢 FUNÇÃO: Atualizar o número no botão do carrinho
function uptadeCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// 👁️ FUNÇÃO: Abrir o carrinho
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'flex';
    displayCartItems();
}

// ❌ FUNÇÃO: Fechar o carrinho
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// 📋 FUNÇÃO: Mostrar itens dentro do carrinho
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Seu carrinho está vazio 😢</div>';
        document.getElementById('cartTotal').textContent = 'Total: R$ 0,00';
        return;
    }

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem =`
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${itemTotal.toFixed(2)}
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
        </div>
        `
        cartItemsDiv.innerHTML += cartItem;
    });

    document.getElementById("cartTotal").textContent = `Total: R$ ${total.toFixed(2)}`
}

 // 🗑️ FUNÇÃO: Remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    uptadeCartCount();
    displayCartItems();
}

// ✅ FUNÇÃO: Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity),0);
    alert(`Compra finalizada! 🎉\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela preferência!`);

// Limpa o carrinho
cart = [];
uptadeCartCount();
closeCart();
}

// ⏰ FUNÇÃO: Mostrar modal de promoções após 5 segundos
function showPromoModal() {
    // Verifica se o usuário já viu o modal antes
    const hasSeenPromo = localStorage.getItem("hasSeenPromo")

    if (!hasSeenPromo) {
        setTimeout(() => {
            document.getElementById("promoModal").style.display = "block"
        }, 5000) // 5000 = 5 segundos
    }else {
    console.log("[v0] Modal não vai aparecer porque usuário já viu antes")
    console.log("[v0] Para ver o modal novamente, digite no console: localStorage.removeItem('hasSeenPromo')")
    }
}

// ❌ FUNÇÃO: Fechar modal de promoções
function closePromoModal() {
    document.getElementById("promoModal").style.display = "none"
    // Salva que o usuário já viu o modal
    localStorage.setItem("hasSeenPromo", "true")
}

// 📧 FUNÇÃO: Enviar email para promoções
function submitPromoEmail(event) {
    event.preventDefault() // Impede o formulário de recarregar a página

    const name = document.getElementById("promoName").value
    const email = document.getElementById("promoEmail").value

// Aqui você pode enviar para um servidor real
// Por enquanto, vamos apenas mostrar uma mensagem
alert(`Obrigado, ${name}! 🎉\n\nSeu email ${email} foi cadastrado!\nVocê receberá nossas melhores promoções!`)

 // Fecha o modal
closePromoModal()

// Limpa o formulário
document.getElementById("promoName").value = ""
document.getElementById("promoEmail").value = ""
}

// 🚀 INICIA A LOJA quando a página carrega
showPromoModal() // Inicia o timer do modal de promoções
