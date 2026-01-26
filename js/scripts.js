// ✅ Smooth scroll
document.querySelectorAll(".js-scroll-trigger").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    // ✅ Close navbar on mobile
    const navbarCollapse = document.getElementById("navbarResponsive");
    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});

// ✅ Dark Mode Toggle
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

// ✅ Current year
document.getElementById("year").innerText = new Date().getFullYear();

/* ==========================
   ✅ EmailJS CONTACT FORM ✅
========================== */
const EMAILJS_PUBLIC_KEY = "GAJReNTtQCcA8Jlxp";
const EMAILJS_SERVICE_ID = "service_xsnidf5";
const EMAILJS_TEMPLATE_ID = "template_tsr35hf";

// ✅ Init EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.innerHTML = `<div class="alert alert-danger">❌ Please fill all fields.</div>`;
    return;
  }

  try {
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    // ✅ Match your EmailJS template variables: {{name}}, {{email}}, {{message}}, {{title}}
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      title: "Portfolio Contact Message",
      name: name,
      email: email,
      message: message,
    });

    formStatus.innerHTML = `<div class="alert alert-success">✅ Message sent successfully! I will contact you soon 😄</div>`;
    contactForm.reset();
  } catch (error) {
    console.log("EmailJS Error:", error);
    formStatus.innerHTML = `<div class="alert alert-danger">❌ Failed to send message. Please try again!</div>`;
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
  }
});
