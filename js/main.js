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
        description: 'Bill payment refers to the process of settling financial obligations for various services, like electricity, water, internet, mobile, and more. Our secure platform makes it easy to manage and pay all your bills in one place.',
        image: 'images/Products/bill payments.avif'
    },
    {
        id: 2,
        title: 'Cashback Rewards',
        description: 'We love rewarding your smart choices! Get exclusive cash back when you buy our fresh, organic fruits, vegetables, clothes, and groceries. All our products are carefully picked with care for the planet, ensuring the best quality and a smarter shopping experience. With every purchase, you earn cash back and support a healthier, eco-friendly lifestyle. It\'s a win for you!',
        image: 'images/Products/cashback.avif'
    },
    {
        id: 3,
        title: 'Online Booking',
        description: 'Ticket booking involves selecting travel dates, destination, and potentially preferred seating or class, along with entering passenger details and payment information. Online ticket booking platform like us allow for convenient reservations to the passengers.',
        image: 'images/Products/booking.avif'
    },
    {
        id: 4,
        title: 'Grocery Shopping',
        description: 'We offer a wide selection of fresh, healthy groceries to support your well-being. Our collection includes nutritious essentials sourced to improve your health and enhance your everyday meals, making it easier to live a balanced lifestyle.',
        image: 'images/Products/grocery.avif'
    },
    {
        id: 5,
        title: 'Organic Products',
        description: 'We promote healthy living by offering fresh, organic fruits that are grown with care and sustainability. Our organic produce is a result of dedication to quality and nature, ensuring you get the best, nutrient-packed fruits that support a healthier lifestyle.',
        image: 'images/Products/organic.avif'
    },
    {
        id: 6,
        title: 'Fashion Collection',
        description: 'We offer stylish, comfortable clothing that empowers self-expression and confidence. Our collection is designed to help you make choices that reflect your personality, all while providing quality and affordability for every individual.',
        image: 'images/Products/clothing.avif'
    }
];

function initializeProducts() {
    const productsContainer = document.querySelector('#products .grid');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => `
        <a href="pages/${getProductPageUrl(product.title)}" class="group relative overflow-hidden rounded-lg shadow-lg bg-white transform transition duration-300 hover:-translate-y-1">
            <div class="h-64 lg:h-[350px]">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 bg-white">
                <h3 class="text-xl font-bold mb-2">${product.title}</h3>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 p-8 text-white">
                    <h3 class="text-2xl font-bold mb-4">${product.title}</h3>
                    <p class="text-base leading-relaxed">${product.description}</p>
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