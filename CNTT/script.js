const backToTop = document.querySelector(".back-to-top");
const progressBar = document.querySelector(".btt-progress-bar");

if (backToTop && progressBar) {
  const circumference = 2 * Math.PI * 27;
  progressBar.style.strokeDasharray = String(circumference);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    progressBar.style.strokeDashoffset = String(circumference * (1 - progress));
    backToTop.classList.toggle("is-visible", scrollTop > 200);
  };

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
  updateScrollProgress();
}