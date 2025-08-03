const phone = document.querySelector('.phone');
const phone_depth = document.querySelector('.phone-depth');

document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;

    const middleW = innerWidth / 2;
    const middleH = innerHeight / 2;

    const perX = (e.clientX - middleW) / middleW;
    const perY = (e.clientY - middleH) / middleH;

    // imma get that offset from the middle of the page
    const offX = ((e.clientX - middleW) / middleW) * 20; // percentage offset
    const offY = ((e.clientY - middleH) / middleH) * -20;

    phone.style.transform = `rotateX(${offY}deg) rotateY(${offX}deg)`;
    phone_depth.style.transform = `rotateX(${offY}deg) rotateY(${offX}deg) translateX(${-perX * 5}px) translateY(${-perY * 5}px)`;
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
                c.style.top = `90px`;
                c.style.zIndex = 12;
                c.style.filter = `brightness(1)`;
            } else if ((i + 1) % 3 === active) {
                c.style.top = `410px`;
                c.style.zIndex = 11;
                c.style.filter = `brightness(0.95)`;
            } else {
                c.style.top = `340px`;
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

// lets make that scroll smoooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function drawConnectors() {
    const layer = document.querySelector('.connectors-layer');
    layer.innerHTML = ''; // clear old lines

    const featureItems = document.querySelectorAll('.feature-item-left, .feature-item-right');

    featureItems.forEach(item => {
        const targetSelector = item.getAttribute('data-target');
        const target = document.querySelector(targetSelector);
        if (!target) {
            console.log("no target");
            return;
        }

        const yAdjustment = item.getAttribute('y-adjustment') || 0;
        console.log(`yAdjustment for ${item.id}: ${yAdjustment}`);
        const yAdjustmentValue = parseInt(yAdjustment, 10) || 0;

        const itemRect = item.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const containerRect = layer.getBoundingClientRect();

        const isLeft = item.closest('.left-container') !== null;

        const rawX1 = isLeft
            ? itemRect.right - containerRect.left
            : itemRect.left - containerRect.left;

        const rawY1 = itemRect.top + itemRect.height / 2 - containerRect.top - 30;
        const x2 = targetRect.left + targetRect.width / 2 - containerRect.left;
        const y2 = targetRect.top + targetRect.height / 2 - containerRect.top + yAdjustmentValue;

        const dx = x2 - rawX1;
        const dy = y2 - rawY1;
        const length = Math.hypot(dx, dy);

        if (length === 0) return; // avoid divide by 0

        const paddingStart = 10; // pixels after feature
        const paddingEnd = 40;   // pixels before target

        const ux = dx / length; // unit vector x
        const uy = dy / length; // unit vector y

        const x1 = rawX1 + ux * paddingStart;
        const y1 = rawY1 + uy * paddingStart - 18;

        const finalLength = Math.max(0, length - paddingStart - paddingEnd);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const line = document.createElement('div');
        line.className = 'connector-line';
        line.style.width = `${finalLength}px`;
        line.style.height = `2px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;

        layer.appendChild(line);
    });
}

window.addEventListener('load', drawConnectors);
window.addEventListener('resize', drawConnectors);
window.addEventListener('scroll', drawConnectors);


    document.addEventListener("DOMContentLoaded", () => {
        const features = document.querySelectorAll("[data-target]");

        features.forEach((feature) => {
            const targetSelector = feature.getAttribute("data-target");
            const target = document.querySelector(targetSelector);
            if (!target) return;

            target.addEventListener("mouseenter", () => {
                feature.classList.add("highlight");
            });

            target.addEventListener("mouseleave", () => {
                feature.classList.remove("highlight");
            });
        });
    });