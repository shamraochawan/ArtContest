document.addEventListener('DOMContentLoaded', function() {
    // 1. Loading Screen Logic
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                document.getElementById('mainContent').style.display = 'block';
            }, 500);
        }
    }, 1500);

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 3. Login / Auth Logic
    let isLoggedIn = localStorage.getItem('artecertLoggedIn') === 'true';
    const authBanner = document.createElement('div');
    authBanner.id = 'authBanner';
    authBanner.className = 'auth-banner';
    authBanner.textContent = 'Login required to register or participate';
    document.body.prepend(authBanner);

    function updateAuthUI() {
        const authLink = document.querySelector('.nav-item a[href="Login/login.html"], .nav-item a[href="#"]');
        
        if (authLink) {
            if (isLoggedIn) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('artecertLoggedIn');
                    isLoggedIn = false;
                    updateAuthUI();
                    window.location.reload();
                };
                authBanner.classList.remove('show');
            } else {
                authLink.textContent = 'Login';
                authLink.href = 'Login/login.html'; 
                authLink.onclick = null;
            }
        }
    }
    updateAuthUI();

    if (window.location.search.includes('login=success')) {
        localStorage.setItem('artecertLoggedIn', 'true');
        isLoggedIn = true;
        window.history.replaceState({}, '', window.location.pathname);
        updateAuthUI();
    }

    // 4. Smooth Scroll & Navigation
    document.querySelectorAll('.nav-item a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.toLowerCase().includes('login') || !href.startsWith('#')) {
                return; 
            }

            if (this.textContent === 'Logout') return;

            e.preventDefault();

            if ((href === '#register' || this.textContent === 'Participate Now') && !isLoggedIn) {
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }

            if (mobileMenu) mobileMenu.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';

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

    const participateBtn = document.getElementById('participateBtn');
    if (participateBtn) {
        participateBtn.addEventListener('click', function(e) {
            if (!isLoggedIn) {
                e.preventDefault();
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }
            const registerLink = document.querySelector('.nav-item a[href="#register"]');
            if(registerLink) registerLink.click();
        });
    }

    // 5. Artwork Preview Logic
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

    // --- 6. FORM SUBMISSION LOGIC (UPDATED FOR INFINITYFREE) ---
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the 405 error

            if (!isLoggedIn) {
                authBanner.classList.add('show');
                setTimeout(() => authBanner.classList.remove('show'), 3000);
                return;
            }

            const formData = new FormData(registrationForm);
            const submitBtn = registrationForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // ⚠️ IMPORTANT: Replace the URL below with your InfinityFree link!
            // Example: 'http://shamraochawan.infinityfreeapp.com/connect.php'
            const apiUrl = 'http://arte-cert.kesug.com/connect.php'; 

            fetch(apiUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // CHANGED: We now expect JSON, not text
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Entry';

                // CHANGED: Check data.status instead of text string
                if (data.status === 'success') {
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.textContent = data.message; // Use message from PHP
                    } else {
                        alert(data.message);
                    }

                    registrationForm.reset();
                    if(previewContainer) previewContainer.innerHTML = '';

                    setTimeout(() => {
                        if (successMessage) successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Show specific error from PHP
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Entry';
                console.error("Fetch Error:", error);
                alert('Connection Failed. Check if InfinityFree link is correct.');
            });
        });
    }

    // Set first nav item active
    const firstNavItem = document.querySelector('.nav-item a');
    if (firstNavItem) firstNavItem.classList.add('active');
});
