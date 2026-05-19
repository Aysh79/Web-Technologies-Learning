function formatCurrency(value) {
  return "Rs. " + Number(value || 0).toLocaleString();
}

function loadSales() {
  $.get("/api/v1/sales-data", function(data) {
    $("#orders").text(data.totalOrders || 0);
    $("#product").text(data.topProduct || "N/A");

    if ($("#revenue").length) {
      $("#revenue").text(formatCurrency(data.totalRevenue));
    }
  });
}

$(document).ready(function () {
  loadSales();
  setInterval(loadSales, 10000);
});
