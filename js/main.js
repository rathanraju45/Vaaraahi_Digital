document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    initializeProducts();
});

function updateNavigation() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('a[href="pages/login.html"]');
    const registerBtn = document.querySelector('a[href="pages/register.html"]');

    if (currentUser) {
        loginBtn.textContent = 'Logout';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
        registerBtn.style.display = 'none';
    }
}

const products = [
    {
        id: 1,
        title: 'Bill Payments',
        description: 'Simplify your bill payments with our secure platform. Pay electricity, water, internet, mobile, and other bills all in one place. Experience hassle-free transactions with instant confirmation.',
        image: 'images/Products/bill payments.avif'
    },
    {
        id: 2,
        title: 'Cashback Rewards',
        description: 'Earn exclusive cashback on all your purchases. Get rewarded for shopping groceries, organic products, and fashion items. Make your shopping experience more rewarding with instant cashback credits.',
        image: 'images/Products/cashback.avif'
    },
    {
        id: 3,
        title: 'Online Booking',
        description: 'Book travel tickets and accommodations with ease. Access real-time availability and instant confirmations. Enjoy a seamless booking experience with secure payments and 24/7 support.',
        image: 'images/Products/booking.avif'
    },
    {
        id: 4,
        title: 'Grocery Shopping',
        description: 'Shop from our wide selection of fresh groceries. Get quality products delivered to your doorstep. Enjoy convenient shopping with competitive prices and regular deals.',
        image: 'images/Products/grocery.avif'
    },
    {
        id: 5,
        title: 'Organic Products',
        description: 'Experience the goodness of certified organic products. Choose from our selection of fresh fruits, vegetables, and staples. Support sustainable farming while maintaining a healthy lifestyle.',
        image: 'images/Products/organic.avif'
    },
    {
        id: 6,
        title: 'Fashion Collection',
        description: 'Discover trendy and comfortable clothing for every occasion. Find styles that reflect your unique personality. Shop quality fashion at affordable prices with our curated collection.',
        image: 'images/Products/clothing.avif'
    }
];

function initializeProducts() {
    const productsContainer = document.querySelector('#products .grid');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => `
        <a href="pages/${getProductPageUrl(product.title)}" class="group relative overflow-hidden rounded-lg shadow-lg bg-white/5 backdrop-blur-sm transform transition duration-300 hover:-translate-y-1 hover:bg-white/10">
            <div class="h-64 lg:h-[350px]">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 bg-transparent">
                <h3 class="text-xl font-bold mb-2 text-gray-900">${product.title}</h3>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 p-8 text-white">
                    <h3 class="text-2xl font-bold mb-4">${product.title}</h3>
                    <p class="text-base leading-relaxed product-description">${product.description}</p>
                </div>
            </div>
        </a>
    `).join('');
}

function getProductPageUrl(title) {
    const urlMap = {
        'Bill Payments': 'bill-payment.html',
        'Cashback Rewards': 'cashback.html',
        'Online Booking': 'booking.html',
        'Grocery Shopping': 'grocery.html',
        'Organic Products': 'organic.html',
        'Fashion Collection': 'fashion.html'
    };
    return urlMap[title] || '#';
}