document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        loadCategory(category);
    } else {
        loadCategory('All');
        console.error('category not found');
    }
});

function loadCategory(category) {
    document.getElementById('productsGrid').innerHTML = '';
    
    document.getElementById('categoryTitle').textContent = `${category}`;

    fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/product?filter=category:${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => console.error('error:', error));
}

function displayProducts(products) {
    let grid = document.getElementById('productsGrid');

    products.forEach(e => {
        let productItem = document.createElement('div');
        productItem.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        
        let imageUrl = `data:${e.images[0].fileType};base64,${e.images[0].fileData}`;
        let price = formatPrice(e.price);
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < e.rating) {
                starsHtml += '<span><i class="active icon-star"></i></span> ';
            } else {
                starsHtml += '<span><i class="icon-star"></i></span> ';
            }
        }
        productItem.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${e.name}">
                <div class="card-body">
                    <h5 class="card-title">
                        ${e.name}
                    </h5>
                    <div class="stars">
                        ${starsHtml}
                    </div>
                    <p class="card-text">
                        ${price}
                    </p>
                    <a href="/../pages/product.html?id=${e.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        grid.appendChild(productItem);
    });
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₴';
}