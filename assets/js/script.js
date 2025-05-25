// Animação de contagem dos números
function animateCounter(counter) {
    const target = +counter.getAttribute('data-count');
    const speed = 500;
    const increment = target / speed;

    function updateCounter() {
        const count = +counter.innerText;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target;
        }
    }

    updateCounter();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}


// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    
    if(window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if(window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Animação ao scroll com Intersection Observer
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add(entry.target.dataset.animate);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    homeObserver.unobserve(entry.target);
    homeObserver.observe(document.querySelector('#home'));
    
    // Configura animações ao scroll
    animateOnScroll();
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animações para os feature boxes
    gsap.utils.toArray('.feature-box').forEach((box, i) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    
    
    menuBtn.addEventListener('click', function() {
        headerRight.classList.toggle('active');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationClass = element.getAttribute('data-animation');
        element.classList.add('animate__animated', animationClass);
        observer.unobserve(element); // remove o observer depois de animar
      }
    });
  }, {
    threshold: 0.3 // Quando 30% do elemento aparecer, ativa a animação
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
  }