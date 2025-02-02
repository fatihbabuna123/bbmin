

//navbar baslangic
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const offcanvas = document.querySelector('.offcanvas');

// Toggle offcanvas
toggleBtn.addEventListener('click', () => {
    offcanvas.classList.add('active');
});

// Close offcanvas
closeBtn.addEventListener('click', () => {
    offcanvas.classList.remove('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!offcanvas.contains(e.target) && !toggleBtn.contains(e.target)) {
        offcanvas.classList.remove('active');
    }
});

// Close on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        offcanvas.classList.remove('active');
    }
});
//navbar bitis
//slider baslangic
const sliderTrack = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        let autoPlayInterval;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Navigation functions
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Touch/swipe handling
        slides.forEach((slide, index) => {
            slide.addEventListener('touchstart', touchStart(index));
            slide.addEventListener('touchend', touchEnd);
            slide.addEventListener('touchmove', touchMove);
            
            slide.addEventListener('mousedown', touchStart(index));
            slide.addEventListener('mouseup', touchEnd);
            slide.addEventListener('mouseleave', touchEnd);
            slide.addEventListener('mousemove', touchMove);
        });

        function touchStart(index) {
            return function(e) {
                currentIndex = index;
                startPos = getPositionX(e);
                isDragging = true;
                sliderTrack.style.transition = 'none';
            }
        }

        function touchEnd() {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            sliderTrack.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            if(movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
            if(movedBy > 100 && currentIndex > 0) currentIndex -= 1;

            updateSlider();
        }

        function touchMove(e) {
            if(isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + currentPosition - startPos;
                sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        // Auto-play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
        });

        sliderTrack.addEventListener('mouseenter', stopAutoPlay);
        sliderTrack.addEventListener('mouseleave', startAutoPlay);

        // Initialize
        startAutoPlay();
        //slider bitis
        //partners baslangic
 // Touch desteği eklemek için
 let isDraggingg = false;
 let startX;
 let scrollLeft;

 const slider = document.querySelector('.partners-container');

 slider.addEventListener('mousedown', (e) => {
     isDraggingg = true;
     slider.classList.add('dragging');
     startX = e.pageX - slider.offsetLeft;
     scrollLeft = slider.scrollLeft;
 });

 slider.addEventListener('mouseleave', () => {
     isDraggingg = false;
     slider.classList.remove('dragging');
 });

 slider.addEventListener('mouseup', () => {
     isDraggingg = false;
     slider.classList.remove('dragging');
 });

 slider.addEventListener('mousemove', (e) => {
     if (!isDraggingg) return;
     e.preventDefault();
     const x = e.pageX - slider.offsetLeft;
     const walk = (x - startX) * 2;
     slider.scrollLeft = scrollLeft - walk;
 });
        //partners bitis
        //portfolio filtreleme baslangic
         // Filtreleme Fonksiyonu
         const filterButtons = document.querySelectorAll('.filter-btn');
         const portfolioItems = document.querySelectorAll('.portfolio-item');
 
         filterButtons.forEach(button => {
             button.addEventListener('click', () => {
                 // Aktif butonu güncelle
                 filterButtons.forEach(btn => btn.classList.remove('active'));
                 button.classList.add('active');
                 
                 const filter = button.dataset.filter;
                 
                 // Öğeleri filtrele
                 portfolioItems.forEach(item => {
                     const category = item.dataset.category;
                     if (filter === '*' || category === filter) {
                         item.style.display = 'block';
                     } else {
                         item.style.display = 'none';
                     }
                 });
             });
         });
         //portfolio filtreleme bitis
         //about baslangic
         const contactForm = document.getElementById('contactForm');
        
         contactForm.addEventListener('submit', function(e) {
             e.preventDefault();
             
             const name = document.getElementById('name').value;
             const email = document.getElementById('email').value;
             const subject = document.getElementById('subject').value;
             const message = document.getElementById('message').value;
 
             if(validateForm(name, email, subject, message)) {
                 // Buraya gönderme işlemi eklenebilir
                 alert('Mesajınız başarıyla gönderildi!');
                 contactForm.reset();
             }
         });
 
         function validateForm(name, email, subject, message) {
             if(!name || !email || !subject || !message) {
                 alert('Lütfen tüm alanları doldurun!');
                 return false;
             }
 
             if(!validateEmail(email)) {
                 alert('Geçersiz e-posta adresi!');
                 return false;
             }
 
             return true;
         }
 
         function validateEmail(email) {
             const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             return re.test(email);
         }
         //about bitis
         //yukari cik butonu
         const scrollTop = document.getElementById('scrollTop');

        // Scroll event listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        });

        // Tıklama eventi
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        //yukari cik butonu bitis