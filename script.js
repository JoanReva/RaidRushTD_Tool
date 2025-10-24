const container = document.getElementById('towers-container');

function showLoading() {
  container.innerHTML = '';
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Cargando torres';
  container.appendChild(loading);
}

function showError(msg) {
  container.innerHTML = '';
  const err = document.createElement('div');
  err.className = 'tower-card';
  err.innerHTML = `<h2 style="color:#cc0000">Error</h2><p>${msg}</p>`;
  container.appendChild(err);
}

function formatValue(v) {
  if (v === null || v === undefined) return '—';
  return v;
}

function createBadge(text, cls) {
  const span = document.createElement('span');
  span.className = `meta-badge ${cls}`;
  span.textContent = text;
  return span;
}

function getTypeImage(type) {
  const typeMap = {
    'Swift': 'img/swift.png',
    'Elemental': 'img/elemental.png',
    'Utility': 'img/utility.png',
    'Vanguard': 'img/vanguard.png'
  };
  return typeMap[type] || 'img/swift.png';
}

function renderTower(t) {
  const card = document.createElement('article');
  card.className = 'tower-card';

  // Imagen del tipo de torre
  if (t.type) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'tower-image';
    const img = document.createElement('img');
    img.src = getTypeImage(t.type);
    img.alt = t.type;
    img.onerror = () => { img.style.display = 'none'; };
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
  }

  // Header
  const header = document.createElement('div');
  header.className = 'tower-header';
  const name = document.createElement('h2');
  name.className = 'tower-name';
  name.textContent = t.name;
  header.appendChild(name);

  const meta = document.createElement('div');
  meta.className = 'tower-meta';
  if (t.unlock_at) meta.appendChild(createBadge(`Unlock: ${t.unlock_at}`, 'unlock-badge'));
  if (t.type) meta.appendChild(createBadge(t.type, 'type-badge'));
  if (t.targets) meta.appendChild(createBadge(typeof t.targets === 'string' ? t.targets : t.targets.join(', '), 'target-badge'));
  header.appendChild(meta);
  card.appendChild(header);

  // Stats
  const stats = document.createElement('div');
  stats.className = 'tower-stats';

  const sRange = document.createElement('div'); sRange.className = 'stat-item';
  sRange.innerHTML = `<div class="stat-label">Rango</div><div class="stat-value">${formatValue(t.range)}</div>`;
  stats.appendChild(sRange);

  const sDmg = document.createElement('div'); sDmg.className = 'stat-item';
  sDmg.innerHTML = `<div class="stat-label">Daño</div><div class="stat-value">${formatValue(t.damage)}</div>`;
  stats.appendChild(sDmg);

  const sAS = document.createElement('div'); sAS.className = 'stat-item';
  sAS.innerHTML = `<div class="stat-label">Vel. Ataque</div><div class="stat-value">${formatValue(t.attack_speed)}</div>`;
  stats.appendChild(sAS);

  const sCrit = document.createElement('div'); sCrit.className = 'stat-item';
  sCrit.innerHTML = `<div class="stat-label">Crit Chance</div><div class="stat-value">${formatValue(t.crit_chance)}</div>`;
  stats.appendChild(sCrit);

  card.appendChild(stats);

  // Upgrades
  if (Array.isArray(t.upgrades) && t.upgrades.length) {
    const ups = document.createElement('div');
    ups.className = 'tower-upgrades';
    const h3 = document.createElement('h3'); h3.textContent = 'Mejoras en partida';
    ups.appendChild(h3);
    const ul = document.createElement('ul'); ul.className = 'upgrade-list';
    t.upgrades.forEach((u, idx) => {
      const li = document.createElement('li'); li.className = 'upgrade-item';
      if (typeof u === 'string') {
        li.innerHTML = `<div class="upgrade-level">Nivel ${idx+1}</div><div class="upgrade-desc">${u}</div>`;
      } else if (u.level) {
        li.innerHTML = `<div class="upgrade-level">${u.level}</div><div class="upgrade-desc">${u.description}</div>`;
      } else {
        li.innerHTML = `<div class="upgrade-level">Nivel ${idx+1}</div><div class="upgrade-desc">${JSON.stringify(u)}</div>`;
      }
      ul.appendChild(li);
    });
    ups.appendChild(ul);
    card.appendChild(ups);
  }

  // Commentary (colapsable)
  if (t.commentary) {
    const comm = document.createElement('div'); 
    comm.className = 'tower-commentary';
    
    const commHeader = document.createElement('h3');
    commHeader.textContent = 'Comentario';
    commHeader.style.cursor = 'pointer';
    commHeader.style.userSelect = 'none';
    
    const commContent = document.createElement('p');
    commContent.textContent = t.commentary;
    commContent.className = 'commentary-content';
    commContent.style.display = 'none';
    
    commHeader.addEventListener('click', () => {
      const isHidden = commContent.style.display === 'none';
      commContent.style.display = isHidden ? 'block' : 'none';
      commHeader.textContent = isHidden ? '▼ Comentario' : '▶ Comentario';
    });
    
    commHeader.textContent = '▶ Comentario';
    
    comm.appendChild(commHeader);
    comm.appendChild(commContent);
    card.appendChild(comm);
  }

  return card;
}

async function loadTowers() {
  showLoading();
  try {
    const res = await fetch('towers.json', {cache: 'no-store'});
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const data = await res.json();

    container.innerHTML = '';

    // Towers (sin mostrar notas)
    if (!Array.isArray(data.towers)) {
      showError('Formato inválido: `towers` no es un array');
      return;
    }

    data.towers.forEach(t => {
      const card = renderTower(t);
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    showError('No se pudo cargar towers.json — revisa la consola (F12) para más detalles.');
  }
}

// Inicializar
loadTowers();
