const themeBtn = document.querySelector("#theme-toggle");
const root = document.documentElement; 

function setTheme(theme) {
  root.setAttribute("data-theme", theme);          
  themeBtn.textContent = theme === "dark" ? "☀" : "☾";
  try {
    localStorage.setItem("theme", theme);         
  } catch (e) {}
}


let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (systemDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});



const revealItems = document.querySelectorAll(
  ".about h2, .about p, .work h2, .work .lead, .card, .contact h2, .contact-row"
);

revealItems.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {                  
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);    
      }
    });
  },
  { threshold: 0.15 }                              
);

revealItems.forEach((el) => revealObserver.observe(el));


const toTop = document.querySelector("#to-top");

window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 400);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

