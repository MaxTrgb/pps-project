function loadProduct(productId) {
    fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/product/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayProduct(data);
    })
    .catch(error => console.error('error:', error));
}

function displayProduct(product) {
    let productContent = document.getElementById('productContent');

    let imageUrl = `data:${product.images[0].fileType};base64,${product.images[0].fileData}`;

    let price = formatPrice(product.price);
    
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < product.rating) {
            starsHtml += '<span><i class="active icon-star"></i></span> ';
        } else {
            starsHtml += '<span><i class="icon-star"></i></span> ';
        }
    }
    
    productContent.innerHTML = `
    <img src="${imageUrl}" alt="${product.name}">
    <div class="product__content_info">
        <h1>
            ${product.name}
        </h1>
        <div class="product__content_info_stars">
            ${starsHtml}
        </div>
        <p class="product__content_info_price">
            ${price}
        </p>
        <button type="button" class="btn btn-outline-secondary">Add to cart</button>
        <p class="product__content_info_description">
            ${product.description}
        </p>
    </div>
    `;

    let categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = `${product.category.name}`;
    categoryTitle.href += `?category=${product.category.name}`;
    
    let productTitle = document.getElementById('productTitle');
    productTitle.textContent = `${product.name}`;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₴';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProduct(productId);
    } else {
        console.error('id not found');
    }
});