const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];
const numberOfParticles = 200;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.weight = Math.random() * 1 - 0.8;
        this.distance = 0;
        this.radians = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
        ctx.fill();
    }

    update() {
        this.radians += 0.02;
        this.distance = 20 + Math.sin(this.radians) * 5;
        this.x = mouse.x + Math.cos(this.radians) * this.distance;
        this.y = mouse.y + Math.sin(this.radians) * this.distance;
        this.draw();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

init();
animate();

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".typewriter-container");
    const originalText = ["signer", "veloper"];
    container.textContent = "De";
    let index = 0;

    const typeWriter = () => {
        if (index < originalText.length) {
            let textIndex = 0;
            let currentText = originalText[index];

            const type = () => {
                if (textIndex < currentText.length) {
                    container.textContent += currentText.charAt(textIndex);
                    textIndex++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(erase, 1000);
                }
            };

            const erase = () => {
                if (textIndex > 0) {
                    container.textContent = container.textContent.slice(0, -1);
                    textIndex--;
                    setTimeout(erase, 100);
                } else {
                    index = (index + 1) % originalText.length;
                    setTimeout(typeWriter, 1000);
                }
            };

            type();
        } else {
            index = 0;
            setTimeout(typeWriter, 1000);
        }
    };

    typeWriter();
});
