function updateFullBgHeight() {
  const fullBg = document.querySelector(".full-bg");
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  if (fullBg) {
    fullBg.style.height = `${pageHeight}px`;
  }
}

// Set initial height
updateFullBgHeight();

// Update on window resize
window.addEventListener("resize", updateFullBgHeight);

// Observe changes in the DOM
const observer = new MutationObserver(() => {
  updateFullBgHeight();
});

// Configure the observer
observer.observe(document.body, {
  childList: true, // Watch for added/removed nodes
  subtree: true, // Watch all child nodes recursively
  attributes: true, // Watch for attribute changes
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 50) {
    navbar.classList.add("blurry-nav");
  } else {
    navbar.classList.remove("blurry-nav");
  }
});

const sections = document.querySelectorAll('section');
const links    = document.querySelectorAll('.nav-link');


const observer2 = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const sectionName = e.target.id;
                links.forEach((l) => {
                    l.classList.remove('active');
                });

                const selectedNavlink = document.querySelector(`a[href='#${sectionName}']`)
                if (selectedNavlink != null) {
                    selectedNavlink.classList.add('active');
                }
            }
        });
    },
    {
        root: null,
        rootMargin:'0px',
        threshold: 0.6,
    },
);


sections.forEach((section) => observer2.observe(section));
