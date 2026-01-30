const themeToggle = document.getElementById("themeToggle");
const toggleIcon = document.getElementById("toggleIcon");
const toggleLabel = document.querySelector(".toggle-label");

const setTheme = (mode) => {
  document.body.classList.toggle("dark", mode === "dark");
  localStorage.setItem("theme", mode);
  toggleIcon.textContent = mode === "dark" ? "☀️" : "🌙";
  toggleLabel.textContent = mode === "dark" ? "Light Mode" : "Dark Mode";
};

const storedTheme = localStorage.getItem("theme") || "light";
setTheme(storedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

const countdownDate = new Date("2028-07-01T00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = Math.max(countdownDate - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(3, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
};

updateCountdown();
setInterval(updateCountdown, 1000);

const toggleAccordion = (event) => {
  const parent = event.currentTarget.parentElement;
  parent.classList.toggle("active");
};

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", toggleAccordion);
});

const bindExpandable = (selector, activeClass) => {
  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle(activeClass);
    });
  });
};

bindExpandable(".journey-card", "active");

const timelineBody = document.getElementById("timelineBody");
const placeholderDays = Array.from({ length: 25 }, (_, index) => index + 6);

placeholderDays.forEach((day) => {
  const card = document.createElement("div");
  card.className = "timeline-card";
  card.setAttribute("data-expandable", "true");
  card.innerHTML = `
    <div class="timeline-summary">
      <div>
        <h3>Day ${day}</h3>
        <span class="city-line"><span class="city-icon">🧭</span>Schedule TBD</span>
      </div>
      <span class="pill">Pending</span>
    </div>
    <div class="timeline-details">
      <p>Schedule to be finalized.</p>
    </div>
  `;
  timelineBody.appendChild(card);
});

bindExpandable(".timeline-card", "active");
