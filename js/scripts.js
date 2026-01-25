// Smooth scroll
document.querySelectorAll(".js-scroll-trigger").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    target.scrollIntoView({ behavior: "smooth" });

    // Close navbar on mobile after click
    const navbarCollapse = document.getElementById("navbarResponsive");
    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});

// Dark Mode Toggle ✅
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerText = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    themeToggle.innerText = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// Contact Form (UI message ✅)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.innerHTML = `<div class="alert alert-danger">❌ Please fill all fields.</div>`;
    return;
  }

  formStatus.innerHTML = `<div class="alert alert-success">✅ Message sent successfully! Thank you <b>${name}</b> 😄</div>`;
  contactForm.reset();
});

// Current year
document.getElementById("year").innerText = new Date().getFullYear();
