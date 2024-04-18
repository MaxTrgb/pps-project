


function loadRivewByProductID(productId) {
    document.getElementById('reviewList').innerHTML = '';
    fetch(`https://shop-api-417814.lm.r.appspot.com/api/v1/review?filter=product:${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayProductReview(data);
        })
        .catch(error => console.error('error:', error));
}

function displayProductReview(reviews) {
    let reviewList = document.getElementById('reviewList');

    reviews.forEach(e => {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < e.rating) {
                starsHtml += '<span><i class="active icon-star"></i></span> ';
            } else {
                starsHtml += '<span><i class="icon-star"></i></span> ';
            }
        }
        let reviewItem = document.createElement('div');
        reviewItem.className = 'review__card';

        reviewItem.innerHTML = `
            <p class="review__card_reviewer">
                ${e.reviewer}
            </p>
            <div class="review__card_rating">
                ${starsHtml}
            </div>
            <p class="review__card_description">
                ${e.description}
            </p>
        `;

        reviewList.appendChild(reviewItem);
    });
}

function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const review = document.getElementById('review').value;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const formData = {
        reviewer: name,
        rating: rating,
        description: review,
        productId: productId
    };

    sendReview(formData)
        .then(handleSuccess)
        .catch(handleError);
}

function sendReview(formData) {
    return fetch('https://shop-api-417814.lm.r.appspot.com//api/v1/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

function handleSuccess(data) {
    alert('Review was sent');
    const reviewForm = document.querySelector('.review__form');
    reviewForm.reset();
    window.location.reload();
}

function handleError(error) {
    console.error('Error:', error);
    alert('Something went wrong');
}
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        loadRivewByProductID(productId);
    } else {
        console.error('id not found');
    }

    const reviewForm = document.querySelector('.review__form');
    
    reviewForm.addEventListener('submit', handleSubmit);
});