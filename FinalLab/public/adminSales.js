function loadAdminStats() {
  $.get("/api/v1/sales-data", function(data) {
    $("#orders").text(data.totalOrders || 0);
    $("#product").text(data.topProduct || "N/A");
    $("#revenue").text("Rs. " + Number(data.totalRevenue || 0).toLocaleString());
  });
}

$(document).ready(function () {
  loadAdminStats();
  setInterval(loadAdminStats, 10000);
});
