document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').innerText = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // Scroll to the target element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.remove('py-4');
        navbar.classList.add('py-2', 'shadow-md');
      } else {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2', 'shadow-md');
      }
    });
  }

  // Gallery lightbox functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox .close');
  
  if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        const imgAlt = this.querySelector('img').getAttribute('alt');
        
        lightboxImg.setAttribute('src', imgSrc);
        lightboxImg.setAttribute('alt', imgAlt);
        
        // Show lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close lightbox when clicking on close button
    lightboxClose.addEventListener('click', function() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
      }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
      }
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('success-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      
      // Reset errors
      nameError.classList.add('hidden');
      emailError.classList.add('hidden');
      messageError.classList.add('hidden');
      
      // Validate form
      let isValid = true;
      
      if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.classList.remove('hidden');
        isValid = false;
      }
      
      if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.classList.remove('hidden');
        isValid = false;
      } else if (!validateEmail(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.remove('hidden');
        isValid = false;
      }
      
      if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        messageError.classList.remove('hidden');
        isValid = false;
      }
      
      // If valid, submit form (simulated)
      if (isValid) {
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', {
          name: name.value,
          email: email.value,
          phone: document.getElementById('phone').value,
          message: message.value
        });
        
        // Show success message and reset form
        successMessage.classList.remove('hidden');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
          successMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }

  // Newsletter form validation and submission
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterError = document.getElementById('newsletter-error');
  
  if (newsletterForm && newsletterEmail && newsletterError) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error
      newsletterError.classList.add('hidden');
      
      // Validate email
      if (!newsletterEmail.value.trim()) {
        newsletterError.textContent = 'Email is required';
        newsletterError.classList.remove('hidden');
        return;
      }
      
      if (!validateEmail(newsletterEmail.value)) {
        newsletterError.textContent = 'Please enter a valid email address';
        newsletterError.classList.remove('hidden');
        return;
      }
      
      // In a real application, you would send the data to a server here
      console.log('Newsletter subscription:', newsletterEmail.value);
      
      // Show success message and reset form
      newsletterSuccess.classList.remove('hidden');
      newsletterForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        newsletterSuccess.classList.add('hidden');
      }, 5000);
    });
  }

  // Email validation helper function
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});