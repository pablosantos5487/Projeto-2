/* ===================================================
   SABORES DA LU - JAVASCRIPT
   Shopping Cart, Navigation, UI Interactions
=================================================== */

// ===================== CART STATE =====================
let cart = [];
let productIdCounter = 0;

// ===================== NAVIGATION =====================
function navigateTo(section) {
    // Update hero visibility
    const hero = document.querySelector('.hero');
    const featuresStrip = document.querySelector('.features-strip');
    const allSections = document.querySelectorAll('.section');

    // Hide all dynamic sections
    allSections.forEach(s => {
        s.style.display = 'none';
        s.style.animation = '';
    });

    if (section === 'home') {
        hero.style.display = 'flex';
        featuresStrip.style.display = 'block';
    } else {
        hero.style.display = 'none';
        featuresStrip.style.display = 'none';

        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.style.animation = 'fadeInUp 0.5s ease';
        }
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLinks = document.querySelectorAll(`.nav-link[onclick*="${section}"]`);
    activeLinks.forEach(l => l.classList.add('active'));

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================== MOBILE MENU =====================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
}

// ===================== CART FUNCTIONS =====================
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function addToCart(name, price, btn) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: ++productIdCounter,
            name: name,
            price: price,
            qty: 1,
            emoji: getProductEmoji(name)
        });
    }

    updateCartDisplay();
    showToast(`🛒 ${name} adicionado ao carrinho!`);

    // Button animation
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        btn.classList.add('added');
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('added');
            btn.disabled = false;
        }, 1500);
    }
}

function getProductEmoji(name) {
    const emojis = {
        'Pão': '🍞', 'Bolo': '🎂', 'Cinnamon': '🌀',
        'Queijo': '🧀', 'Cenoura': '🥕', 'Chocolate': '🍫',
        'Kit': '🎁', 'Mini': '🌀', 'Aniversário': '🎂',
        'Mel': '🍯', 'Combo': '🎉', 'Café': '☕'
    };
    for (const [key, emoji] of Object.entries(emojis)) {
        if (name.includes(key)) return emoji;
    }
    return '🍰';
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'flex';

    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';

        // Remove all cart item elements
        const items = cartItems.querySelectorAll('.cart-item');
        items.forEach(item => item.remove());
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';

        // Rebuild cart items
        const items = cartItems.querySelectorAll('.cart-item');
        items.forEach(item => item.remove());

        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.setAttribute('data-id', item.id);
            el.innerHTML = `
                <div class="cart-item-emoji">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remover">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(el);
        });

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function checkout() {
    if (cart.length === 0) return;

    let message = '🛒 *Olá, Sabores da Lu! Quero fazer um pedido:*\n\n';
    cart.forEach(item => {
        message += `• ${item.emoji} *${item.name}* — ${item.qty}x — R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    message += '\n\nPor favor, me ajude a confirmar o pedido! 😊';

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5551999600602?text=${encoded}`, '_blank');

    // Clear cart after checkout
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        toggleCart();
        showToast('✅ Pedido enviado para o WhatsApp!');
    }, 500);
}

// ===================== CATEGORY FILTER =====================
function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'todos' && btn.textContent.includes('Todos'))) {
            btn.classList.add('active');
        }
    });

    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'todos' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.3s ease ${index * 0.05}s both`;
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===================== CONTACT FORM / SEND ORDER =====================
function sendOrder(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const product = document.getElementById('productType').value;
    const date = document.getElementById('deliveryDate').value;
    const observations = document.getElementById('observations').value.trim();

    if (!name || !phone || !product || !date) {
        showToast('⚠️ Preencha todos os campos obrigatórios!');
        return;
    }

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');

    let message = `🌹 *Olá, Sabores da Lu! Quero fazer uma encomenda:*\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `📱 *WhatsApp:* ${phone}\n`;
    message += `🛍️ *Produto:* ${product}\n`;
    message += `📅 *Data de Entrega:* ${formattedDate}\n`;
    if (observations) {
        message += `📝 *Observações:* ${observations}\n`;
    }
    message += `\nAguardo o retorno! 😊`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5551999600602?text=${encoded}`, '_blank');

    showToast('✅ Pedido enviado via WhatsApp!');
    event.target.reset();
}

// ===================== TOAST NOTIFICATION =====================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================== SCROLL EFFECTS =====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===================== INTERSECTION OBSERVER (ANIMATIONS) =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements when sections become visible
function observeElements() {
    const elements = document.querySelectorAll('.product-card, .feedback-card, .contact-card, .promo-card, .feature-item');
    elements.forEach(el => observer.observe(el));
}

// ===================== DATE INPUT MIN DATE =====================
function setMinDate() {
    const dateInput = document.getElementById('deliveryDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart display
    updateCartDisplay();

    // Set minimum date for delivery
    setMinDate();

    // Observer for contact section date field
    const contactObserver = new MutationObserver(() => {
        setMinDate();
        observeElements();
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        contactObserver.observe(section, { attributes: true, attributeFilter: ['style'] });
    });

    observeElements();

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // Keyboard navigation for cart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('cartSidebar');
            if (sidebar.classList.contains('open')) {
                toggleCart();
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add sparkle effect to logo
    const logo = document.querySelector('.logo-circle');
    if (logo) {
        logo.addEventListener('click', () => {
            navigateTo('home');
        });
    }

    console.log('🍞 Sabores da Lu - Site carregado com sucesso!');
    console.log('❤️ Feito com muito amor!');
});

// ===================== HERO SECTION SETUP =====================
// Make sure hero section is properly shown on page load
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    const featuresStrip = document.querySelector('.features-strip');
    if (hero) hero.style.display = 'flex';
    if (featuresStrip) featuresStrip.style.display = 'block';

    // Hide all content sections initially
    document.querySelectorAll('.section').forEach(s => {
        s.style.display = 'none';
    });
});
