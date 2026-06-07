// Dummy Data for Products using Local images downloaded to the workspace
const products = [
    {
        id: 1,
        title: "Premium Leather iPad Cover",
        price: "45,000",
        category: "Covers",
        images: [
            "./images/cover1.jpg",
            "./images/cover2.jpg"
        ],
        description: "Protect your iPad with our premium leather cover. Features auto wake/sleep functionality, multiple viewing angles, and a dedicated slot for your Apple Pencil. The soft microfiber interior prevents scratches, while the durable exterior offers drop protection."
    },
    {
        id: 2,
        title: "Magnetic Smart Folio",
        price: "35,000",
        category: "Covers",
        images: [
            "./images/folio2.jpg",
            "./images/cover1.jpg"
        ],
        description: "A lightweight and sleek smart folio that attaches magnetically to your iPad. Offers front and back protection while maintaining the device's slim profile."
    },
    {
        id: 3,
        title: "Pro Stylus Pencil",
        price: "30,000",
        category: "Pencils",
        images: [
            "./images/pencil2.jpg",
            "./images/tips2.jpg"
        ],
        description: "Experience pixel-perfect precision and industry-leading low latency. Perfect for drawing, sketching, coloring, taking notes, and marking up PDFs. Features tilt sensitivity and palm rejection."
    },
    {
        id: 4,
        title: "Paper-Like Screen Protector",
        price: "15,000",
        category: "Screen Protectors",
        images: [
            "./images/cover1.jpg",
            "./images/cover2.jpg"
        ],
        description: "Transform your iPad screen into a digital canvas. This screen protector mimics the friction and resistance of paper, making drawing and writing with your stylus feel incredibly natural."
    },
    {
        id: 5,
        title: "Tempered Glass Protector",
        price: "12,000",
        category: "Screen Protectors",
        images: [
            "./images/glass2.jpg",
            "./images/folio2.jpg"
        ],
        description: "9H hardness tempered glass offering ultimate protection against scratches, drops, and impacts. Features an oleophobic coating to reduce fingerprints and smudges."
    },
    {
        id: 6,
        title: "Magic Keyboard Case",
        price: "120,000",
        category: "Keyboards",
        images: [
            "./images/keyboard2.jpg",
            "./images/cover2.jpg"
        ],
        description: "The ultimate typing experience for iPad. Features a floating cantilever design, backlit keys, and a built-in trackpad for precision control and multi-touch gestures."
    },
    {
        id: 7,
        title: "Replacement Pencil Tips (4-Pack)",
        price: "10,000",
        category: "iPad Pencil Tips",
        images: [
            "./images/tips2.jpg",
            "./images/pencil2.jpg"
        ],
        description: "Keep your stylus performing at its best with these durable replacement tips. Easy to install and designed to provide smooth, consistent lines."
    }
];

let currentProduct = null;
let currentImageIndex = 0;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    
    // Category Filtering
    const categoryBadges = document.querySelectorAll('.category-badge');
    categoryBadges.forEach(badge => {
        badge.addEventListener('click', (e) => {
            // Update active state
            categoryBadges.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter products
            const selectedCategory = e.target.innerText;
            if (selectedCategory === 'All') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === selectedCategory);
                renderProducts(filtered);
            }
        });
    });
});

// Render Products Grid
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No products found in this category.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductDetails(product.id);
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.title} Image">
            </div>
            <div class="product-info-card">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price} IQD</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Navigation / View Management
function showView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    document.getElementById(`view-${viewName}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open Product Details
function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    currentImageIndex = 0;
    
    // Populate details
    updateCarousel();
    document.getElementById('detail-title').innerText = product.title;
    document.getElementById('detail-price').innerText = `${product.price} IQD`;
    document.getElementById('detail-description').innerText = product.description;
    
    // Switch view
    showView('product');
}

// Carousel Logic
function updateCarousel() {
    if (!currentProduct) return;
    
    const imgEl = document.getElementById('detail-image');
    imgEl.style.opacity = 0; // fade out effect
    
    setTimeout(() => {
        imgEl.src = currentProduct.images[currentImageIndex];
        imgEl.alt = `${currentProduct.title} - Image ${currentImageIndex + 1}`;
        imgEl.style.opacity = 1;
    }, 150);
    
    // Update indicators
    const indicatorsContainer = document.getElementById('carousel-indicators');
    indicatorsContainer.innerHTML = '';
    
    currentProduct.images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `indicator ${idx === currentImageIndex ? 'active' : ''}`;
        dot.onclick = () => {
            currentImageIndex = idx;
            updateCarousel();
        };
        indicatorsContainer.appendChild(dot);
    });
}

function prevImage() {
    if (!currentProduct) return;
    currentImageIndex = (currentImageIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
    updateCarousel();
}

function nextImage() {
    if (!currentProduct) return;
    currentImageIndex = (currentImageIndex + 1) % currentProduct.images.length;
    updateCarousel();
}
