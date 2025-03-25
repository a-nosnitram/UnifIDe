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

// const cards = document.querySelectorAll('.card');
// const maxTilt = 20;

// cards.forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//         const { left, top, width, height } = card.getBoundingClientRect();

//         const x = ((e.clientX - left) / width - 0.5) * 2;
//         const y = ((e.clientY - top) / height - 0.5) * -2;

//         const tiltX = y * maxTilt;
//         const tiltY = x * maxTilt;

//         card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;


//     });
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = `rotateX(0deg) rotateY(0deg)`;
//     });
// });

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