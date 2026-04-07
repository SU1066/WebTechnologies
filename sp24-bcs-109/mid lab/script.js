$(document).ready(function () {

    $.ajax({
        url: "https://fakestoreapi.com/products?limit=4",
        method: "GET",

        success: function (data) {

            // clear container
            $("#product-container").empty();

            // loop products
            data.forEach(function (product) {

                let card = `
                        <div class="fd-card">
                            <img src="${product.image}" class="fd-img">

                            <h4 class="fd-title">
                                ${product.title.substring(0, 25)}...
                            </h4>

                            <p class="fd-price">$${product.price}</p>

                            <button class="fd-btn"
                                onclick="showModal('${product.title}', '${product.description}', ${product.rating.rate})">
                                Quick View
                            </button>
                        </div>
                    `;

                $("#product-container").append(card);
            });
        },

        error: function () {
            alert("Failed to load products");
        }

    });

});
function showModal(title, desc, rating) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc;
    document.getElementById("modal-rating").innerText = "Rating: " + rating;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}