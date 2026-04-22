/* MENU TOGGLE */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

/* SEARCH (HOME → SHOP) */
const homeSearchInput = document.getElementById("homeSearchInput");
const homeSearchBtn = document.getElementById("homeSearchBtn");

if (homeSearchBtn && homeSearchInput) {
  homeSearchBtn.addEventListener("click", () => {
    const keyword = homeSearchInput.value.trim();
    window.location.href = keyword
      ? `shop.html?search=${encodeURIComponent(keyword)}`
      : "shop.html";
  });

  homeSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const keyword = homeSearchInput.value.trim();
      window.location.href = keyword
        ? `shop.html?search=${encodeURIComponent(keyword)}`
        : "shop.html";
    }
  });
}

/* SHOP FILTER + SEARCH */
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");

if (filterButtons.length && productCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
}

if (searchInput && productCards.length) {
  searchInput.addEventListener("keyup", applyFilters);
}

function applyFilters() {
  const activeFilter =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";

  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

  productCards.forEach((card) => {
    const category = card.dataset.category;
    const name = card.dataset.name
      ? card.dataset.name.toLowerCase()
      : "";

    const show =
      (activeFilter === "all" || category === activeFilter) &&
      name.includes(searchValue);

    card.style.display = show ? "block" : "none";
  });
}

/* SEARCH FROM URL */
const params = new URLSearchParams(window.location.search);
const searchFromUrl = params.get("search");

if (searchInput && searchFromUrl) {
  searchInput.value = searchFromUrl;
  applyFilters();
}

/* PRODUCT DETAILS PAGE */
const productTitle = document.getElementById("productTitle");

if (productTitle) {
  const urlParams = new URLSearchParams(window.location.search);

  const name = urlParams.get("name");
  const price = urlParams.get("price");

  const productBuyBtn = document.getElementById("productBuyBtn");

  if (name && productBuyBtn) {
    const whatsappNumber = "2349072458012";
    const message = `Hello, I want to buy ${name} for ₵${price}. Please send payment details.`;

    productBuyBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}

/* POPUP */
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");

window.addEventListener("load", () => {
  if (popupOverlay) {
    setTimeout(() => {
      popupOverlay.classList.add("show");
    }, 1000);
  }
});

if (closePopup && popupOverlay) {
  closePopup.addEventListener("click", () => {
    popupOverlay.classList.remove("show");
  });

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("show");
    }
  });
}