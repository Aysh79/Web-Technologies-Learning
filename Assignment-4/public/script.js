const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// ⭐ BONUS: close menu when link clicked
const links = document.querySelectorAll(".menu a");

links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});