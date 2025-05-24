document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");

  // Hide preloader after page loads
  window.addEventListener("load", () => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  // Navigation functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Change icon
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Navigation bar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      // Scroll to section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Dark mode toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const themeIcon = document.querySelector(".theme-toggle i");

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    // Update icon
    if (body.classList.contains("dark-theme")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Add animation delay to timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Skill badges hover effect
  const skillBadges = document.querySelectorAll(".skill-badge");
  skillBadges.forEach((badge) => {
    badge.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-5px)";
    });

    badge.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Create PDF from resume.tex if needed (placeholder)
  const downloadBtn = document.querySelector(".download-btn");
  downloadBtn.addEventListener("click", function (e) {
    // This is just a placeholder if you want to add PDF generation functionality later
    // For now, we assume a resume.pdf file exists
    console.log("PDF download requested");
  });

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  // Show button when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicking button
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Set current year in footer
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
