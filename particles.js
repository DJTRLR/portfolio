(function(){
  var canvas = document.createElement('canvas');
  canvas.id = 'bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var W, H, pts = [], mouse = { x: null, y: null };

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    pts = [];
    for (var i = 0; i < 120; i++) {
      pts.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2
      });
    }
  }

  window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('resize', init);

  function loop() {
    ctx.fillStyle = 'rgba(17,17,17,0.25)';
    ctx.fillRect(0, 0, W, H);

    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      if (mouse.x !== null) {
        var ax = p.x - mouse.x, ay = p.y - mouse.y;
        var ad = Math.sqrt(ax*ax + ay*ay);
        if (ad < 120) { p.x += ax / 12; p.y += ay / 12; }
      }

      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(6,182,212,' + (0.13 * (1 - d/110)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6,182,212,0.55)';
      ctx.fill();
    }

    requestAnimationFrame(loop);
  }

  init();
  loop();
})();
