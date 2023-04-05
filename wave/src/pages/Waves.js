import React, { useEffect, useRef } from "react";
import gsap, { Sine } from "gsap";

const Waves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);
    const n = 800;
    const speed = 20;
    const amp = 400;
    const rand = 0;
    const cycles = 7;
    const pan = window.innerWidth;

    const particles = [];

    function Particle(index) {
      this.x = this.y = this.index = this.alpha = index;
      this.dur = 100 / speed;
      this.draw = function () {
        ctx.globalAlpha = this.alpha;
        ctx.lineTo(this.x, this.y);
      };
    }

    function setParticle(p) {
      gsap
        .timeline({ defaults: { duration: p.dur }, repeat: -1, yoyo: true })
        .fromTo(
          p,
          {
            x: ((pan + cw) / n) * (p.index + 1),
            y:
              ch / 2 +
              gsap.utils.random(amp, amp + rand) *
                Math.cos((p.index / n) * cycles),
            alpha: 0.9,
          },
          {
            y:
              ch / 2 -
              gsap.utils.random(amp, amp + rand) *
                Math.cos((p.index / n) * cycles),
            yoyo: true,
            repeat: 1,
            ease: Sine.easeInOut,
          }
        )
        .to(
          p,
          {
            duration: p.dur * 2,
            x: "-=" + (pan - n),
            ease: Sine.easeInOut,
          },
          0
        );
    }

    for (let i = 0; i < n; i++) {
      particles.push(new Particle(i));
    }

    function init() {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      for (let i = 0; i < n; i++) {
        gsap.killTweensOf(particles[i]);
        setParticle(particles[i]);
      }
    }
    init();

    let colorBase = 240;
    gsap.ticker.add(() => {
      colorBase += 0.2;
      ctx.globalAlpha = 0.05;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = colorBase % 2 === 0 ? "#fff" : "#000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "#aaa";
      ctx.beginPath();
      ctx.moveTo(-n, ch / 2);
      for (let i = 0; i < n; i++) {
        particles[i].draw();
      }
      ctx.stroke();
    });
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="c"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </>
  );
};

export default Waves;
