const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  // Закрыть меню по клику на пункт (на мобиле)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Закрыть по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      burger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });
}


// --- 2. Переключение тем ---
const themeBtn = document.querySelector("#theme-toggle");
const root = document.documentElement; 

function setTheme(theme) {
  root.setAttribute("data-theme", theme);          
  if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀" : "☾";
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

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}


// --- 3. Анимация появления при прокрутке (Reveal) ---
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


// --- 4. Кнопка «Наверх» ---
const toTop = document.querySelector("#to-top");

if (toTop) {
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 400);
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// --- 5. Плавная прокрутка по ссылкам меню ---
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


// --- 6. Интерактивное приветствие ---
const g = document.getElementById('greeting');
const btn = document.getElementById('askName');

function showGreeting(name) {
  if (!g) return;
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

if (btn) {
  btn.addEventListener('click', askName);
}

showGreeting(localStorage.getItem('visitorName'));
