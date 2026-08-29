  document.getElementById('contactForm').addEventListener('submit', function(e) {
    // 1. Stop the form from submitting and redirecting the page normally
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerText;

    // 2. Change button text to show it's loading
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // 3. Gather form data
    const formData = new FormData(form);

    // 4. Send the data using Fetch API
    fetch(form.action, {
      method: 'POST',
      body: formData,
      // This header is CRUCIAL for FormSubmit. It tells FormSubmit 
      // to return a JSON response instead of redirecting to an HTML page.
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // SUCCESS: Clear the form and show a success message
        form.reset();
        
        // You can replace this alert with a custom HTML message if you prefer
        alert('Thank you! Your message has been sent successfully.'); 
      } else {
        throw new Error('Form submission failed.');
      }
    })
    .catch(error => {
      // ERROR: Handle any network or server errors
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again later.');
    })
    .finally(() => {
      // 5. Reset the button text and re-enable it
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    });
  });