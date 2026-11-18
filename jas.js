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


// Плавная прокрутка по ссылкам меню
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});


// Интерактивное приветствие с пользователем
const g = document.getElementById('greeting');
const btn = document.getElementById('askName');

function showGreeting(name) {
  g.textContent = name
    ? `Привет, ${name}!`
    : 'Добро пожаловать!';
}

function askName() {
  const name = prompt('Как тебя зовут?');
  if (name && name.trim() !== '') {
    localStorage.setItem('visitorName', name.trim());
  } else {
    localStorage.removeItem('visitorName');
  }
  showGreeting(localStorage.getItem('visitorName'));
}

btn.addEventListener('click', askName);

showGreeting(localStorage.getItem('visitorName'));
