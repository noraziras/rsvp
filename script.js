if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        window.scrollTo(0, 0);
    }
});


// RSVP Form Submission - Fixed Version
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    // Don't prevent default - let it submit to iframe
    // e.preventDefault(); // Remove this line
    
    // Hide the form immediately
    document.querySelector('.rsvp-form').style.display = 'none';
    
    // Show and animate the success alert
    const successAlert = document.getElementById('successAlert');
    successAlert.style.display = 'block';
    successAlert.classList.add('show');
    
    // Reset form after a short delay
    setTimeout(() => {
        this.reset();
    }, 500);
    
    // Auto-hide alert after 5 seconds and reset everything
    setTimeout(() => {
        successAlert.classList.remove('show');
        setTimeout(() => {
            successAlert.style.display = 'none';
            document.querySelector('.rsvp-form').style.display = 'block';
            
            
            // Reset any other UI elements if needed
            if (typeof $ !== 'undefined' && $('#collapseExample').length) {
                $('#collapseExample').collapse('hide');
            }
            document.querySelectorAll('.rsvp-option').forEach(opt => {
                opt.classList.remove('selected');
            });

        }, 150); // Wait for fade out animation
    }, 5000);
    
});

// Optional: Add iframe load event listener for extra confirmation
window.addEventListener('load', function() {
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
    if (iframe) {
        iframe.onload = function() {
            console.log('Form submitted successfully to Google Forms');
        };
    }
});

     function clearForm() {             
            document.getElementById('rsvpForm').reset(); 
        }




        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add active class to navigation based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });


            // Wedding date 
        const weddingDate = new Date('2025-09-06T10:00:00').getTime();
        
        // Countdown timer function
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;
            
            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                // Wedding day has arrived!
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                
                // Could add special message here
                document.querySelector('.countdown-container').innerHTML = 
                    '<div class="text-center"><h3>🎉 Hari Bahagia Telah Tiba! 🎉</h3></div>';
            }
        }
    
        // Start countdown timer
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Cancel button functionality
document.getElementById('cancelBtn').addEventListener('click', function() {
    // Clear the RSVP form
    document.getElementById('rsvpForm').reset();
    
    // Hide success alert if it's showing
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
        successAlert.style.display = 'none';
        successAlert.classList.remove('show');
    }
    
    // Smooth scroll to home section
    const homeSection = document.getElementById('home') || document.querySelector('.hero') || document.querySelector('section:first-of-type');
    if (homeSection) {
        homeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Fallback: scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});





