

// function loadCategory(id) {
//     document.getElementById('productContent').innerHTML = '';
    
//     document.getElementById('productTitle').textContent = `${id}`;

//     fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/product/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         displayProducts(data);
//     })
//     .catch(error => console.error('error:', error));
// }

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

// function displayProducts(product) {
//     let grid = document.getElementById('productContent');

//     product.forEach(e => {
//         let productItem = document.createElement('div');
//         productItem.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        
//         let imageUrl = `data:${e.images[0].fileType};base64,${e.images[0].fileData}`;

//         productItem.innerHTML = `
//             <div class="card">
//                 <img src="${imageUrl}" class="card-img-top" alt="${e.name}">
//                 <div class="card-body">
//                     <h5 class="card-title">${e.name}</h5>
//                     <p class="card-text">${e.price} ₴</p>
//                     <a href="/../pages/product.html?id=${e.id}" class="btn btn-primary">Details</a>
//                 </div>
//             </div>
//         `;
//         grid.appendChild(productItem);
//     });
// }

function displayProduct(product) {
    let productContent = document.getElementById('productContent');

    let imageUrl = `data:${product.images[0].fileType};base64,${product.images[0].fileData}`;

    productContent.innerHTML = `
    <img src="${imageUrl}" alt="${product.name}">
    <div class="product__content_info">
        <h1>
            ${product.name}
        </h1>
        <div class="product__content_info_stars">
            <span><i class="active icon-star"></i></span>
            <span><i class="active icon-star"></i></span>
            <span><i class="active icon-star"></i></span>
            <span><i class="active icon-star"></i></span>
            <span><i class="icon-star"></i></span>
        </div>
        <p class="product__content_info_price">
            ${product.price} ₴
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProduct(productId);
    } else {
        console.error('id not found');
    }
});