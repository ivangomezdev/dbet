let canvas, ctx, width, height, particles = [];

self.onmessage = (event) => {
  if (event.data.canvas) {
    canvas = event.data.canvas;
    ctx = canvas.getContext("2d");
    width = event.data.width;
    height = event.data.height;
    initParticles();
    animate();
  } else if (event.data.width && event.data.height) {
    width = event.data.width;
    height = event.data.height;
    canvas.width = width;
    canvas.height = height;
  }
};

function initParticles() {
  const numParticles = 10;
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 15 + 5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.15 + 0.05,
    });
  }
}

function drawFog() {
  // Limpiar el canvas completamente para que sea transparente
  ctx.clearRect(0, 0, width, height);

  ctx.filter = "blur(10px)";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > height) p.speedY *= -1;
  }
}

function animate() {
  drawFog();
  requestAnimationFrame(animate);
}