const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor({ position, velocity }) {
    this.position = position; // x,y αξονες
    this.velocity = velocity;
    this.rotation = 0;
  }
  //draw γιατι ζωγραφιζουμε τον παιχτη
  draw() {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 4, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    //ctx.fillStyle = 'red';
    //ctx.fillRect(this.position.x, this.position.y, 100, 100); // Call the function correctly
    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
  }
  update() {
    this.draw;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
//const player2 = new Player({ x: 0, y: 0 });
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

const SPEED = 3;
const ROTATION_SPEED = 0.08;
const FRICTION = 0.97;
const PROJECTILE_SPEED = 3;

const projectiles = [];

function animate() {
  window.requestAnimationFrame(animate);
  console.log('animate');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();
  player.update();

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();
  }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else if (!keys.w.pressed) {
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION; //slowing down the player so it will be smoother for the user experience
  }

  if (keys.d.pressed) player.rotation += ROTATION_SPEED;
  else if (keys.a.pressed) player.rotation -= ROTATION_SPEED;
}
animate();

window.addEventListener('keydown', (event) => {
  //event name is representing the action we can use wtvr we want
  switch (event.code) {
    case 'KeyW':
      console.log('w was pressed');
      keys.w.pressed = true;
      break;
    case 'KeyA':
      console.log('a was pressed');
      keys.a.pressed = true;
      break;
    case 'KeyD':
      console.log('d was pressed');
      keys.d.pressed = true;
      break;
    case 'Space':
      console.log('Space was pressed');
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + Math.cos(player.rotation) * 30,
            y: player.position.y + Math.sin(player.rotation) * 30,
          },
          velocity: {
            x: Math.cos(player.rotation) * PROJECTILE_SPEED,
            y: Math.sin(player.rotation) * PROJECTILE_SPEED,
          },
        })
      );

      break;
  }
});
window.addEventListener('keyup', (event) => {
  //event name is representing the action we can use wtvr we want
  switch (event.code) {
    case 'KeyW':
      console.log('w was pressed');
      keys.w.pressed = false;
      break;
    case 'KeyA':
      console.log('a was pressed');
      keys.a.pressed = false;
      break;
    case 'KeyD':
      console.log('d was pressed');
      keys.d.pressed = false;
      break;
  }
});
