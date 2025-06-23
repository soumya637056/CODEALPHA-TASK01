const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const searchInput = document.getElementById("searchInput");
let currentIndex = 0;

// Open lightbox
function openLightbox(index) {
  lightbox.style.display = "flex";
  currentIndex = index;
  updateLightboxImage();
}

// Update image in lightbox
function updateLightboxImage() {
  const imgs = document.querySelectorAll(".gallery img");
  lightboxImg.src = imgs[currentIndex].src;
}

// Close lightbox
closeBtn.onclick = () => lightbox.style.display = "none";
nextBtn.onclick = () => {
  const imgs = document.querySelectorAll(".gallery img");
  currentIndex = (currentIndex + 1) % imgs.length;
  updateLightboxImage();
};
prevBtn.onclick = () => {
  const imgs = document.querySelectorAll(".gallery img");
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  updateLightboxImage();
};

// Assign lightbox to all images
function assignLightbox() {
  document.querySelectorAll(".gallery img").forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
  });
}
assignLightbox();

// Filter buttons
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll(".gallery img").forEach(img => {
      const category = img.getAttribute("data-category");
      img.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});

// Search function
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".gallery img").forEach(img => {
    const match = img.alt.toLowerCase().includes(query) || img.dataset.category.toLowerCase().includes(query);
    img.style.display = match ? "block" : "none";
  });
});

// Upload function
document.getElementById("imageUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newImg = document.createElement("img");
      newImg.src = e.target.result;
      newImg.alt = file.name;
      newImg.setAttribute("data-category", "uploaded");
      gallery.appendChild(newImg);
      assignLightbox(); // reassign click
    };
    reader.readAsDataURL(file);
  }
});
