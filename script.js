document.addEventListener('DOMContentLoaded', () => {
    function isValidDateOfBirth(dob) {
        const year = dob.getFullYear();
        return year > 1987;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function displayData() {
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        const storedData = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Stored Data:', storedData); // Debug log

        storedData.forEach(user => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = user.name;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = user.password;
            row.insertCell(3).textContent = user.dob;
            row.insertCell(4).textContent = user.terms ? 'Yes' : 'No';
        });
    }

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dobInput = document.getElementById('dob').value;
        const dob = new Date(dobInput);
        const terms = document.getElementById('terms').checked;

        const errors = [];

        if (!name) errors.push('Name is required.');
        if (!email.includes('@')) errors.push('Email must contain @.');
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special symbols.');
        }
        if (!isValidDateOfBirth(dob)) errors.push('Date of Birth must be between 18 and 55 years ago from today.');
        if (!terms) errors.push('You must accept the terms and conditions.');

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password,
            dob: formatDate(dob),
            terms: terms
        };

        let storedData = JSON.parse(localStorage.getItem('users')) || [];
        storedData.push(userData);
        localStorage.setItem('users', JSON.stringify(storedData));

        displayData();
    });

    displayData();
});
