const nav = document.querySelector('.navbar');
fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
        nav.innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching navbar:', error);
    });
