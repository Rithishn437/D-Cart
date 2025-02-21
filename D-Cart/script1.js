document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const productGrid = document.getElementById("product-grid");
    const toggleFormBtn = document.getElementById("toggle-form-btn");
    const productSection = document.getElementById("product-section");

    // Toggle form visibility
    toggleFormBtn.addEventListener("click", function () {
        productSection.style.display = productSection.style.display === "none" ? "block" : "none";
    });

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get input 
        const productNameInput = document.getElementById("product-name");
        const productPriceInput = document.getElementById("product-price");
        const productDescriptionInput = document.getElementById("product-description");
        const productLinkInput = document.getElementById("product-link");
        const productImageInput = document.getElementById("product-image");

        const productName = productNameInput.value.trim();
        const productPrice = productPriceInput.value.trim();
        const productDescription = productDescriptionInput.value.trim();
        const productLink = productLinkInput.value.trim();
        const productImage = productImageInput.files[0];

        if (productName === "" || productPrice === "" || productDescription === "" || productLink === "" || !productImage) {
            alert("Please fill in all fields and upload an image.");
            return;
        }

        // Read image file
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;

            // Create a product card
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-4", "mb-4");
            productCard.innerHTML = `
                <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="${productName}">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text"><strong>Price:</strong> ${productPrice}</p>
                        <p class="card-text"><strong>Description:</strong> ${productDescription}</p>
                        <a href="${productLink}" class="btn btn-primary" target="_blank">View Product</a>
                    </div>
                </div>
            `;

            // Append to product grid
            productGrid.appendChild(productCard);
        };

        reader.readAsDataURL(productImage);

        // Clear input 
        productNameInput.value = "";
        productPriceInput.value = "";
        productDescriptionInput.value = "";
        productLinkInput.value = "";
        productImageInput.value = "";
    });
});
