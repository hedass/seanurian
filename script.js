document.addEventListener("DOMContentLoaded", function () {
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
});
