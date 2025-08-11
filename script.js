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
 
    // Hide the form immediately
    document.querySelector('.rsvp-form').style.display = 'none';
    
    // Show and animate the success alert
    const successAlert = document.getElementById('successAlert');
    successAlert.style.display = 'block';
    successAlert.classList.add('show');
    
    // Reset form after a short delay
    setTimeout(() => {
        this.reset();
    }, 300);
    
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
    }, 3000);
    
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
            //const calendarPublicHoliday = new Date(2025, 8, 5); // September 5, 2025 - Hari Maulidur Rasul
            //const calendarPublicHoliday2 = new Date(2025, 8, 16); // September 5, 2025 - Hari Malaysia
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
                   /* if (currentDate.toDateString() === calendarPublicHoliday.toDateString()) {
                        dayElement.addClass('public-holiday');
                        const holidayLabel = $('<div class="event-label holiday-label"></div>');
                        dayElement.append(holidayLabel);
                        
                        // Add tooltip or title for more information
                        dayElement.attr('title', 'Hari Maulidur Rasul (Public Holiday)');
                    }*/

                    
                    // Check if it's a public holiday (Hari Malaysia)
                  /*  if (currentDate.toDateString() === calendarPublicHoliday2.toDateString()) {
                        dayElement.addClass('public-holiday');
                        const holidayLabel = $('<div class="event-label holiday-label"></div>');
                        dayElement.append(holidayLabel);
                        
                        // Add tooltip or title for more information
                        dayElement.attr('title', 'Hari Malaysia (Public Holiday)');
                    }*/

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

                // Add this function for blurring img
        function updateBlurBackground() {
            slides.forEach((slide, index) => {
                const bgImage = slide.getAttribute('data-bg');
                slide.style.backgroundImage = `url(${bgImage})`;
            });
        }

        // Call this function when the page loads
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


 /////////////////////////////////////////////////////////UCAPAN SLIDES///////////////////////////////////////////////////////////////////////
class GuestbookCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 0;
                this.isAutoSliding = true;
                this.autoSlideInterval = 5000; // 5 seconds
                this.intervalId = null;
                this.progressInterval = null;
                this.messagesData = [];

                
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.pauseBtn = document.getElementById('pauseBtn');
                this.dotsContainer = document.getElementById('dotsContainer');
                this.timerText = document.getElementById('timer-text');
                this.progressBar = document.getElementById('progressBar');
                
                // Google Sheets configuration
                this.SHEET_ID = '1lptM9ofvL1NvmdtDfaAM67_EIo1ySd45RxlEtCXJCNk'; // sheet ID
                this.API_KEY = 'AIzaSyAudTvnsXpAdTOXKz7YzWe2JalqnJyfANg'; // API key
                this.RANGE = "'Form Responses 1'!A:G"; // Fixed: Get all columns to ensure proper indexing

                this.init3();
            }
            
            init3() {
                this.showLoadingState3();
                this.loadGuestbookData3();
                this.attachEventListeners3();
                
            }
            
            async loadGuestbookData3() {
                try {
                    const response = await fetch(
                        `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.RANGE}?key=${this.API_KEY}`
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from Google Sheets');
                    }
                    
                    const data = await response.json();
                    this.processSheetData3(data.values);
                } catch (error) {
                    console.error('Error loading guestbook data:', error);
                    this.showErrorState3();
                }
            }
            
            
            processSheetData3(rows) {
                // Stop any existing timers first
                this.stopAutoSlide3();
                
                if (!rows || rows.length <= 1) {
                    this.showEmptyState3();
                    return;
                }
                
                console.log('Processing rows:', rows); // Debug log
                
                // Skip header row
                const dataRows = rows.slice(1);
                
                 // Process each row into message objects
                this.messagesData = dataRows
                    .filter(row => row && row.length > 1 && row[1] && row[5])
                    .map(row => ({
                        name: row[1] || 'Tanpa Nama',
                        message: row[5] || '',
                        timestamp: row[0] || '' // Add timestamp from column A
                    }))
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp, newest first
                    .slice(0, 15); // Limit to the 15 most recent messages
                
                console.log('Processed messages:', this.messagesData); // Debug log
                
                if (this.messagesData.length === 0) {
                    this.showEmptyState3();
                    return;
                }
                
                this.createSlidesFromData3();
                this.totalSlides = Math.ceil(this.messagesData.length / 3);
                this.createDots3();
                
                // Reset to first slide
                this.currentSlide = 0;
                this.updateDisplay3();
                
                // Start auto-slides fresh
                if (this.isAutoSliding) {
                    this.startAutoSlides3();
                }
            }
            
            createSlidesFromData3() {
                this.track.innerHTML = ''; // Clear existing content
                
                // Group messages into slides of 3
                for (let i = 0; i < this.messagesData.length; i += 3) {
                    const slideMessages = this.messagesData.slice(i, i + 3);
                    const slide = this.createSlide3(slideMessages);
                    this.track.appendChild(slide);
                }
            }
            
            createSlide3(messages) {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                
                messages.forEach(msg => {
                    const card = this.createMessageCard3(msg);
                    slide.appendChild(card);
                });
                
                // Fill empty slots if less than 3 messages
                while (slide.children.length < 3) {
                    const emptyCard = document.createElement('div');
                    emptyCard.className = 'message-card empty-card';
                    emptyCard.style.opacity = '0.3';
                    emptyCard.innerHTML = `
                        <div class="wish-header">menunggu ucapan...</div>
                        <div class="message-text">
                            <em>Menunggu ucapan indah dari tetamu lain! ✨</em>
                        </div>
                        <div class="message-author">@TetamuKami</div>
                    `;
                    slide.appendChild(emptyCard);
                }
                
                return slide;
            }
            
            createMessageCard3(messageData) {
                const card = document.createElement('div');
                card.className = 'message-card';
                
                // Format the name to look like a username
                const displayName = messageData.name.startsWith('@') 
                    ? messageData.name 
                    : `@${messageData.name.replace(/\s+/g, '_')}`;
                
                card.innerHTML = `
                    <div class="wish-header">wish us!</div>
                    <div class="message-text">"${this.escapeHtml3(messageData.message)}"</div>
                    <div class="message-author">${this.escapeHtml3(displayName)}</div>
                `;
                
                return card;
            }
            
            escapeHtml3(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            showLoadingState3() {
                this.track.innerHTML = `
                    <div class="carousel-slide">
                        <div class="message-card">
                            <div class="wish-header">Sedang Memuatkan...</div>
                            <div class="message-text">
                                <em>Sedang memuatkan ucapan indah daripada tetamu... 💫</em>
                            </div>
                            <div class="message-author">@Sila_Tunggu</div>
                        </div>
                        <div class="message-card">
                            <div class="wish-header">Sedang Memuatkan...</div>
                            <div class="message-text">
                                <em>Mengambil ucapan yang penuh kasih sayang... 💝</em>
                            </div>
                            <div class="message-author">@Hampir_Siap</div>
                        </div>
                        <div class="message-card">
                            <div class="wish-header">Sedang Memuatkan...</div>
                            <div class="message-text">
                                <em>Menyediakan ucapan tetamu untuk anda... 🎉</em>
                            </div>
                            <div class="message-author">@Memuatkan_love</div>
                        </div>
                    </div>
                `;
            }
            
            showErrorState3() {
                this.track.innerHTML = `
                       <div class="carousel-slide">
                        <div class="message-card" style="border-left-color: #f39c12;">
                            <div class="wish-header" style="background: #f39c12;">Maaf!</div>
                            <div class="message-text">
                                <em>Tidak dapat memuatkan ucapan sekarang. Sila semak konfigurasi Google Sheets anda dan cuba lagi. 🔧</em>
                            </div>
                            <div class="message-author">@Mesej_Sistem</div>
                        </div>
                        <div class="message-card empty-card" style="opacity: 0.3;">
                            <div class="wish-header">Konfigurasi</div>
                            <div class="message-text">
                                <em>Pastikan Sheet ID dan API Key ditetapkan dengan betul.</em>
                            </div>
                            <div class="message-author">@Perlu_Bantuan</div>
                        </div>
                        <div class="message-card empty-card" style="opacity: 0.3;">
                            <div class="wish-header">Sokongan</div>
                            <div class="message-text">
                                <em>Semak console untuk mesej ralat terperinci.</em>
                            </div>
                            <div class="message-author">@Info_Debug</div>
                        </div>
                    </div>
                `;
            }
            
            showEmptyState3() {
                this.track.innerHTML = `
                    <div class="carousel-slide">
                        <div class="message-card">
                            <div class="wish-header">Jadilah Yang Pertama!</div>
                            <div class="message-text">
                                <em>Jadilah yang pertama meninggalkan ucapan indah untuk pasangan bahagia! Ucapan anda akan muncul di sini. 💕</em>
                            </div>
                            <div class="message-author">@Pengucap_Pertama</div>
                        </div>
                        <div class="message-card empty-card" style="opacity: 0.3;">
                            <div class="wish-header">menunggu...</div>
                            <div class="message-text">
                                <em>Menunggu ucapan yang seterusnya! ✨</em>
                            </div>
                            <div class="message-author">@Tetamu_Masa_Depan</div>
                        </div>
                        <div class="message-card empty-card" style="opacity: 0.3;">
                            <div class="wish-header">akan datang...</div>
                            <div class="message-text">
                                <em>Ucapan indah anda akan memenuhi ruang ini! 🌟</em>
                            </div>
                            <div class="message-author">@Nota_Love</div>
                        </div>
                    </div>
                `;
            }
            
            createDots3() {
                this.dotsContainer.innerHTML = ''; // Clear existing dots
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide3(i));
                    this.dotsContainer.appendChild(dot);
                }
            }
            
            // Method to refresh data from Google Sheets
            async refreshData3() {
                    // Stop all auto-slide activities first
                    this.stopAutoSlide3();
                    
                    // Reset current slide to 0
                    this.currentSlide = 0;
                    
                    // Show loading state
                    this.showLoadingState3();
                    
                    // Clear existing dots
                    this.dotsContainer.innerHTML = '';
                    
                    try {
                        // Load new data
                        await this.loadGuestbookData3();
                    } catch (error) {
                        console.error('Error during refresh:', error);
                        this.showErrorState3();
                    }
                }
            
            updateDisplay3() {
                this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                
                // Update dots
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
                
                // Update navigation buttons
                this.prevBtn.disabled = this.currentSlide === 0;
                this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            }
            
            goToSlide3(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateDisplay3();
                this.resetAutoSlide3();
            }
            
            nextSlide3() {
                if (this.currentSlide < this.totalSlides - 1) {
                    this.currentSlide++;
                } else {
                    this.currentSlide = 0; // Loop back to first slide
                }
                this.updateDisplay3();
            }
            
            prevSlide3() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                } else {
                    this.currentSlide = this.totalSlides - 1; // Loop to last slide
                }
                this.updateDisplay3();
            }
            
            startAutoSlides3() {
                if (!this.isAutoSliding) return;
                
                this.intervalId = setInterval(() => {
                    this.nextSlide3();
                }, this.autoSlideInterval);
                
                this.startProgressBar3();
                this.pauseBtn.innerHTML = '⏸ Pause';
            }
            
            stopAutoSlide3() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
                if (this.progressInterval) {
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
                this.progressBar.style.width = '0%';
                this.pauseBtn.innerHTML = '▶ Play';
            }
            
            resetAutoSlide3() {
                this.stopAutoSlide3();
                if (this.isAutoSliding) {
                    this.startAutoSlides3();
                }
            }
            
            toggleAutoSlide3() {
                this.isAutoSliding = !this.isAutoSliding;
                if (this.isAutoSliding) {
                    this.startAutoSlides3();
                } else {
                    this.stopAutoSlide3();
                }
            }
            
            startProgressBar3() {
                let progress = 0;
                const increment = 100 / (this.autoSlideInterval / 100);
                
                this.progressInterval = setInterval(() => {
                    progress += increment;
                    if (progress >= 100) {
                        progress = 0;
                    }
                    this.progressBar.style.width = progress + '%';
                    
                    // Update timer text
                    const remainingTime = Math.ceil((100 - progress) / increment * 100 / 1000);
                    this.timerText.textContent = this.isAutoSliding ? `Seterusnya dalam ${remainingTime}s` : 'Paused';
                }, 100);
            }
            
            attachEventListeners3() {
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide3();
                    this.resetAutoSlide3();
                });
                
                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide3();
                    this.resetAutoSlide3();
                });
                
                this.pauseBtn.addEventListener('click', () => {
                    this.toggleAutoSlide3();
                });
                
                // Add refresh button listener
                const refreshBtn = document.getElementById('refreshBtn');
                refreshBtn.addEventListener('click', () => {
                    this.refreshData3();
                });
                
                // Pause on hover
                const container = document.querySelector('.carousel-container');
                container.addEventListener('mouseenter', () => {
                    if (this.isAutoSliding) {
                        this.stopAutoSlide3();
                    }
                });
                
                container.addEventListener('mouseleave', () => {
                    if (this.isAutoSliding) {
                        this.startAutoSlides3();
                    }
                });
                
                // Touch/swipe support for mobile
                let startX = 0;
                let endX = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.nextSlide3();
                        } else {
                            this.prevSlide3();
                        }
                        this.resetAutoSlide3();
                    }
                });
            }
        }
        
        // Initialize the carousel when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new GuestbookCarousel();
        });

function copyAccountNumber() {
    const accountNumber = document.getElementById('account-number').textContent;
    navigator.clipboard.writeText(accountNumber).then(function() {
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}
        


