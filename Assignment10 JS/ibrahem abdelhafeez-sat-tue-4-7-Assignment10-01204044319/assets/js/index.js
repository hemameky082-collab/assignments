// *** START THEME *** //
var themeBtn = document.getElementById("btn");
var html = document.documentElement;
var savedTheme = localStorage.getItem("theme");

if (savedTheme == "dark") {
  html.classList.add("dark");
} else if (savedTheme == "light") {
  html.classList.remove("dark");
}

themeBtn.addEventListener("click", function () {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// *** END THEME *** //

// *** START SCROLL *** //
var navLinks = document.querySelectorAll("#navbar-example a");
var sections = document.querySelectorAll("section");
var mobileMenuBtn = document.querySelector(".mobile-menu-btn");
var mobileMenu = document.getElementById("navbar-example");

mobileMenuBtn.addEventListener("click", function () {
  var isOpen = mobileMenu.classList.toggle("active");
  mobileMenuBtn.setAttribute("aria-expanded", isOpen);
});

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
}

function activeNav() {
  for (var i = 0; i < sections.length; i++) {
    if (
      window.scrollY >= sections[i].offsetTop &&
      window.scrollY < sections[i].offsetTop + sections[i].offsetHeight
    ) {
      for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");
      }

      var activeLink = document.querySelector(
        '#navbar-example a[href="#' + sections[i].id + '"]',
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }
}

activeNav();
window.addEventListener("scroll", activeNav);

// *** END SCROLL *** //

// *** START SCROLL TOP *** //

var scrollToTop = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    scrollToTop.classList.add("show");
  } else {
    scrollToTop.classList.remove("show");
  }
});

scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// *** END SCROLL TOP *** //

// *** START NAv & TABS *** //
var tabs = document.querySelectorAll(".tab-link");
var projects = document.querySelectorAll(".portfolio-item");

for (var i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    for (var k = 0; k < tabs.length; k++) {
      tabs[k].classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );

      tabs[k].classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
      );
    }

    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );

    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
    );

    for (var j = 0; j < projects.length; j++) {
      projects[j].style.opacity = "0";
      projects[j].style.transform = "scale(0.9)";

      if (
        this.dataset.category == "all" ||
        projects[j].dataset.category == this.dataset.category
      ) {
        projects[j].style.display = "block";

        setTimeout(
          (function (project) {
            return function () {
              project.style.opacity = "1";
              project.style.transform = "scale(1)";
            };
          })(projects[j]),
          400,
        );
      } else {
        projects[j].style.display = "none";
      }
    }
  });
}

// *** START Carousel *** //
var carousel = document.getElementById("testimonials-carousel");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");

var currentIndex = 0;

function updateCarousel() {
  var move = currentIndex * (100 / 3);

  carousel.style.transform = "translateX(" + move + "%)";

  for (var i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("bg-accent");

    indicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");

    indicators[i].setAttribute("aria-selected", "false");
  }

  indicators[currentIndex].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600",
  );

  indicators[currentIndex].classList.add("bg-accent");

  indicators[currentIndex].setAttribute("aria-selected", "true");
}

nextBtn.addEventListener("click", function () {
  currentIndex++;

  if (currentIndex >= indicators.length) {
    currentIndex = 0;
  }

  updateCarousel();
});

prevBtn.addEventListener("click", function () {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = indicators.length - 1;
  }

  updateCarousel();
});

for (var i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    currentIndex = Number(this.dataset.index);

    updateCarousel();
  });
}

updateCarousel();
// *** END Carousel *** //

// *** START SETTINGS SIDEBAR *** //
var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");

settingsToggle.addEventListener("click", function () {
  settingsSidebar.classList.add("open");

  settingsToggle.setAttribute("aria-expanded", "true");
  settingsSidebar.setAttribute("aria-hidden", "false");
});

closeSettings.addEventListener("click", function () {
  settingsSidebar.classList.remove("open");

  settingsToggle.setAttribute("aria-expanded", "false");
  settingsSidebar.setAttribute("aria-hidden", "true");
});

var fontOptions = document.querySelectorAll(".font-option");

for (var i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function () {
    for (var j = 0; j < fontOptions.length; j++) {
      fontOptions[j].classList.remove("active");
      fontOptions[j].setAttribute("aria-checked", "false");
    }

    this.classList.add("active");
    this.setAttribute("aria-checked", "true");

    var selectedFont = this.dataset.font;

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );

    document.body.classList.add("font-" + selectedFont);

    localStorage.setItem("selectedFont", selectedFont);
  });
}

var themeColors = document.querySelectorAll("#theme-colors-grid button");

for (var i = 0; i < themeColors.length; i++) {
  themeColors[i].addEventListener("click", function () {
    var primaryColor = this.dataset.primary;
    var secondaryColor = this.dataset.secondary;

    document.documentElement.style.setProperty("--color-primary", primaryColor);

    document.documentElement.style.setProperty(
      "--color-secondary",
      secondaryColor,
    );

    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("secondaryColor", secondaryColor);
  });
}

var savedFont = localStorage.getItem("selectedFont");
var savedPrimaryColor = localStorage.getItem("primaryColor");
var savedSecondaryColor = localStorage.getItem("secondaryColor");

if (savedFont != null) {
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );

  document.body.classList.add("font-" + savedFont);

  for (var i = 0; i < fontOptions.length; i++) {
    if (fontOptions[i].dataset.font == savedFont) {
      fontOptions[i].classList.add("active");
      fontOptions[i].setAttribute("aria-checked", "true");
    } else {
      fontOptions[i].classList.remove("active");
      fontOptions[i].setAttribute("aria-checked", "false");
    }
  }
}

if (savedPrimaryColor != null) {
  document.documentElement.style.setProperty(
    "--color-primary",
    savedPrimaryColor,
  );
}

if (savedSecondaryColor != null) {
  document.documentElement.style.setProperty(
    "--color-secondary",
    savedSecondaryColor,
  );
}

var resetSettings = document.getElementById("reset-settings");

resetSettings.addEventListener("click", function () {
  document.documentElement.style.setProperty("--color-primary", "#6366f1");

  document.documentElement.style.setProperty("--color-secondary", "#8b5cf6");

  document.body.classList.remove(
    "font-alexandria",
    "font-cairo",
    "font-tajawal",
  );

  document.body.classList.add("font-tajawal");

  for (var i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove("active");
    fontOptions[i].setAttribute("aria-checked", "false");
  }

  fontOptions[1].classList.add("active");
  fontOptions[1].setAttribute("aria-checked", "true");

  localStorage.removeItem("selectedFont");
  localStorage.removeItem("primaryColor");
  localStorage.removeItem("secondaryColor");
});

// *** END SETTINGS SIDEBAR *** //
