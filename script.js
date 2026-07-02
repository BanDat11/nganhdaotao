/* ============================================================
   script.js dùng chung cho toàn bộ trang UTH
   - Back-to-top + vòng tiến trình cuộn (giữ nguyên logic gốc)
   - Thanh tiến trình cuộn trên đầu trang (nếu có .scroll-progress)
   - Hiệu ứng cuộn-hiện cho mọi phần tử .reveal
   - Đổ bóng cho header khi cuộn
   - Toggle menu mobile (.menu-button <-> .main-nav.open)
   - Tab controls (.tab-button / .tab-panel)
   - Career board (.career-item)
   ============================================================ */

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Back-to-top + vòng tiến trình (logic gốc, giữ nguyên) ---------- */
  var backToTop = document.querySelector(".back-to-top");
  var progressBar = document.querySelector(".btt-progress-bar");
  var topProgressBar = document.getElementById("scrollProgress") || document.querySelector(".scroll-progress");
  var siteHeader = document.querySelector(".site-header");

  if (backToTop && progressBar) {
    var circumference = 2 * Math.PI * 27;
    progressBar.style.strokeDasharray = String(circumference);

    var updateScrollProgress = function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      progressBar.style.strokeDashoffset = String(circumference * (1 - progress));
      backToTop.classList.toggle("is-visible", scrollTop > 200);

      if (topProgressBar) {
        topProgressBar.style.width = progress * 100 + "%";
      }

      if (siteHeader) {
        siteHeader.classList.toggle("is-scrolled", scrollTop > 8);
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();
  }

  /* ---------- Hiệu ứng cuộn-hiện cho .reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  /* ---------- Menu mobile ---------- */
  var menuButton = document.querySelector(".menu-button");
  var mainNav = document.querySelector(".main-nav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Đóng menu khi chọn một mục điều hướng (hữu ích trên mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Tab controls: .tab-button[data-tab] điều khiển .tab-panel[data-tab-panel] ---------- */
  var tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach(function (group) {
    var buttons = group.querySelectorAll(".tab-button");
    var panels = group.querySelectorAll(".tab-panel");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        panels.forEach(function (panel) {
          panel.classList.toggle("active", panel.getAttribute("data-tab-panel") === target);
        });
      });
    });
  });

  /* ---------- Career board: .career-item[data-career] điều khiển vùng chi tiết [data-career-detail] ---------- */
  var careerBoards = document.querySelectorAll(".career-board");
  careerBoards.forEach(function (board) {
    var items = board.querySelectorAll(".career-item");
    var wrapper = board.closest("[data-career-wrapper]") || board.parentElement;
    var details = wrapper ? wrapper.querySelectorAll("[data-career-detail]") : [];

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var target = item.getAttribute("data-career");

        items.forEach(function (i) {
          i.classList.toggle("active", i === item);
        });
        details.forEach(function (detail) {
          detail.classList.toggle("active", detail.getAttribute("data-career-detail") === target);
        });
      });
    });
  });
})();