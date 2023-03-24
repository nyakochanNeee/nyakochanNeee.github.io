 var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.head.appendChild(canvas);
  var particles = [];
  var colors = [ 'rgba(69,204,255,.95)', 'rgba(73,232,62,.95)',
                 'rgba(255,212,50,.95)', 'rgba(232,75,48,.95)',
                 'rgba(178,67,255,.95)' ];
  var config = {};
  var settings = document.getElementById('settings');
  start();
  window.requestAnimationFrame(draw);
  function createParticles() 
  {
     var n = rand(config.num[0],config.num[1]);
     for (var i=0; i<n; i++) 
     {
        var angle = (360/n)*(i+1);
        particles.push(new Particle({
            angle:angle,
            size:rand(config.size[0],config.size[1]),
            speed:rand(config.speed[0],config.speed[1]),
            color:colors[i%5],
            curve:rand(config.curve[0],config.curve[1])
        }));
     }
  }
  function draw () 
  {
     for (var i=0; i<particles.length; i++) 
     {
        var p = particles[i];
        p.move();
        p.draw(ctx);
     }
     fade();
     window.requestAnimationFrame(draw);
  }

  function Particle (options) 
  {
     this.angle = options.angle;
     this.size  = options.size;
     this.speed = options.speed;
     this.color = options.color;
     this.curve = options.curve;
     this.pos = [canvas.width/2, canvas.height/2];
  }  
  Particle.prototype.move = function()
  {
    this.angle += this.curve;
    var radians = this.angle*Math.PI/180;
    this.pos[0] += Math.cos(radians)*this.speed,
    this.pos[1] += Math.sin(radians)*this.speed;
  }
  Particle.prototype.draw = function (ctx) 
  {
     ctx.strokeStyle = this.color;
     ctx.beginPath();
     ctx.arc(this.pos[0],this.pos[1],this.size,0,2*Math.PI);
     ctx.stroke();
  }

  function fade () 
  {
     ctx.beginPath();
     ctx.fillStyle = 'rgba(0, 0, 0, .08)';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.fill();
  }
  function start()
  {
        config.num = [parseFloat("50"),
                      parseFloat("50") ];
        config.size = [parseFloat("2"),
                      parseFloat("2")];
        config.speed = [parseFloat("2"),
                      parseFloat("2")];
        config.curve = [parseFloat("0.5"),
                      parseFloat("0.5")];
        createParticles();
  }
  settings.btnSet.addEventListener("click", start);
  settings.btnClear.addEventListener("click", clear);
  function rand(min, max) 
  {
     return Math.random()*(max-min)+min;
  }