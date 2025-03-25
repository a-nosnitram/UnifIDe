const phone = document.querySelector('.phone');
const phone_depth = document.querySelector('.phone-depth');

document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;

    const middleW = innerWidth / 2;
    const middleH = innerHeight / 2;

    const perX = (e.clientX - middleW)/ middleW ;
    const perY = (e.clientY - middleH) / middleH;

    // imma get that offset from the middle of the page
    const offX = ((e.clientX - middleW) / middleW) * 20; // percentage offset
    const offY = ((e.clientY - middleH) / middleH) * -20;

    phone.style.transform = `rotateX(${offY}deg) rotateY(${offX}deg)`;
    phone_depth.style.transform = `rotateX(${offY}deg) rotateY(${offX}deg) translateX(${-perX*5}px) translateY(${-perY*5}px)`;
});

// document.addEventListener('click',async () => {
//     phone.style.zIndex = 0;
//     phone_depth.style.zIndex = 8;
//     phone.style.transform = `rotateY(180deg) translateY(-30px)`;
//     phone_depth.style.transform = `rotateY(180deg) translateY(-30px)`;


//     await new Promise(r => setTimeout(r, 250));

//     phone.style.zIndex = 8;
//     phone_depth.style.zIndex = 0;
//     phone.style.transform = `rotateY(360deg) translateY(30px)`;
//     phone_depth.style.transform = `rotateY(360deg) translateY(30px)`;


// })

const cards = document.querySelectorAll('.card');
const card_type = document.getElementById('card-type');
const card_title = document.getElementById('card-title');

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        active = index;
        if (card.id === "id-card") {
            card_type.innerText = "Matriculation";
        } else if (card.id === "meal-card") {
            card_type.innerText = "Meal";
        } else {
            card_type.innerText = "Library";
        }
        card_title.classList.add("shake");
        setTimeout(() => {
            card_title.classList.remove("shake");
          }, 500);

        cards.forEach((c, i) => {
            if (i == active) {
                c.style.top =  `90px`;
                c.style.zIndex = 12;
                c.style.filter = `brightness(1)`;
            } else if ((i + 1) % 3 === active) {
                c.style.top =  `410px`;
                c.style.zIndex = 11;
                c.style.filter = `brightness(0.95)`;
            } else {
                c.style.top =  `340px`;
                c.style.zIndex = 10;
                c.style.filter = `brightness(0.9)`;
            }
        })

    })
})

const lines = document.querySelectorAll('.menu-line');
const menu_icon = document.querySelector('.menu-icon');

menu_icon.addEventListener('mousemove', () => {
    lines.forEach((line, index) => {
        let mv = (index % 3 === 0) ? 2 : -2;
        line.style.transform = `translateX(${mv}px)`;
    });

});

menu_icon.addEventListener('mouseleave', () => {
    lines.forEach(line => {
      line.style.transform = 'translateY(0px)';
    });
  });
