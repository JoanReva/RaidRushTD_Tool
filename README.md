# 🏰 Raid Rush TD - Tower Guide# 🏰 Raid Rush TD - Tower Guide



<div align="center">Una herramienta profesional e interactiva para comparar y analizar torres del juego Raid Rush Tower Defense.



![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)## ✨ Características

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)- 📊 **34 torres con estadísticas completas** organizadas por capítulos (1-33) y eventos

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)- 🎨 **Sistema de rarezas** (Common, Good, Rare, Epic, Epic+, Legendary)

- 📈 **Cálculo dinámico de poder** basado en rareza y nivel

**Una herramienta profesional e interactiva para comparar y analizar torres del juego Raid Rush Tower Defense**- 🎯 **Tres modos de vista** (Detallado, Simple, Minimal)

- 💪 **Sistema de niveles** con controles interactivos (1-100)

[Demo](#) · [Reportar Bug](https://github.com/JoanReva/RaidRushTD_Tool/issues) · [Solicitar Feature](https://github.com/JoanReva/RaidRushTD_Tool/issues)- 🎨 **Tematización con CSS Variables** para personalización fácil

- ⚡ **Optimizado con React.memo y hooks** para máximo rendimiento

</div>- 📱 **Diseño responsive** adaptable a diferentes pantallas

- 🗂️ **Datos estandarizados** en formato JSON optimizado

---

## 🚀 Tecnologías

## 📋 Tabla de Contenidos

- **React 18** - Librería UI con hooks modernos

- [Características](#-características)- **TypeScript** - Tipado estático para mayor seguridad

- [Demo](#-demo)- **Vite** - Build tool ultra rápido con HMR

- [Tecnologías](#-tecnologías)- **CSS Variables** - Sistema de tematización centralizado

- [Instalación](#-instalación)- **ESLint** - Linting y mejores prácticas

- [Uso](#-uso)

- [Estructura del Proyecto](#-estructura-del-proyecto)## 📦 Instalación

- [Formato de Datos](#-formato-de-datos)

- [API de Componentes](#-api-de-componentes)```bash

- [Contribuir](#-contribuir)# Clonar el repositorio

- [Roadmap](#-roadmap)git clone https://github.com/JoanReva/RaidRushTD_Tool.git

- [Licencia](#-licencia)

# Instalar dependencias

---npm install



## ✨ Características# Iniciar servidor de desarrollo

npm run dev

### 🎮 Funcionalidades Principales```



- **34 Torres Completas**: Todas las torres del juego con estadísticas detalladas## 🛠️ Scripts Disponibles

- **Sistema de Rarezas**: 6 niveles (Common, Good, Rare, Epic, Epic+, Legendary)

- **Cálculo Dinámico de Poder**: Basado en rareza, nivel y estadísticas```bash

- **Sistema de Niveles**: Control interactivo de nivel 1-100npm run dev      # Inicia el servidor de desarrollo (localhost:5173)

- **Múltiples Vistas**: Detallado, Simple y Minimalnpm run build    # Genera build de producción

npm run preview  # Vista previa del build de producción

### 🎨 Experiencia de Usuarionpm run lint     # Ejecuta ESLint para verificar código

```

- **Diseño Responsive**: Adaptable a móvil, tablet y desktop

- **Interfaz Intuitiva**: Controles fáciles de usar## � Estructura del Proyecto

- **Rendimiento Optimizado**: React.memo y hooks para máxima velocidad

- **Tematización**: Sistema de CSS Variables personalizable```

src/

### 📊 Organización de Datos├── components/       # Componentes React reutilizables

│   ├── TowerCard/   # Tarjeta de torre con stats

- **Ordenamiento por Capítulos**: Torres organizadas del capítulo 1 al 33│   ├── Selector/    # Selectores de rareza y modo

- **Torres de Eventos**: Separadas al final│   └── ...

- **Tipos Clasificados**: Vanguard, Swift, Elemental, Utility├── data/            # Datos de las torres

- **Estadísticas Completas**: Daño, rango, velocidad, crítico, etc.│   └── towers.json  # 34 torres en formato estandarizado

├── types/           # Definiciones de tipos TypeScript

---├── utils/           # Funciones de utilidad optimizadas

├── hooks/           # Custom hooks de React

## 🎥 Demo└── styles/          # Estilos globales y temas

```

### Vista Detallada

Muestra todas las estadísticas, mejoras y comentarios de cada torre.## 🎯 Formato de Datos



### Vista SimpleLas torres están estandarizadas en formato JSON:

Estadísticas básicas sin comentarios para comparación rápida.

```json

### Vista Minimal{

Solo información esencial para visualización compacta.  "name": "Tower Name",

  "unlock_at": { "chapter": 1 },

---  "targets": ["Ground", "Air"],

  "damage": { "normal": 50, "third_shot": 150 },

## 🚀 Tecnologías  "range": 8,

  "attack_speed": 1.5,

| Tecnología | Versión | Propósito |  "crit_chance": 0.20,

|------------|---------|-----------|  "type": "Vanguard"

| **React** | 18.3 | Librería UI con hooks modernos |}

| **TypeScript** | 5.5 | Tipado estático y seguridad |```

| **Vite** | 5.4 | Build tool ultra rápido con HMR |

| **CSS3** | - | Estilos con Variables CSS |## �📝 Documentación

| **ESLint** | 9.9 | Linting y mejores prácticas |

- [ESTANDARIZACION.md](./ESTANDARIZACION.md) - Guía de formato de datos JSON

### Dependencias Clave- [ACTUALIZACION_TIPOS.md](./ACTUALIZACION_TIPOS.md) - Documentación de tipos TypeScript



```json## 🔄 Mejoras Recientes (v2.1)

{

  "react": "^18.3.1",- ✅ **Optimización del 42%** en reducción de código

  "react-dom": "^18.3.1",- ✅ **Eliminación completa de código legacy**

  "typescript": "~5.5.3",- ✅ **Tipos TypeScript más estrictos** y seguros

  "vite": "^5.4.2"- ✅ **Sin dependencias de regex** (.match() eliminado)

}- ✅ **Funciones de formateo simplificadas**

```- ✅ **15+ archivos obsoletos eliminados**



---## 💡 Futuras Mejoras



## 📦 Instalación1. **Filtros avanzados**: Por tipo, rareza, estadísticas

2. **Ordenamiento dinámico**: Por poder, daño, rango, etc.

### Prerrequisitos3. **Comparación directa**: Seleccionar 2-3 torres para comparar

4. **Sistema de favoritos**: Guardar torres favoritas en localStorage

- Node.js >= 18.x5. **Modo oscuro**: Toggle entre tema claro y oscuro

- npm >= 9.x o yarn >= 1.226. **Exportar datos**: Generar reportes en PDF o imagen

5. **Dark Mode**: Tema oscuro usando CSS Variables

### Pasos

## 📝 Licencia

```bash

# 1. Clonar el repositorioEste es un proyecto no oficial y con fines educativos.

git clone https://github.com/JoanReva/RaidRushTD_Tool.git

cd RaidRushTD_Tool## 👤 Autor



# 2. Instalar dependencias**Joan Reva**

npm install- GitHub: [@JoanReva](https://github.com/JoanReva)



# 3. Iniciar servidor de desarrollo---

npm run dev

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub!

# 4. Abrir en el navegador
# http://localhost:5173
```

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Vista previa del build
npm run preview
```

---

## 🎯 Uso

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en localhost:5173 |
| `npm run build` | Genera build de producción optimizado |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |

### Controles de la Interfaz

- **Selector de Rareza**: Cambia la rareza global de todas las torres
- **Selector de Vista**: Alterna entre Detallado/Simple/Minimal
- **Nivel de Torre**: Botones +/- para ajustar nivel (1-100)
- **Expandir Comentarios**: Click en "Comentario ▼" para ver/ocultar

---

## 📂 Estructura del Proyecto

```
RaidRushTD_Tool/
├── public/
│   └── towers/              # Imágenes de torres
├── src/
│   ├── components/          # Componentes React
│   │   ├── TowerCard/       # Tarjeta principal de torre
│   │   │   ├── TowerCard.tsx
│   │   │   ├── StatBox.tsx
│   │   │   ├── PowerDisplay.tsx
│   │   │   └── LevelDisplay.tsx
│   │   ├── RaritySelector/  # Selector de rareza
│   │   ├── ViewModeSelector/# Selector de modo de vista
│   │   └── Selector/        # Selector genérico
│   ├── data/
│   │   └── towers.json      # 34 torres estandarizadas
│   ├── types/
│   │   └── tower.ts         # Interfaces TypeScript
│   ├── utils/
│   │   ├── towerUtils.ts    # Utilidades de torres
│   │   └── rarityUtils.ts   # Utilidades de rarezas
│   ├── hooks/
│   │   ├── useAppState.ts   # Estado global de la app
│   │   └── useTowerLevel.ts # Estado de nivel de torre
│   ├── constants/
│   │   └── tower.ts         # Constantes del juego
│   ├── styles/
│   │   └── theme.css        # Variables CSS globales
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Formato de Datos

### Estructura de Torre

```typescript
interface Tower {
  name: string;
  unlock_at: UnlockInfo;      // { chapter: number } o { event: string }
  targets: string[];          // ["Ground", "Air"]
  type: TowerType;            // "Vanguard" | "Swift" | "Elemental" | "Utility"
  range: number | RangeInfo;  // 8 o { min: 8, max: 12 }
  attack_speed: number;       // 1.5
  damage: DamageInfo | number;// 50 o { normal: 50, third_shot: 150 }
  crit_chance?: number;       // 0.20 (decimal, 20%)
  additional_stats?: {...};   // Estadísticas especiales
  upgrades?: Upgrade[];       // Lista de mejoras
  commentary?: string;        // Descripción
  image: string;              // Ruta de imagen
}
```

### Ejemplo Real

```json
{
  "name": "Sniper Tower",
  "unlock_at": { "chapter": 1 },
  "targets": ["Ground", "Air"],
  "type": "Swift",
  "range": 10,
  "attack_speed": 2.5,
  "damage": 80,
  "crit_chance": 0.20,
  "upgrades": [
    { "level": "1-2", "description": "+10 damage" },
    { "level": "3-4", "description": "+2 range" }
  ],
  "commentary": "Torre de largo alcance con alta precisión.",
  "image": "/towers/Sniper_Tower.svg"
}
```

---

## 🧩 API de Componentes

### TowerCard

Componente principal que muestra información de una torre.

```tsx
<TowerCard
  tower={towerData}
  viewMode="detailed" | "simple" | "minimal"
  globalRarity="Common" | "Good" | "Rare" | "Epic" | "Epic+" | "Legendary"
/>
```

### RaritySelector

Selector de rareza global.

```tsx
<RaritySelector
  value={rarity}
  onChange={(newRarity) => setRarity(newRarity)}
/>
```

### ViewModeSelector

Selector de modo de visualización.

```tsx
<ViewModeSelector
  value={viewMode}
  onChange={(newMode) => setViewMode(newMode)}
/>
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor sigue estos pasos:

### 1. Fork el Proyecto

```bash
# Fork desde GitHub UI
# Luego clona tu fork
git clone https://github.com/tu-usuario/RaidRushTD_Tool.git
```

### 2. Crea una Rama

```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Realiza tus Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de TypeScript
- Asegúrate de que no hay errores de ESLint

```bash
npm run lint
```

### 4. Commit

```bash
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
# o
git commit -m "fix: descripción del bug corregido"
```

### 5. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego abre un Pull Request en GitHub con:
- Descripción clara de los cambios
- Screenshots si aplica
- Referencias a issues relacionados

---

## 🗺️ Roadmap

### Versión 2.2 (Próxima)

- [ ] **Filtros Avanzados**
  - Filtrar por tipo de torre
  - Filtrar por rareza
  - Filtrar por capítulo/evento
  - Búsqueda por nombre

- [ ] **Ordenamiento**
  - Por poder calculado
  - Por daño base
  - Por rango
  - Por velocidad de ataque

- [ ] **Comparación de Torres**
  - Seleccionar 2-3 torres
  - Vista comparativa lado a lado
  - Destacar diferencias

### Versión 2.3

- [ ] **Sistema de Favoritos**
  - Marcar torres como favoritas
  - Persistir en localStorage
  - Filtro de favoritas

- [ ] **Tema Oscuro**
  - Toggle claro/oscuro
  - Persistir preferencia
  - Transiciones suaves

### Versión 3.0

- [ ] **Exportar Datos**
  - Exportar comparación a imagen
  - Generar reporte PDF
  - Copiar estadísticas al portapapeles

- [ ] **Construcción de Builds**
  - Crear estrategias con múltiples torres
  - Calcular sinergia entre torres
  - Guardar y compartir builds

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**JoanReva**

- GitHub: [@JoanReva](https://github.com/JoanReva)
- Proyecto: [RaidRushTD_Tool](https://github.com/JoanReva/RaidRushTD_Tool)

---

## 🙏 Agradecimientos

- Comunidad de Raid Rush Tower Defense
- Desarrolladores del juego
- Contribuidores del proyecto

---

## 📞 Soporte

¿Tienes preguntas o problemas?

- 🐛 [Reportar Bug](https://github.com/JoanReva/RaidRushTD_Tool/issues)
- 💡 [Solicitar Feature](https://github.com/JoanReva/RaidRushTD_Tool/issues)
- 📧 Contacto: [Crear Issue](https://github.com/JoanReva/RaidRushTD_Tool/issues/new)

---

<div align="center">

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub ⭐**

Hecho con ❤️ usando React y TypeScript

</div>
