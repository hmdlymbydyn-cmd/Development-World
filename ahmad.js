document.addEventListener('DOMContentLoaded', () => {
    // قائمة الموبايل (Mobile Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على أي رابط في الموبايل
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // تفعيل ضغطة كروت الخدمات لعرض نتائج العمل
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // التحقق مما إذا كان الكرت يحتوي على معرض أعمال أصلاً
            const hasGallery = this.querySelector('.service-gallery');
            if (hasGallery) {
                // إغلاق الكروت الأخرى المفتوحة ليكون الشكل مرتب
                serviceCards.forEach(c => {
                    if(c !== this) c.classList.remove('expanded');
                });
                
                // تبديل حالة الكرت الحالي لفتحه أو إغلاقه
                this.classList.toggle('expanded');
            }
        });
    });

    // حركة ظهور العناصر عند التمرير (Scroll Animation)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up').forEach(el => {
        el.classList.add('hidden-initially');
        observer.observe(el);
    });

    // سلايدر معرض الصور (Image Slider)
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slideCount = slides.length;

    function updateSlider() {
        // بما أن الموقع باللغة العربية (RTL)، الاتجاه الموجب يحرك لليمين لإظهار الصورة التالية
        slider.style.transform = `translateX(${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    });

    // تقليب الصور تلقائياً كل 5 ثواني
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }, 5000);
});