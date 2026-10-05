const CONTACT_EMAIL = "hrushij0208@gmail.com";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const body = document.body;

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function closeMenu() {
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
  body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = !menuButton.classList.contains("is-open");
  menuButton.classList.toggle("is-open", willOpen);
  nav.classList.toggle("is-open", willOpen);
  body.classList.toggle("menu-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) closeMenu();
});

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -28px" },
);

revealElements.forEach((element) => observer.observe(element));

const dialogs = {
  inventory: document.querySelector("#inventory-dialog"),
  workforce: document.querySelector("#workforce-dialog"),
  saas: document.querySelector("#saas-dialog"),
};

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = dialogs[button.dataset.openProject];
    if (!dialog) return;
    dialog.showModal();
    dialog.querySelector(".dialog-close")?.focus();
  });
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedBackdrop =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (clickedBackdrop) dialog.close();
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = String(fields.get("name") || "").trim();
  const email = String(fields.get("email") || "").trim();
  const message = String(fields.get("message") || "").trim();
  const subject = `Portfolio enquiry from ${name}`;
  const content = `Hello Hrushikesh,\n\n${message}\n\nBest,\n${name}\n${email}`;
  const recipient = CONTACT_EMAIL ? CONTACT_EMAIL : "";

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
  formStatus.textContent = CONTACT_EMAIL
    ? "Your preferred mail app is opening with the message drafted."
    : "Message drafted. Add a recipient in your mail app to send it.";
});

const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    },
    { passive: true },
  );
}
