(function() {
    const scrollBtn = document.querySelector(".scroll-down__btn");
    const reqBlock = document.querySelector("section.about");
  
    scrollBtn.addEventListener("click", e => {
      e.preventDefault();
  
      reqBlock.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  })();
  

  
  (function() {
    const hamburgerBtn = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".sidebar__close");
    const sidebar = document.querySelector(".sidebar");
  
    hamburgerBtn.addEventListener("click", e => {
      sidebar.classList.add("active");
    });
  
    closeBtn.addEventListener("click", e => {
      sidebar.classList.remove("active");
    });
  })();