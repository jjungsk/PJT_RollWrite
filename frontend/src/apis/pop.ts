interface ParticuleElement extends HTMLElement {
  x: number;
  y: number;
  vel: {
    x: number;
    y: number;
  };
  mass: number;
}

let particles: ParticuleElement[] = [];
const colors: string[] = ["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"];

export function pop(mount: number): void {
  for (let i = 0; i < mount; i++) {
    const p = document.createElement("particule") as ParticuleElement;
    p.x = window.innerWidth * 0.5;
    p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
    p.vel = {
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * -15 - 10,
    };
    p.mass = Math.random() * 0.2 + 0.8;
    particles.push(p);
    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
    const size = Math.random() * 15 + 5;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(p);
  }
}

export function render(): void {
  for (let i = particles.length - 1; i--; i > -1) {
    const p = particles[i];
    p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

    p.x += p.vel.x;
    p.y += p.vel.y;

    p.vel.y += 0.4 * p.mass;
    if (p.y > window.innerHeight * 2) {
      p.remove();
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(render);
}
