const foot = document.querySelector('.s-footer');
fetch('footer.html')
    .then(res => res.text())
    .then(data => {
        foot.innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching footer:', error);
    });
