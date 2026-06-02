(function () {
  const TAX_RATE = 0.21;
  const rows = Array.from(document.querySelectorAll("#cart-list li"));
  const subtotalEl = document.getElementById("subtotal");
  const taxesEl = document.getElementById("taxes");
  const totalEl = document.getElementById("grand-total");
  const buyButton = document.getElementById("buy-button");
  const checkoutLoading = document.getElementById("checkout-loading");

  const formatCurrency = (value) => `EUR ${value.toFixed(2)}`;

  const safeQty = (raw) => {
    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const updateTotals = () => {
    let subtotal = 0;

    rows.forEach((row) => {
      const unitPrice = Number.parseFloat(row.dataset.price || "0");
      const input = row.querySelector(".qty-input");
      const totalCell = row.querySelector(".line-total");

      if (!input || !totalCell) {
        return;
      }

      const qty = safeQty(input.value);
      input.value = String(qty);

      const lineAmount = unitPrice * qty;
      subtotal += lineAmount;
      totalCell.textContent = formatCurrency(lineAmount);
    });

    const taxes = subtotal * TAX_RATE;
    const grandTotal = subtotal + taxes;

    subtotalEl.textContent = formatCurrency(subtotal);
    taxesEl.textContent = formatCurrency(taxes);
    totalEl.textContent = formatCurrency(grandTotal);
  };

  rows.forEach((row) => {
    const input = row.querySelector(".qty-input");
    if (!input) {
      return;
    }

    input.addEventListener("input", updateTotals);
    input.addEventListener("change", updateTotals);
  });

  const purchase = () => {
    if (buyButton) {
      buyButton.disabled = true;
      buyButton.textContent = "Procesando...";
      buyButton.classList.add("cursor-not-allowed", "opacity-70");
    }

    if (checkoutLoading) {
      checkoutLoading.classList.remove("hidden");
      checkoutLoading.classList.add("flex");
    }

    window.setTimeout(() => {
      window.location.href = "../checkout/";
    }, 1200);
  };

  if (buyButton) {
    buyButton.addEventListener("click", purchase);
  }

  updateTotals();
})();
