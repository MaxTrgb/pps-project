document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    let page = urlParams.get('page');
    if (!page) {
        page = 1;
    }

    if (category) {
        loadCategory(category, page);
        loadPagination(category, page);
    } else {
        loadCategory('All', page);
        loadPagination('All', page);
    }


});

function loadCategory(category, page) {


    document.getElementById('categoryTitle').textContent = `${category}`;

    fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/product?page=${page}&size=12&filter=category:${category}`, {
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
    document.getElementById('productsGrid').innerHTML = '';

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


function loadPagination(category, page) {
    console.log(category, page);
    fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/product/page-count?page=${page}&size=12&filter=category:${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .then(data => {
            displayPagination(category, data, page);
        });
}

function displayPagination(category, pagesCount, page) {
    document.getElementById('paginationNav').innerHTML = '';
    const pagination = document.getElementById('paginationNav');

    let paginationUl = document.createElement('ul');
    paginationUl.className = 'pagination';

    let pageLinkHtml = '';
    if(page > 1) {
        pageLinkHtml = `
            <li class="page-item">
                <a class="page-link" href="/../pages/products_gtid.html?page=${page - 1}&category=${category}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `;
    };
    console.log(pagesCount);
    for (let i = 1; i <= pagesCount; i++) {
        if (i == page) {
            pageLinkHtml += `
                <li class="page-item active">
                    <a class="page-link">
                        ${i}
                    </a>
                </li>
            `;
        }
        else {
            pageLinkHtml += `
                <li class="page-item">
                    <a class="page-link" href="/../pages/products_gtid.html?page=${i}&category=${category}">
                        ${i}
                    </a>
                </li>
            `;
        }
    };
    if(page < pagesCount) {
        let nextPage = - page - 1;
        nextPage = nextPage * -1;
        pageLinkHtml += `
            <li class="page-item">
                <a class="page-link" href="/../pages/products_gtid.html?page=${nextPage}&category=${category}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `;
    }
    
    paginationUl.innerHTML = pageLinkHtml;
    pagination.appendChild(paginationUl);
}
