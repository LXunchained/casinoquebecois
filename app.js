// Shared chart defaults
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#8b90a0';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';

const GOLD = '#d4af6a';
const GOLD_LIGHT = 'rgba(212,175,106,0.15)';

function makeGradient(ctx, color1, color2) {
  const g = ctx.createLinearGradient(0, 0, 0, 260);
  g.addColorStop(0, color1);
  g.addColorStop(1, color2);
  return g;
}

// Generate plausible trending series
function generateSeries(n, start, drift, vol, seed = 1) {
  let v = start;
  const out = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280 - 0.5;
    v = v * (1 + drift + r * vol);
    out.push(+v.toFixed(2));
  }
  return out;
}

// Hero chart
(function heroChart() {
  const el = document.getElementById('heroChart');
  if (!el) return;
  const ctx = el.getContext('2d');
  const labels = Array.from({ length: 30 }, (_, i) => i + 1);
  const data = generateSeries(30, 100, 0.008, 0.022, 7);
  const bench = generateSeries(30, 100, 0.003, 0.015, 13);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: GOLD,
          backgroundColor: makeGradient(ctx, 'rgba(212,175,106,0.35)', 'rgba(212,175,106,0)'),
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2.5,
        },
        {
          data: bench,
          borderColor: 'rgba(200,200,200,0.4)',
          borderDash: [4, 4],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      elements: { line: { capBezierPoints: true } },
    },
  });
})();

// Performance chart
(function perfChart() {
  const el = document.getElementById('perfChart');
  if (!el) return;
  const ctx = el.getContext('2d');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
                  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const port = generateSeries(24, 100, 0.017, 0.035, 42);
  const bench = generateSeries(24, 100, 0.006, 0.028, 19);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Abundancia Composite',
          data: port,
          borderColor: GOLD,
          backgroundColor: makeGradient(ctx, 'rgba(212,175,106,0.25)', 'rgba(212,175,106,0)'),
          fill: true,
          tension: 0.38,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: GOLD,
          borderWidth: 2.5,
        },
        {
          label: '60/40 Benchmark',
          data: bench,
          borderColor: 'rgba(200,200,200,0.5)',
          borderDash: [5, 5],
          fill: false,
          tension: 0.38,
          pointRadius: 0,
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: { boxWidth: 12, boxHeight: 3, usePointStyle: false, color: '#8b90a0', font: { size: 12 } },
        },
        tooltip: {
          backgroundColor: '#181b26',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#e8eaf0',
          bodyColor: '#e8eaf0',
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8b90a0', font: { size: 11 } } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#8b90a0',
            font: { size: 11 },
            callback: (v) => v + '',
          },
        },
      },
    },
  });
})();

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('formSuccess');
  if (msg) msg.classList.add('show');
  e.target.reset && e.target.reset();
  return false;
}
