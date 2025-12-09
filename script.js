document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading screen
    setTimeout(function() {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Login banner and state
    let isLoggedIn = localStorage.getItem('artecertLoggedIn') === 'true';
    const authBanner = document.createElement('div');
    authBanner.id = 'authBanner';
    authBanner.className = 'auth-banner';
    authBanner.textContent = 'Login required to register or participate';
    document.body.prepend(authBanner);

    // Update auth nav link
    function updateAuthUI() {
        // FIXED: Updated path to match your actual file 'Login/login.html'
        const authLink = document.querySelector('.nav-item a[href="Login/login.html"], .nav-item a[href="#"]');
        
        if (authLink) {
            if (isLoggedIn) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('artecertLoggedIn');
                    isLoggedIn = false;
                    updateAuthUI(); // Refresh nav state
                    window.location.reload(); // Reload to reset state cleanly
                };
                authBanner.classList.remove('show');
            } else {
                authLink.textContent = 'Login';
                // FIXED: Updated path to match 'Login/login.html'
                authLink.href = 'Login/login.html'; 
                authLink.onclick = null;
            }
        }
    }
    updateAuthUI();

    // Handle login redirect logic (if returning from login page)
    if (window.location.search.includes('login=success')) {
        localStorage.setItem('artecertLoggedIn', 'true');
        isLoggedIn = true;
        window.history.replaceState({}, '', window.location.pathname);
        updateAuthUI();
    }

    // Smooth scroll + auth check on nav click
    document.querySelectorAll('.nav-item a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // FIXED: Logic to detect Login page. 
            // If href contains "Login" (case insensitive) OR doesn't start with #, let it open normally.
            if (href.toLowerCase().includes('login') || !href.startsWith('#')) {
                return; 
            }

            if (this.textContent === 'Logout') return;

            e.preventDefault();

            // Restricted sections logic
            if ((href === '#register' || this.textContent === 'Participate Now') && !isLoggedIn) {
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }

            // Close mobile nav
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Handle Scrolling
            const targetSection = document.querySelector(href);
            if (targetSection) {
                document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');

                document.querySelectorAll('.nav-item a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Participate Now logic
    const participateBtn = document.getElementById('participateBtn');
    if (participateBtn) {
        participateBtn.addEventListener('click', function(e) {
            if (!isLoggedIn) {
                e.preventDefault();
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }
            // Trigger the click on the register link to handle navigation
            const registerLink = document.querySelector('.nav-item a[href="#register"]');
            if(registerLink) registerLink.click();
        });
    }

    // Artwork preview logic
    const artworkInput = document.getElementById('artwork_path');
    const previewContainer = document.getElementById('previewContainer');
    
    if (artworkInput) {
        artworkInput.addEventListener('change', function() {
            previewContainer.innerHTML = '';
            const file = this.files[0];
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds 2MB limit. Please choose a smaller file.');
                this.value = '';
                return;
            }

            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Only JPG/JPEG and PNG files are allowed.');
                this.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Artwork Preview';
                img.classList.add('preview-image');
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    // Form submission logic
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!isLoggedIn) {
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }

            const formData = new FormData(registrationForm);
            const submitBtn = registrationForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            fetch('connect.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Entry';

                if (data.trim() === 'success') {
                    successMessage.style.display = 'block';
                    successMessage.textContent = 'Registration successful! Your E-Certificate will be emailed to you shortly.';
                    registrationForm.reset();
                    if(previewContainer) previewContainer.innerHTML = '';

                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    alert('Error: ' + data);
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Entry';
                alert('An error occurred: ' + error);
            });
        });
    }

    // Set first nav item active
    const firstNavItem = document.querySelector('.nav-item a');
    if (firstNavItem) firstNavItem.classList.add('active');
});