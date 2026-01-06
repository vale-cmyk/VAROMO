document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
   
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        });
    }
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 };
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active-link');
                        if(link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        };
        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => scrollObserver.observe(section));
    }

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
    function initializeCoverFlowCarousel(trackId, prevBtnId, nextBtnId, dotsId, detailsBtnId, orderBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer = document.getElementById(dotsId);
        const detailsBtn = document.getElementById(detailsBtnId);
        const orderBtn = document.getElementById(orderBtnId);

        if (!track) return;

        const slides = Array.from(track.children);
        const totalSlides = slides.length;
        let currentIndex = 0;
        let dots = [];

        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        function updateSlideClasses() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
    
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                    slide.classList.add('prev');
                } else if (index === (currentIndex + 1) % totalSlides) {
                    slide.classList.add('next');
                }
            });
        }

        function goToSlide(index) {

            dots[currentIndex].classList.remove('active');
            dots[index].classList.add('active');
            currentIndex = index;

            updateSlideClasses();
            const activeDetails = track.querySelector('.slide.details-active');
            if(activeDetails) {
                activeDetails.classList.remove('details-active');
                detailsBtn.innerText = ' Ver Detalles '; 
            }
        }

        nextBtn.addEventListener('click', () => goToSlide((currentIndex + 1) % totalSlides));
        prevBtn.addEventListener('click', () => goToSlide((currentIndex - 1 + totalSlides) % totalSlides));

        detailsBtn.addEventListener('click', (e) => {
            const activeSlide = track.querySelector('.slide.active');
            if (activeSlide) {
                activeSlide.classList.toggle('details-active');
                e.target.innerText = activeSlide.classList.contains('details-active') ? ' Ocultar ' : ' Ver Detalles ';
            }
        });

        orderBtn.addEventListener('click', () => {
            const activeSlide = track.querySelector('.slide.active');
            const productName = activeSlide.querySelector('.details-panel h4').innerText;
            const contactTextarea = document.getElementById('contact-message');
            
            if (contactTextarea) {
                contactTextarea.value = `¡Hola! Me gustaría hacer un pedido de: ${productName}.`;
                contactTextarea.focus();
            }
        });

        updateSlideClasses();
    }

    initializeCoverFlowCarousel('aguas-track', 'aguas-prev', 'aguas-next', 'aguas-dots', 'aguas-details-btn', 'aguas-order-btn');
    initializeCoverFlowCarousel('guisos-track', 'guisos-prev', 'guisos-next', 'guisos-dots', 'guisos-details-btn', 'guisos-order-btn');

});