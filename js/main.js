// -----------navlinks mobile------------------------
const btnMenu = document.querySelector(".bi-list");
const menuBox = document.querySelector(".nav-links");

btnMenu.addEventListener("click", () => {
  menuBox.classList.toggle("show");
});

// ---------sticky nav---------------------
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,

  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// ------------------smooth scrolling with margin of the nav height-----------------------

let navLinks = document.querySelectorAll(".nav a");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    smoothGo(e, 0);
    menuBox.classList.remove("show");
  });
});

// ------smooth function-----------
const smoothGo = (e, margin) => {
  let currentId = e.target.attributes.href.value;
  let section = document.querySelector(currentId);
  let sectionPosition = section.offsetTop;
  let topPosition = sectionPosition - navHeight - +margin;
  window.scroll({
    top: topPosition,
    behavior: "smooth",
  });
};

// ------smooth buttons-----------
let viewMenuBtn = document.querySelectorAll(".menu-btn");
viewMenuBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    smoothGo(e, 30);
  });
});

let orderBtn = document.querySelector(".order-btn");
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  smoothGo(e, 30);
});

// -----slider testimonials -----------
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".testimonials-left");
const nextBtn = document.querySelector(".testimonials-right");
let currentSlide = 0;

// Show the current slide and hide the rest
const showSlide = () => {
  slides.forEach((slide, index) => {
    if (index == currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
};

// move to the nextSlide
const nextSlide = () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
};

// move to the prevslide
const prevSlide = () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide();
};

// Set the interval to change the slide every 5 seconds
setInterval(nextSlide, 6000);

// Add event listeners to the buttons
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
