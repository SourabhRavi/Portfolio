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
document.getElementById('whoamicode').addEventListener('keydown', (e) => {

    if (e.key == 'Enter') {
        if (document.getElementById('whoamicode').value.trim() == "jokes") {
            document.getElementById('whoami-graphic').setAttribute('src', './img/whoami-w-jokes.svg');

            // response comment
            document.getElementById('dev').innerHTML = "// Yay! Bonus jokes unlocked!";
            document.getElementById('dev').style.opacity = '1';
            
            document.getElementById('whoamicode').style.borderColor = '#4BB543';
            setTimeout(() => {
                document.getElementById('whoamicode').style.borderColor = 'transparent';
            }, 1500);

        }
        else {
            document.getElementById('whoamicode').style.borderColor = '#FF3333';

            // response comment
            document.getElementById('dev').innerHTML = "// Uh-oh! Try typing 'jokes'";
            document.getElementById('dev').style.opacity = '1';

            setTimeout(() => {
                document.getElementById('whoamicode').style.borderColor = 'transparent';
            }, 1500);
        }
    }

});

const removeBorderAndComment = () => {
    document.getElementById('whoamicode').style.borderColor = 'transparent';
    document.getElementById('dev').style.opacity = '0';
}

document.getElementById('whoamicode').addEventListener('mouseenter', () => {
    document.getElementById('whoamicode').style.borderColor = '#2727272d';
});

document.getElementById('whoamicode').addEventListener('mouseleave', () => {
    document.getElementById('whoamicode').style.borderColor = 'transparent';
});

//window onload event for bg change on reload
window.onload = onScrolle();