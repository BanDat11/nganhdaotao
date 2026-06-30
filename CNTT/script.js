const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const careerButtons = document.querySelectorAll(".career-item");
const careerTitle = document.querySelector("#career-title");
const careerDesc = document.querySelector("#career-desc");
const careerTags = document.querySelector("#career-tags");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const revealItems = document.querySelectorAll(
  ".section-inner, .feature-card, .timeline article, .career-board, .campus-grid article"
);

const careerContent = {
  dev: {
    title: "Lập trình viên phần mềm",
    desc: "Phân tích yêu cầu, thiết kế kiến trúc, xây dựng tính năng, kiểm thử và cải tiến sản phẩm trên web, mobile hoặc hệ thống doanh nghiệp.",
    tags: ["Frontend", "Backend", "API", "Testing"]
  },
  data: {
    title: "Chuyên viên dữ liệu",
    desc: "Thu thập, làm sạch, trực quan hóa dữ liệu và tạo báo cáo giúp tổ chức ra quyết định chính xác hơn.",
    tags: ["SQL", "Dashboard", "Analytics", "BI"]
  },
  ai: {
    title: "Kỹ sư AI",
    desc: "Xây dựng mô hình học máy, xử lý dữ liệu huấn luyện và tích hợp trí tuệ nhân tạo vào sản phẩm số.",
    tags: ["Machine Learning", "Python", "Model", "Automation"]
  },
  security: {
    title: "Chuyên viên bảo mật",
    desc: "Bảo vệ hệ thống, kiểm tra lỗ hổng, giám sát rủi ro và xây dựng quy trình an toàn thông tin.",
    tags: ["Network", "Risk", "Pentest", "Monitoring"]
  },
  product: {
    title: "Quản lý sản phẩm số",
    desc: "Kết nối nhu cầu người dùng, mục tiêu kinh doanh và đội kỹ thuật để phát triển sản phẩm đúng hướng.",
    tags: ["User Story", "Roadmap", "UX", "Agile"]
  }
};

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

careerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = careerContent[button.dataset.role];

    careerButtons.forEach((item) => item.classList.toggle("active", item === button));
    careerTitle.textContent = content.title;
    careerDesc.textContent = content.desc;
    careerTags.innerHTML = content.tags.map((tag) => `<li>${tag}</li>`).join("");
  });
});

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const interest = formData.get("interest");

    if (!name) {
      formMessage.textContent = "Vui lòng nhập họ và tên để nhận tư vấn.";
      return;
    }

    formMessage.textContent = `${name}, nhà trường sẽ liên hệ tư vấn về nhóm ${interest}.`;
    contactForm.reset();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
