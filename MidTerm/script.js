$(document).ready(function () {

  // 🔹 AJAX CALL
  $.ajax({
    url: "https://fakestoreapi.com/products?limit=4",
    method: "GET",
    success: function (data) {

      $("#featured-deals-container").empty();

      data.forEach(product => {

        let card = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>

            <button class="quick-view-btn"
              data-title="${product.title}"
              data-description="${product.description}"
              data-rating="${product.rating.rate}"
              data-image="${product.image}"
              data-price="$${product.price}">
              Quick View
            </button>
          </div>
        `;

        $("#featured-deals-container").append(card);
      });
    },
    error: function () {
      $("#featured-deals-container").html("<p>Failed to load products</p>");
    }
  });


  // 🔹 QUICK VIEW MODAL
  $(document).on("click", ".quick-view-btn", function () {

    $("#modal-title").text($(this).data("title"));
    $("#modal-description").text($(this).data("description"));
    $("#modal-rating").text("Rating: " + $(this).data("rating"));
    $("#modal-image").attr("src", $(this).data("image"));
    $("#modal-price").text($(this).data("price"));

    $("#deal-modal").fadeIn();
  });


  // 🔹 CLOSE MODAL
  $("#close-modal").click(function () {
    $("#deal-modal").fadeOut();
  });

  $(window).click(function (e) {
    if ($(e.target).is("#deal-modal")) {
      $("#deal-modal").fadeOut();
    }
  });

});