// Wedding event details
       // Wrap everything in an IIFE to avoid variable conflicts
        $(document).ready(function() {
            let calendarCurrentMonth = 8; // September (0-indexed)
            let calendarCurrentYear = 2025;
            const calendarPublicHoliday = new Date(2025, 8, 5); // September 5, 2025 - Hari Maulidur Rasul
            const calendarPublicHoliday2 = new Date(2025, 8, 16); // September 5, 2025 - Hari Malaysia
            const calendarWeddingDate = new Date(2025, 8, 6); // September 6, 2025
            const calendarToday = new Date();

            const calendarMonths = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const calendarDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            function generateCalendar() {
                const firstDay = new Date(calendarCurrentYear, calendarCurrentMonth, 1);
                const lastDay = new Date(calendarCurrentYear, calendarCurrentMonth + 1, 0);
                const startDate = new Date(firstDay);
                startDate.setDate(startDate.getDate() - firstDay.getDay());

                const calendarGrid = $('#calendarGrid');
                const monthYear = $('#monthYear');

             
                
                monthYear.text(`${calendarMonths[calendarCurrentMonth]} ${calendarCurrentYear}`);
                calendarGrid.empty();

                // Add day headers
                calendarDayHeaders.forEach(day => {
                    const dayHeader = $('<div class="calendar-day-header"></div>').text(day);
                    calendarGrid.append(dayHeader);
                });

                // Generate calendar days
                const currentDate = new Date(startDate);
                for (let i = 0; i < 42; i++) {
                    const dayElement = $('<div class="calendar-day"></div>').text(currentDate.getDate());

                    // Check if it's outside current month
                    if (currentDate.getMonth() !== calendarCurrentMonth) {
                        dayElement.addClass('other-month');
                    }

                    // Check if it's today
                    if (currentDate.toDateString() === calendarToday.toDateString()) {
                        dayElement.addClass('today');
                    }

                    // Check if it's a public holiday (Hari Maulidur Rasul)
                    if (currentDate.toDateString() === calendarPublicHoliday.toDateString()) {
                        dayElement.addClass('public-holiday');
                        const holidayLabel = $('<div class="event-label holiday-label"></div>');
                        dayElement.append(holidayLabel);
                        
                        // Add tooltip or title for more information
                        dayElement.attr('title', 'Hari Maulidur Rasul (Public Holiday)');
                    }

                    
                    // Check if it's a public holiday (Hari Malaysia)
                    if (currentDate.toDateString() === calendarPublicHoliday2.toDateString()) {
                        dayElement.addClass('public-holiday');
                        const holidayLabel = $('<div class="event-label holiday-label"></div>');
                        dayElement.append(holidayLabel);
                        
                        // Add tooltip or title for more information
                        dayElement.attr('title', 'Hari Malaysia (Public Holiday)');
                    }

                    // Check if it's the wedding date
                    if (currentDate.toDateString() === calendarWeddingDate.toDateString()) {
                        dayElement.addClass('wedding-day');
                         // Add tooltip or title for more information
                        dayElement.attr('title', 'The Wedding Day!');
                    }

               

                    calendarGrid.append(dayElement);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }

            // Make functions globally accessible
            window.changeMonth = function(direction) {
                calendarCurrentMonth += direction;
                if (calendarCurrentMonth > 11) {
                    calendarCurrentMonth = 0;
                    calendarCurrentYear++;
                } else if (calendarCurrentMonth < 0) {
                    calendarCurrentMonth = 11;
                    calendarCurrentYear--;
                }
                generateCalendar();
            };

            // Make shareEvent globally accessible
            window.shareEvent = function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Azira & Nizam Wedding',
                        text: 'You are invited to Azira & Nizam Wedding Ceremony on September 6, 2025',
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    const text = 'You are invited to Azira & Nizam Wedding Ceremony on September 6, 2025 at Dewan Lakis Sibu';
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(text).then(() => {
                            alert('Event details copied to clipboard!');
                        });
                    } else {
                        alert('Event details: ' + text);
                    }
                }
            };

            // Calendar integration functions
            $('#googleCalendar').on('click', function(e) {
                e.preventDefault();
                const startDate = '20250906T020000Z'; // 10 AM MYT
                const endDate = '20250906T060000Z';   // 2 PM MYT  
                const title = encodeURIComponent('Azira & Nizam Wedding Ceremony');
                const details = encodeURIComponent('Wedding ceremony at Dewan Lakis Sibu');
                const location = encodeURIComponent('Dewan Lakis Sibu, Jalan Masjid, Pekan Sibu, 96000 Sibu, Sarawak');
                
                const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
                window.open(googleUrl, '_blank');
            });

            $('#appleCalendar').on('click', function(e) {
                e.preventDefault();
                // Create ICS file for Apple Calendar
                const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Calendar//EN
BEGIN:VEVENT
UID:wedding-azira-nizam-2025@example.com
DTSTAMP:20250618T000000Z
DTSTART:20250906T020000Z
DTEND:20250906T060000Z
SUMMARY:Azira & Nizam Wedding Ceremony
DESCRIPTION:Wedding ceremony celebration
LOCATION:Dewan Lakis Sibu, Jalan Masjid, Pekan Sibu, 96000 Sibu, Sarawak
END:VEVENT
END:VCALENDAR`;

                const blob = new Blob([icsContent], { type: 'text/calendar' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'wedding-invitation.ics';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });

            $('#outlookCalendar').on('click', function(e) {
                e.preventDefault();
                const startDate = '2025-09-06T10:00:00'; 
                const endDate = '2025-09-06T23:00:00';
                const title = encodeURIComponent('Majlis Perkahwinan Azira & Nizam');
                const body = encodeURIComponent('Majlis Resepsi (10:00 AM)\\n\\nLokasi: Jalan Masjid, Pekan Sibu, Sarawak');
                const location = encodeURIComponent('Jalan Masjid, Pekan Sibu, 96000 Sibu, Sarawak');
                
                const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${body}&location=${location}`;
                window.open(outlookUrl, '_blank');
            });

            // Initialize calendar when modal is shown
            $('#Calendar-Modal').on('shown.bs.modal', function() {
                generateCalendar();
            });

            // Initialize calendar immediately
            generateCalendar();
        });

        
        //GALLERY SLIDES SECTION JS//
        let currentSlide2 = 0;
        const slides = document.querySelectorAll('.slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const totalSlides = slides.length;
        const autoSlideInterval = 4000; // 4 seconds
        let autoSlideTimer;
        let progressTimer;

        document.getElementById('total-slides').textContent = totalSlides;

            function showSlide(index) {
            // Remove active class from all slides and thumbnails
            slides.forEach(slide => slide.classList.remove('active'));
            thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
            
            // Add active class to current slide and thumbnail
            slides[index].classList.add('active');
            thumbnails[index].classList.add('active');
            
            // Update counter when transition is complete
            setTimeout(() => {
                document.getElementById('current-slide').textContent = index + 1;
            }, 1000); // Full transition duration (matches CSS transition: opacity 1s)
            
            currentSlide2 = index;
        }

                // Add this function to your existing JavaScript
        function updateBlurBackground() {
            slides.forEach((slide, index) => {
                const bgImage = slide.getAttribute('data-bg');
                slide.style.backgroundImage = `url(${bgImage})`;
            });
        }

        // Call this function when the page loads (add to your existing code)
        updateBlurBackground();

        function nextSlide() {
            currentSlide2 = (currentSlide2 + 1) % totalSlides;
            showSlide(currentSlide2);
        }

        function prevSlide() {
            currentSlide2 = (currentSlide2 - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide2);
        }

        function changeSlide(direction) {
            clearInterval(autoSlideTimer);
            clearInterval(progressTimer);
            
            if (direction === 1) {
                nextSlide();
            } else {
                prevSlide();
            }
            
            startAutoSlide();
        }

        function goToSlide(index) {
            clearInterval(autoSlideTimer);
            clearInterval(progressTimer);
            showSlide(index);
            startAutoSlide();
        }

        function updateProgress() {
            const progressBar = document.getElementById('progress-bar');
            let width = 0;
            const increment = 100 / (autoSlideInterval / 100);
            
            progressTimer = setInterval(() => {
                width += increment;
                progressBar.style.width = width + '%';
                
                if (width >= 100) {
                    clearInterval(progressTimer);
                }
            }, 100);
        }

        function resetProgress() {
            const progressBar = document.getElementById('progress-bar');
            progressBar.style.width = '0%';
            clearInterval(progressTimer);
            updateProgress();
        }

        function startAutoSlide() {
            autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
            updateProgress();
        }

        // Pause auto-slide on hover
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideTimer);
            clearInterval(progressTimer);
        });

        galleryContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Start auto-slide when page loads
        startAutoSlide();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });


 
        // Modified JavaScript for auto-sliding carousel
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzLcsi5FS8xO6p4J_3dj8t3kfZi3KSomXgSjs_eMI-cylGJJ-M2zBNko0eeOHgHD5TN/exec';

        let currentSlide = 0;
        let wishesData = [];
        let slideInterval;

        // Try to fetch from Google Sheets, fallback to sample data
        fetch(scriptURL)
            .then(res => res.json())
            .then(data => {
                wishesData = data && data.length > 0 ? data : sampleWishesData;
                initializeSlider2();
            })
            .catch(err => {
                console.error('Error loading from Google Sheets, using sample data:', err);
                wishesData = sampleWishesData;
                initializeSlider2();
            });

        function initializeSlider2() {
            if (wishesData.length > 0) {
                createSlider2();
                startAutoSlide2();
                setupEventListeners2();
            }
        }

        function createSlider2() {
            const totalDots = Math.min(5, wishesData.length); // Don't create more dots than we have slides
            
            let html = `
                <div class="wishes-slider">
                    <div class="slider-container">
                        ${wishesData.map((entry, index) => `
                            <div class="wish-slide ${index === 0 ? 'active' : ''}">
                                <div class="wish-card">
                                    <div class="wish-header">
                                        <h3 class="wish-title">wish us! 🤗</h3>
                                    </div>
                                    <div class="wish-content">
                                        <p class="wish-message">${entry.wish}</p>
                                        <p class="wish-name">@${entry.name}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="slider-dots">
                        ${Array.from({ length: totalDots }).map((_, index) => `
                            <span class="dot ${index === 0 ? 'active' : ''}" data-group="${index}"></span>
                        `).join('')}
                    </div>
                </div>
            `;
            document.getElementById('rsvp-list').innerHTML = html;
        }

        function setupEventListeners2() {
            // Add click event listeners to dots after they're created
            setTimeout(() => {
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => goToGroup2(index));
                });

                // Add hover event listeners to pause/resume auto-slide
                const slider = document.querySelector('.wishes-slider');
                if (slider) {
                    slider.addEventListener('mouseenter', stopAutoSlide2);
                    slider.addEventListener('mouseleave', startAutoSlide2);
                }
            }, 100);
        }

        function goToGroup2(dotIndex) {
            const totalDots = Math.min(5, wishesData.length);
            const groupSize = Math.ceil(wishesData.length / totalDots);
            const targetSlide = Math.min(dotIndex * groupSize, wishesData.length - 1);

            goToSlide2(targetSlide);
        }

        function goToSlide2(slideIndex) {
            // Ensure slideIndex is within bounds
            if (slideIndex < 0 || slideIndex >= wishesData.length) return;

            // Remove active class from current slide
            const currentActiveSlide = document.querySelector('.wish-slide.active');
            if (currentActiveSlide) {
                currentActiveSlide.classList.remove('active');
            }

            // Add active class to new slide
            const slides = document.querySelectorAll('.wish-slide');
            if (slides[slideIndex]) {
                slides[slideIndex].classList.add('active');
            }

            currentSlide = slideIndex;

            // Update dots based on groups
            const totalDots = Math.min(5, wishesData.length);
            const groupSize = Math.ceil(wishesData.length / totalDots);
            const activeDotIndex = Math.floor(slideIndex / groupSize);

            // Update dot active status
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            const dots = document.querySelectorAll('.dot');
            if (dots[activeDotIndex]) {
                dots[activeDotIndex].classList.add('active');
            }
        }

        function nextSlide2() {
            const nextIndex = (currentSlide + 1) % wishesData.length;
            goToSlide2(nextIndex);
        }

        function startAutoSlide2() {
            // Clear any existing interval first
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            // Auto slide every 3 seconds
            slideInterval = setInterval(nextSlide2, 3000);
        }

        function stopAutoSlide2() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
     
        