let inventory = [
  { id: 1, name: "Wireless Mouse", price: 25.0, stock: 10 },
  { id: 2, name: "Keyboard", price: 45.0, stock: 0 },
  { id: 3, name: "Galax Monitor", price: 50000.0, stock: 20 },
  { id: 4, name: "RTX 9090 1/1", price: 1000000, stock: 1 },
  { id: 5, name: "Gaming Speakers", price: 12345.0, stock: 123 },
];

let productCount = inventory.length;

const form = document.getElementById("productForm");
const tableBody = document.getElementById("tableBody");

function renderTable() {
  tableBody.innerHTML = "";

  inventory.forEach(function (product) {
    const stockDisplay =
      product.stock === 0
        ? '<span class="out-of-stock">Out of Stock</span>'
        : product.stock;

    const row =
      "<tr>" +
      "<td>" +
      product.id +
      "</td>" +
      "<td>" +
      product.name +
      "</td>" +
      "<td>$" +
      product.price.toFixed(2) +
      "</td>" +
      "<td>" +
      stockDisplay +
      "</td>" +
      "</tr>";

    tableBody.innerHTML += row;
  });
}

renderTable();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const stock = parseInt(document.getElementById("productStock").value);

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  productCount++;

  inventory.push({
    id: productCount,
    name: name,
    price: price,
    stock: stock,
  });

  renderTable();

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";
});
