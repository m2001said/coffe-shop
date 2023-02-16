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

// -----form validation -----------
const form = document.querySelector(".form");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formDate = document.getElementById("date");
const formTime = document.getElementById("time");
const formMessage = document.getElementById("message");
const formPhone = document.getElementById("phone");
const formSuccessMessage = document.querySelector(".form-succes");

//for making error messages
const setErrorFor = (input, message) => {
  //get the parent dev of input to add classes for it
  const inputContainer = input.parentElement;
  inputContainer.classList.add("error-input");

  const small = inputContainer.querySelector("small");
  small.innerText = message;

  const errorIcon = inputContainer.querySelector(".error-icon");
  const successIcon = inputContainer.querySelector(".success-icon");
  errorIcon.style.display = "block";
  successIcon.style.display = "none";
};

//for making successful messages
const setSuccessFor = (input) => {
  const inputContainer = input.parentElement;
  inputContainer.classList.add("success-input");

  const small = inputContainer.querySelector("small");
  small.innerText = "";

  const errorIcon = inputContainer.querySelector(".error-icon");
  const successIcon = inputContainer.querySelector(".success-icon");
  successIcon.style.display = "block";
  errorIcon.style.display = "none";
};

const checkInput = () => {
  const nameValue = formName.value.trim();
  const emailValue = formEmail.value.trim();
  const dateValue = formDate.value.trim();
  const timeValue = formTime.value.trim();
  const messageValue = formMessage.value.trim();
  const phoneValue = formPhone.value.trim();

  if (nameValue === "") {
    setErrorFor(formName, "Name input can't be empty");
  } else {
    setSuccessFor(formName);
  }

  if (emailValue === "") {
    setErrorFor(formEmail, "Email input can't be empty");
  } else {
    setSuccessFor(formEmail);
  }

  if (dateValue === "") {
    setErrorFor(formDate, "Date input can't be empty");
  } else {
    setSuccessFor(formDate);
  }

  if (timeValue === "") {
    setErrorFor(formTime, "Time input can't be empty");
  } else {
    setSuccessFor(formTime);
  }

  if (messageValue === "") {
    setErrorFor(formMessage, "Message input can't be empty");
  } else {
    setSuccessFor(formMessage);
  }

  if (phoneValue === "") {
    setErrorFor(formPhone, "Phone input can't be empty");
  } else {
    setSuccessFor(formPhone);
  }

  // check if all inputs are valid
  return (
    nameValue !== "" &&
    emailValue !== "" &&
    dateValue !== "" &&
    timeValue !== "" &&
    messageValue !== "" &&
    phoneValue !== ""
  );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput()
    ? ((formSuccessMessage.textContent = "You successfully book a table"),
      (formSuccessMessage.style.color = "white"))
    : ((formSuccessMessage.textContent = "You should complete all the input"),
      (formSuccessMessage.style.color = "red"));
});

// -------scrolling animation---------------
const boxRight = document.querySelectorAll(".scroll-right");
const boxLeft = document.querySelectorAll(".scroll-left");

window.addEventListener("scroll", checkRightBox);
window.addEventListener("scroll", checkLeftBox);

// for checking top of element
function checkTop(element) {
  const triggerBottom = (window.innerHeight / 4) * 4;
  const boxTop = element.getBoundingClientRect().top;
  if (boxTop < triggerBottom) {
    element.classList.add("show");
  } else {
    element.classList.remove("show");
  }
}

function checkRightBox() {
  boxLeft.forEach((box) => {
    checkTop(box);
  });
}
function checkLeftBox() {
  boxRight.forEach((box) => {
    checkTop(box);
  });
}
