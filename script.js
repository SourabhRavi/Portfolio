// bg change on scroll
window.sections = [...document.querySelectorAll('section')];
window.lastScrollTop = window.pageYOffset;

document.body.style.background = window.sections[0].getAttribute('data-bg');

window.addEventListener('scroll', onScrolle);

function onScrolle() {
    const scrollTop = window.pageYOffset;

    const section = window.sections
        .map(section => {
            const el = section;
            const rect = el.getBoundingClientRect();
            return { el, rect };
        })
        .find(section => section.rect.bottom >= (window.innerHeight * 0.5));
    document.body.style.background = section.el.getAttribute('data-bg');
}


// bg change when scroll=0
window.addEventListener('scroll', function () {
    if (window.scrollY == 0) {
        document.body.style.background = window.sections[0].getAttribute('data-bg');
    }
});

// smooth scroll
// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//     target: document.querySelector("#scroll-container"),
//     ease: 0.05, // <= scroll speed
//     endY: 0,
//     y: 0,
//     resizeRequest: 1,
//     scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
//     rotation: 0.01,
//     force3D: true
// });

// window.addEventListener("load", onLoad);

// function onLoad() {
//     updateScroller();
//     window.focus();
//     window.addEventListener("resize", onResize);
//     document.addEventListener("scroll", onScroll);
// }

// function updateScroller() {

//     var resized = scroller.resizeRequest > 0;

//     if (resized) {
//         var height = scroller.target.clientHeight;
//         body.style.height = height + "px";
//         scroller.resizeRequest = 0;
//     }

//     var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

//     scroller.endY = scrollY;
//     scroller.y += (scrollY - scroller.y) * scroller.ease;

//     if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//         scroller.y = scrollY;
//         scroller.scrollRequest = 0;
//     }

//     TweenLite.set(scroller.target, {
//         y: -scroller.y
//     });

//     requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
//     scroller.scrollRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }

// function onResize() {
//     scroller.resizeRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }

// typing greeting
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

let textArray = ["Hey there!", "Hola!", "Namaste!", "Bonjour!", "Hello!"];
const typingDelay = 140;
const erasingDelay = 100;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// document.addEventListener('scroll', function (event) {
//     var element = event.target;
//     if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
//         setTimeout(() => {
//             alert("You have reached the end of the page");
//         }, 301);
//     }
// });


//cursor effects
//grow cursor on hover over anchor tags
const anchorElements = document.getElementsByTagName('a');

for (let i = 0; i < anchorElements.length; i++) {
    const element = anchorElements[i];
    element.addEventListener('mouseover', function () {
        document.getElementsByClassName('curzr')[0].style.width = '55px';
        document.getElementsByClassName('curzr')[0].style.height = '55px';
    });
    element.addEventListener('mouseleave', function () {
        document.getElementsByClassName('curzr')[0].style.width = '25px';
        document.getElementsByClassName('curzr')[0].style.height = '25px';
    });
}

//glitch effect for cursor
class GlitchEffect {
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr")

        this.distanceX = 0,
            this.distanceY = 0,
            this.pointerX = 0,
            this.pointerY = 0,
            this.previousPointerX = 0
        this.previousPointerY = 0
        this.cursorSize = 25
        this.glitchColorB = '#00feff'
        this.glitchColorR = '#ff4f71'

        this.cursorStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${this.cursorSize / -2}px`,
            left: `${this.cursorSize / -2}px`,
            zIndex: '2147483647',
            width: `${this.cursorSize}px`,
            height: `${this.cursorSize}px`,
            backgroundColor: '#222',
            borderRadius: '50%',
            boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
            transition: '100ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        if (CSS.supports("backdrop-filter", "invert(1)")) {
            this.cursorStyle.backdropFilter = 'invert(1)'
            this.cursorStyle.backgroundColor = '#fff0'
        } else {
            this.cursorStyle.backgroundColor = '#222'
        }

        this.init(this.cursor, this.cursorStyle)
    }

    init(el, style) {
        Object.assign(el.style, style)
        this.cursor.removeAttribute("hidden")

    }

    move(event) {
        this.previousPointerX = this.pointerX
        this.previousPointerY = this.pointerY
        this.pointerX = event.pageX + this.root.getBoundingClientRect().x
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y
        this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
        this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)

        if (event.target.localName === 'button' ||
            event.target.localName === 'a' ||
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
            this.hover()
        } else {
            this.hoverout()
        }

        this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.cursor.style.boxShadow = `
      ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB}, 
      ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
        this.stop()
    }

    hover() {
    }

    hoverout() {
    }

    click() {
        this.cursor.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    stop() {
        if (!this.moving) {
            this.moving = true
            setTimeout(() => {
                this.cursor.style.boxShadow = ''
                this.moving = false
            }, 50)
        }
    }

    remove() {
        this.cursor.remove()
    }
}

(() => {
    const cursor = new GlitchEffect()
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.onmousemove = function (event) {
            cursor.move(event)
        }
        document.onclick = function () {
            cursor.click()
        }
    } else {
        cursor.remove()
    }
})()
//cusror effects end

//detect keypress
document.getElementById('whoamicode').addEventListener('keydown', function (e) {

    if (e.key == 'Enter') {
        if (document.getElementById('whoamicode').value.trim() == "jokes") {
            document.getElementById('whoami-graphic').setAttribute('src', './img/whoami-w-jokes.svg');

            document.getElementById('whoamicode').style.borderColor = '#4BB543';
            setTimeout(() => {
                document.getElementById('whoamicode').style.borderColor = '#dcdcdc';
            }, 1500);
        }
        else {
            document.getElementById('whoamicode').style.borderColor = '#FF3333';
            setTimeout(() => {
                document.getElementById('whoamicode').style.borderColor = '#dcdcdc';
            }, 1500);
        }
    }

});