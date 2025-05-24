document.addEventListener("DOMContentLoaded", function () {
  // Preloader with progress
  const preloader = document.querySelector(".preloader");
  const loadingBar = document.querySelector(".loading-bar");

  // Simulate progress (in a real app, this might track actual loading)
  let loadProgress = 0;
  const loadingInterval = setInterval(() => {
    loadProgress += 5;
    if (loadProgress <= 100) {
      loadingBar.style.width = `${loadProgress}%`;
    } else {
      clearInterval(loadingInterval);
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  }, 100);

  // Fallback to ensure preloader disappears
  window.addEventListener("load", () => {
    clearInterval(loadingInterval);
    loadingBar.style.width = "100%";

    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });

  // Navigation functionality with modern animations
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  // Mobile menu toggle with animation
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Disable scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";

    // Add animation to nav links
    if (navLinks.classList.contains("active")) {
      const links = document.querySelectorAll(".nav-links a");
      links.forEach((link, index) => {
        link.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        link.style.opacity = "0";
      });
    } else {
      // Reset animations when closing menu
      const links = document.querySelectorAll(".nav-links a");
      links.forEach((link) => {
        link.style.animation = "";
        link.style.opacity = "1";
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    }
  }); // Enhanced navigation bar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Always keep navbar visible
    navbar.style.transform = "translateY(0)";

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  });
  // Advanced smooth scroll with section highlighting
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Scroll to section with enhanced animation
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add visual feedback for click
        this.classList.add("nav-link-clicked");
        setTimeout(() => {
          this.classList.remove("nav-link-clicked");
        }, 300);
        const navHeight = navbar.offsetHeight;
        // Add 20px more padding to ensure section titles are visible
        const targetPosition = targetSection.offsetTop - navHeight - 30;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });

  // Track current section during scroll to highlight active nav item
  function highlightNavigation() {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.id;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((item) => {
          item.classList.remove("active-nav-item");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active-nav-item");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  // Enhanced Dark mode toggle with animation
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const themeIcon = document.querySelector(".theme-toggle i");
  const htmlRoot = document.documentElement;

  // Add CSS variables for smooth theme transition
  htmlRoot.style.setProperty(
    "--theme-transition",
    "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  );

  // Apply transition to specific properties only to avoid layout shifts
  const elementsToTransition = [
    "background",
    "color",
    "border-color",
    "box-shadow",
  ];
  elementsToTransition.forEach((prop) => {
    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.getPropertyValue(prop)) {
        el.style.transition = `${prop} 0.8s cubic-bezier(0.4, 0, 0.2, 1), ${el.style.transition}`;
      }
    });
  });

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
    body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  // RGB values for theme colors to enable transparency
  const updateRgbVars = () => {
    const isDark = body.classList.contains("dark-theme");

    // Convert hex to RGB for background color to use with transparency
    const getBgRgb = () => {
      const bgColor = isDark ? "#0f172a" : "#ffffff";
      const r = parseInt(bgColor.slice(1, 3), 16);
      const g = parseInt(bgColor.slice(3, 5), 16);
      const b = parseInt(bgColor.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    htmlRoot.style.setProperty("--bg-color-rgb", getBgRgb());
  };
  updateRgbVars();

  // Toggle theme with enhanced animation
  themeToggle.addEventListener("click", () => {
    // Stop the attention animation when clicked
    themeToggle.style.animation = "none";

    // Add transition effect for theme change
    body.style.transition = "background 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    // Add animation to toggle button
    themeToggle.classList.add("theme-toggle-clicked");
    setTimeout(() => {
      themeToggle.classList.remove("theme-toggle-clicked");
    }, 500); // Toggle theme class
    body.classList.toggle("dark-theme");
    updateRgbVars();

    // Update icon with animation
    if (body.classList.contains("dark-theme")) {
      themeIcon.style.transform = "rotate(360deg)";
      setTimeout(() => {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }, 200);
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.style.transform = "rotate(-360deg)";
      setTimeout(() => {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }, 200);
      localStorage.setItem("theme", "light");
    }

    // Reset transform after animation
    setTimeout(() => {
      themeIcon.style.transform = "";
    }, 500);
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
  // Enhanced Scroll to top button with progress indicator
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  const progressPath = document.querySelector(".scroll-progress-path");
  const pathLength = progressPath ? progressPath.getTotalLength() : 0;

  if (progressPath) {
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;
  }

  // Show button and update progress circle when scrolling
  window.addEventListener("scroll", () => {
    const scrollPercentage =
      (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");

      if (progressPath) {
        const drawLength = pathLength * scrollPercentage;
        progressPath.style.strokeDashoffset = pathLength - drawLength;
      }
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });
  // Scroll to top when clicking button with smooth animation
  scrollToTopBtn.addEventListener("click", () => {
    // Add animation feedback
    scrollToTopBtn.classList.add("scroll-top-clicked");

    // Use the built-in smooth scrolling which won't interfere with subsequent scrolling
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Remove the clicked effect after animation completes
    setTimeout(() => {
      scrollToTopBtn.classList.remove("scroll-top-clicked");
    }, 500);
  });

  // Set current year in footer
  const currentYearEl = document.getElementById("current-year");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Add interactive hover effects to timeline, education, and achievement items
  const addHoverEffects = () => {
    // Timeline items interaction
    const timelineItems = document.querySelectorAll(".timeline-content");
    timelineItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.querySelector("h3").style.color = "var(--accent-color)";
      });

      item.addEventListener("mouseleave", function () {
        this.querySelector("h3").style.color = "var(--primary-color)";
      });
    });

    // Education items interaction
    const educationItems = document.querySelectorAll(".education-item");
    educationItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.querySelector("h3").style.color = "var(--secondary-color)";
        if (this.querySelector(".institution")) {
          this.querySelector(".institution").style.color =
            "var(--accent-color)";
        }
      });

      item.addEventListener("mouseleave", function () {
        this.querySelector("h3").style.color = "var(--primary-color)";
        if (this.querySelector(".institution")) {
          this.querySelector(".institution").style.color =
            "var(--secondary-color)";
        }
      });
    });

    // Organization items interaction
    const organizationItems = document.querySelectorAll(".organization-item");
    organizationItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.querySelector("h3").style.color = "var(--primary-color)";
        if (this.querySelector(".organization")) {
          this.querySelector(".organization").style.color =
            "var(--accent-color)";
        }
      });

      item.addEventListener("mouseleave", function () {
        this.querySelector("h3").style.color = "var(--primary-color)";
        if (this.querySelector(".organization")) {
          this.querySelector(".organization").style.color =
            "var(--secondary-color)";
        }
      });
    });
  };

  // Initialize hover effects
  addHoverEffects();

  // Fix mailto links to work across different browsers and devices
  const fixMailtoLinks = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const email = this.getAttribute("href").replace("mailto:", "");
        const subject = this.getAttribute("data-subject") || "";
        const body = this.getAttribute("data-body") || "";

        let mailtoUrl = `mailto:${email}`;
        if (subject || body) {
          mailtoUrl += "?";
          if (subject) mailtoUrl += `subject=${encodeURIComponent(subject)}`;
          if (subject && body) mailtoUrl += "&";
          if (body) mailtoUrl += `body=${encodeURIComponent(body)}`;
        }

        // Try to open mail client using different methods
        try {
          window.location.href = mailtoUrl;
        } catch (e) {
          try {
            window.open(mailtoUrl, "_self");
          } catch (e2) {
            console.error("Failed to open email client", e2);
            // Show a fallback message
            alert(`Please email me at ${email}`);
          }
        }
      });
    });
  };

  // Initialize mailto link fix
  fixMailtoLinks();
});
