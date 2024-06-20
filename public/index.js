let emailCount = 1;
let phoneNumberCount = 1;

function addEmail() {
    emailCount++;
    const emailsDiv = document.getElementById('emails');
    const newEmailDiv = document.createElement('div');
    newEmailDiv.className = 'form-group';
    newEmailDiv.innerHTML = `
        <label for="email${emailCount}">Email:</label>
        <input type="email" id="email${emailCount}" name="emails[]" required>
    `;
    emailsDiv.appendChild(newEmailDiv);
}

function addPhoneNumber() {
    phoneNumberCount++;
    const phoneNumbersDiv = document.getElementById('phoneNumbers');
    const newPhoneNumberDiv = document.createElement('div');
    newPhoneNumberDiv.className = 'form-group';
    newPhoneNumberDiv.innerHTML = `
        <label for="phone${phoneNumberCount}">Phone Number:</label>
        <input type="tel" id="phone${phoneNumberCount}" name="phoneNumbers[]" required>
    `;
    phoneNumbersDiv.appendChild(newPhoneNumberDiv);
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        if (!data[key]) {
            data[key] = value;
        } else {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        }
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Form submitted successfully');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form');
    });
});