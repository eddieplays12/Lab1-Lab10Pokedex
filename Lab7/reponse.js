var inventoryManager = {
  inventory: [
    { id: 1, name: "Wireless Mouse", price: 25.0, stock: 10 },
    { id: 2, name: "Keyboard", price: 45.0, stock: 0 },
    { id: 3, name: "Galax Monitor", price: 50000.0, stock: 20 },
    { id: 4, name: "RTX 9090 1/1", price: 1000000.0, stock: 1 },
    { id: 5, name: "Gaming Speakers", price: 12345.0, stock: 123 },
  ],

  pc: 5,

  renderTable: function () {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    for (var i = 0; i < this.inventory.length; i++) {
      var p = this.inventory[i];
      var stockText = p.stock;

      if (p.stock == 0) {
        stockText = "Out of Stock";
      }

      var row = "<tr>";
      row = row + "<td>" + p.id + "</td>";
      row = row + "<td>" + p.name + "</td>";
      row = row + "<td>$" + p.price.toFixed(2) + "</td>";
      row = row + "<td>" + stockText + "</td>";
      row = row + "</tr>";

      tableBody.innerHTML = tableBody.innerHTML + row;
    }
  },

  addProduct: function (name, price, stock) {
    this.pc = this.pc + 1;

    var newProduct = {
      id: this.pc,
      name: name,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    this.inventory.push(newProduct);

    this.renderTable();
  },
};

var form = document.getElementById("productForm");

inventoryManager.renderTable();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("productName").value;
  var price = document.getElementById("productPrice").value;
  var stock = document.getElementById("productStock").value;

  if (name == "" || price == "" || stock == "") {
    alert("Nayunam Boss kurang Pay.");
    return;
  }

  inventoryManager.addProduct(name, price, stock);
});
