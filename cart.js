var cart = {
  // (A) PROPIEDADES
  hPdt : null,      // lista de productos html
  hItems : null,    // cantidad actual en el carrito html
  items : {},       // items en el carrito
  iURL : "images/", // carpeta de imgs de productos

  // (B) CARRITO LOCALSTORE
  // (B1) GUARDAR CARRITO ACTUAL EN LOCALSTORAGE
  save : () => {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) CARGAR CARRITO DESDE LOCALSTORAGE
  load : () => {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // (B3) BORRAR TODO EL CARRITO
  nuke : () => { if (Swal.fire({
    title: "Vaciar el carrito",
    text: "¿Esta seguro? Eliminará todos elementos del carrito.",
    icon: "error",
    confirmButtonText: ' ACEPTAR '
  })
  ) {
    cart.items = {};
    localStorage.removeItem("cart");
    cart.list();
  }},

  // (C) INICIALIZAR
  init : () => {
    // (C1) TOMAR ELEMENTOS HTML
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) LISTAR PRODUCTOS
    cart.hPdt.innerHTML = "";
    let template = document.getElementById("template-product").content,
        p, item, part;
    for (let id in products) {
      p = products[id];
      item = template.cloneNode(true);
      item.querySelector(".p-img").src = cart.iURL + p.img;
      item.querySelector(".p-name").textContent = p.name;
      item.querySelector(".p-desc").textContent = p.desc;
      item.querySelector(".p-price").textContent = "$" + p.price.toFixed(2);
      item.querySelector(".p-add").onclick = () => { cart.add(id); };
      cart.hPdt.appendChild(item);
    }

    // (C3) CARGAR CARRITO DE LA SESION ANTERIOR
    cart.load();

    // (C4) LISTAR ITEMS ACTUALES EN EL CARRITO
    cart.list();
  },

  // (D) LISTAR ITEMS ACTUALES EN EL HTML
  list : () => {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt, empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // (D2) CARRO VACIO
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CARRO NO TIENE NADA - LISTAR ITEMS
    else {
      let template = document.getElementById("template-cart").content,
          p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // (D3-1) PRODUCTO ITEMS
        p = products[id];
        item = template.cloneNode(true);
        item.querySelector(".c-del").onclick = () => { cart.remove(id); };
        item.querySelector(".c-name").textContent = p.name;
        item.querySelector(".c-qty").value = cart.items[id];
        item.querySelector(".c-qty").onchange = function () { cart.change(id, this.value); };
        cart.hItems.appendChild(item);

        // (D3-2) SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // (D3-3) MONTO TOTAL
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: $" + total;
      cart.hItems.appendChild(item);

      // (D3-4) BORRAR Y CHECKOUT
      item = document.getElementById("template-cart-checkout").content.cloneNode(true);
      cart.hItems.appendChild(item);
    }
  },

  // (E) AÑADIR ITEM AL CARRITO
  add : (id) => {
    if (cart.items[id] == undefined) { cart.items[id] = 1; }
    else { cart.items[id]++; }
    cart.save(); cart.list();
  },

  // (F) CAMBIAR CANTIDAD
  change : (pid, qty) => {
    // (F1) QUITAR ITEM
    if (qty <= 0) {
      delete cart.items[pid];
      cart.save(); cart.list();
    }

    // (F2) RECARGAR TOTAL SOLO
    else {
      cart.items[pid] = qty;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: $" + total;
      }
    }
  },

  // (G) QUITAR ITEM DEL CARRITO
  remove : (id) => {
    delete cart.items[id];
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
  checkout : () => {
      // LISTADO DE UPCOMING FEATURES
    // ENVIAR DATA AL SERVER
    // CHEQUEOS
    // MANDAR EMAIL
    // GUARDAR EN DATABASE
    // PAGO
    Swal.fire({
      title: "Correcto!",
      text: "¿Esta seguro? pasaremos a la sección de pago.",
      icon: "success",
      confirmButtonText: ' OK '
    })

    /*
    var data = new FormData();
    data.append("cart", JSON.stringify(cart.items));
    data.append("products", JSON.stringify(products));

    fetch("SERVER-SCRIPT", { method:"POST", body:data })
    .then(res=>res.text()).then((res) => {
      console.log(res);
    })
    .catch((err) => { console.error(err); });
    */
  }
};
window.addEventListener("DOMContentLoaded", cart.init);
