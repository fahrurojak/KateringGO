// Utility function for DOM manipulation
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Menu toggle
const toggleMenu = () => {
    const menu = $('.menu');
    const faBars = $('.fa-bars');
    const faTimes = $('.fa-times');

    if (!menu || !faBars || !faTimes) {
        console.error('Menu toggle elements not found.');
        return;
    }

    menu.classList.toggle('hidden');
    faBars.classList.toggle('hidden');
    faTimes.classList.toggle('hidden');
    
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('absolute', 'top-16', 'w-full', 'left-0', 'bg-white', 'dark:bg-gray-800', 'divide-y', 'divide-gray-200', 'dark:divide-gray-700', 'shadow-lg');
    } else {
        menu.classList.remove('absolute', 'top-16', 'w-full', 'left-0', 'bg-white', 'dark:bg-gray-800', 'divide-y', 'divide-gray-200', 'dark:divide-gray-700', 'shadow-lg');
    }
};

const hamburgerMenu = $('.hamburger-menu');
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMenu);
} else {
    console.error('.hamburger-menu not found.');
}

// Smooth scrolling
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            toggleMenu(); // Close menu after navigation
        } else {
            console.error(`Target ${this.getAttribute('href')} not found.`);
        }
    });
});

// Form validation and submission
const form = $('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        $$('form input, form textarea').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            // Simulated form submission
            const formData = new FormData(e.target);
            fetch('https://api.example.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your message! We will get back to you soon.');
                e.target.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
} else {
    console.error('Form not found.');
}

// Lazy loading images
const lazyLoad = () => {
    const lazyImages = [].slice.call($$("img.lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        console.error('IntersectionObserver not supported.');
    }
};

// Animated counters
const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const increment = target / 200;

    const updateCount = () => {
        if(count < target) {
            count += increment;
            el.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target;
        }
    };

    updateCount();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

$$('.counter').forEach(counter => counterObserver.observe(counter));

// Infinite scroll for menu items (simulated)
let page = 1;
const loadMoreMenuItems = () => {
    // Simulated API call
    fetch(`https://api.example.com/menu?page=${page}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300';
                menuItem.innerHTML = `
                    <img src="${item.image}" class="w-full lazy" alt="${item.name}" />
                    <div class="p-5">
                        <h4 class="text-2xl font-bold text-center mb-2">${item.name}</h4>
                        <p class="text-gray-500 dark:text-gray-300 text-center">${item.description}</p>
                    </div>
                `;
                $('#menu .grid').appendChild(menuItem);
            });
            page++;
            lazyLoad();
        })
        .catch(error => console.error('Error loading menu items:', error));
};

// Intersection Observer for infinite scroll
const menuGrid = $('#menu .grid');
if (menuGrid && menuGrid.lastElementChild) {
    const infiniteScroll = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreMenuItems();
        }
    }, { threshold: 1 });

    infiniteScroll.observe(menuGrid.lastElementChild);
} else {
    console.error('Menu grid or its last element not found.');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lazyLoad();
    // Add more initialization if needed
});

// Add smooth animations on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.1 });

$$('.animate-on-scroll').forEach(el => animateOnScroll.observe(el));

// PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
