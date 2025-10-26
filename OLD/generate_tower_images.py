import json
import os
from pathlib import Path

# Leer el JSON
with open('towers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Crear directorio de imágenes si no existe
img_dir = Path('img/towers')
img_dir.mkdir(parents=True, exist_ok=True)

# Colores por tipo
type_colors = {
    'Swift': '#ffd700',
    'Elemental': '#ff6b6b',
    'Utility': '#a78bfa',
    'Vanguard': '#4ecdc4'
}

# Generar SVG simple para cada torre
for tower in data['towers']:
    name = tower['name']
    tower_type = tower.get('type', 'Utility')
    color = type_colors.get(tower_type, '#cccccc')
    
    # Crear nombre de archivo sin espacios y con guiones bajos
    filename = name.replace(' ', '_').replace('(', '').replace(')', '').replace('-', '_')
    filename = f"{filename}.svg"
    filepath = img_dir / filename
    
    # SVG simple con círculo y texto
    svg_content = f'''<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad_{tower_type}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{color};stop-opacity:0.6" />
        </linearGradient>
        <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.5"/>
        </filter>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#grad_{tower_type})" filter="url(#shadow)" stroke="#333" stroke-width="3"/>
    <text x="60" y="70" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" filter="url(#shadow)">
        {name[0]}
    </text>
</svg>'''
    
    # Guardar SVG
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    # Actualizar JSON con el nombre del archivo
    tower['image'] = f"img/towers/{filename}"
    
    print(f"✓ Creada: {filename}")

# Guardar JSON actualizado
with open('towers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n✅ Generadas {len(data['towers'])} imágenes de torres")
print("✅ JSON actualizado con rutas de imágenes")
