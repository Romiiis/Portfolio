import {AfterViewInit, Component} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
}

interface MousePosition {
  x: number | null;
  y: number | null;
  radius: number;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initNetworkCanvas();
  }

  initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Nastavení plné velikosti
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Počet bodů v síti
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(80, Math.floor(window.innerWidth / 18)); // Zvýšený počet částic

    // Zjištění barev z CSS proměnných
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
    const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    const textRgb = textColor.includes('rgb')
      ? textColor.replace(/rgb\(|\)/g, '').trim()
      : '255, 255, 255'; // Fallback na bílou

    // Vytvoření částic s různými barvami
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2.5 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const directionX = Math.random() * 0.6 - 0.3;
      const directionY = Math.random() * 0.6 - 0.3;
      // Střídání barev pro zajímavější efekt
      const color = Math.random() > 0.8 ? accentColor : `rgba(${textRgb}, 0.5)`;

      particlesArray.push({ x, y, directionX, directionY, size, color });
    }

    // Interaktivita s myší
    const mouse: MousePosition = {
      x: null,
      y: null,
      radius: 180
    };

    window.addEventListener('mousemove', (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    // Přidání interaktivity s dotykem pro mobilní zařízení
    window.addEventListener('touchmove', (event: TouchEvent) => {
      if (event.touches && event.touches[0]) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    });

    // Resetování pozice myši při opuštění okna
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Animační funkce
    function animate(): void {
      requestAnimationFrame(animate);
      if (!ctx) return; // Pro TypeScript ošetření - toto by nikdy nemělo nastat

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];

        // Vykreslení bodu
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Pohyb částic
        p.x += p.directionX;
        p.y += p.directionY;

        // Odraz od okrajů
        if (p.x > canvas.width || p.x < 0) p.directionX *= -1;
        if (p.y > canvas.height || p.y < 0) p.directionY *= -1;

        // Interaktivní pohyb při přiblížení myši
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            const pushX = Math.cos(angle) * force * 0.5;
            const pushY = Math.sin(angle) * force * 0.5;

            p.x += pushX;
            p.y += pushY;
          }
        }

        // Kreslit spojení
        for (let j = i; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          const maxDistance = 160;

          if (distance < maxDistance) {
            // Barevný přechod pro spojnice
            const alpha = 0.15 * (1 - distance / maxDistance);
            ctx.strokeStyle = p.color === accentColor && p2.color === accentColor
              ? `rgba(${accentRgb}, ${alpha * 1.5})` // Zvýrazněné spojnice pro hlavní barvu
              : `rgba(${textRgb}, ${alpha})`;
            ctx.lineWidth = Math.max(0.2, 0.6 * (1 - distance / maxDistance)); // Proměnlivá tloušťka
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    // Spuštění animace
    animate();
  }
}
