import { useEffect } from 'react';

export default function Confetti({ count = 60, onDone }) {
  useEffect(() => {
    const root = document.createElement('div');
    root.className = 'confetti';
    const colors = ['#F472B6', '#FB923C', '#60A5FA', '#34D399', '#FDE68A', '#FCA5A5'];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const left = Math.random() * 100;
      const delay = Math.random() * 800;
      const duration = 1800 + Math.random() * 1600;
      const w = 6 + Math.random() * 18;
      const h = 10 + Math.random() * 20;
      const bg = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = `${left}%`;
      el.style.top = `${-10 - Math.random() * 20}vh`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.background = bg;
      el.style.animationDelay = `${delay}ms`;
      el.style.animationDuration = `${duration}ms`;
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      root.appendChild(el);
    }

    document.body.appendChild(root);

    const timeout = setTimeout(() => {
      root.remove();
      onDone && onDone();
    }, 3600);

    return () => {
      clearTimeout(timeout);
      root.remove();
    };
  }, [count, onDone]);

  return null;
}
