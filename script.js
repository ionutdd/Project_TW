document.addEventListener('DOMContentLoaded', (event) => {
    // Selectarea unui element după ID
    let title = document.getElementById('title');

    // Modificarea stilului unui element
    title.style.color = "blue";

    // Crearea și adăugarea unui nou element
    let newParagraph = document.createElement('p');
    newParagraph.textContent = "This is a new paragraph.";
    document.body.appendChild(newParagraph);

    // Setarea unui interval
    setInterval(() => {
        // Schimbarea aleatorie a culorii titlului
        title.style.color = getRandomColor();
    }, 2000);

    // Folosirea setTimeout()
    setTimeout(() => {
        title.style.color = "green";
    }, 5000);

    setTimeout(() => {
        newParagraph.remove(); // Ștergerea paragrafului
    }, 10000);

    // Folosirea localStorage
    localStorage.setItem('name', 'John');
    let name = localStorage.getItem('name');
    console.log(name);

    // Folosirea unei metode a clasei Array
    let arr = [1, 2, 3, 4, 5];
    console.log(arr.length);

    // Eveniment de mouse
    title.addEventListener('mouseover', (event) => {
        event.target.style.color = "red";
        console.log('Current Target:', event.currentTarget);
    });

    // Eveniment de tastatură
    document.addEventListener('keydown', (event) => {
        console.log(`You pressed the ${event.key} key`);
    });

    // Folosirea preventDefault() și stopPropagation()
    let form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Validarea datelor din formular cu regex
        let email = document.querySelector('#email').value;
        let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!regex.test(email)) {
            alert('Invalid email address');
        }
    });

    // Folosirea metodei getComputedStyle()
    let computedStyle = window.getComputedStyle(title);
    console.log(computedStyle.fontFamily);

    // Folosirea metodei getBoundingClientRect()
    let rect = title.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
});

// Funcția pentru a obține o culoare aleatorie
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
