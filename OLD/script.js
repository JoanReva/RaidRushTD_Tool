// Global state
let towersData = [];
let globalRarity = "Common";
let viewMode = "simple"; // detailed, simple, minimal

// Utility Functions
function showLoading() {
    document.getElementById("towers-container").innerHTML = "<div style=\"grid-column: 1/-1; text-align: center; color: #4a7ba7; font-size: 1.5rem; padding: 60px 20px;\"> Cargando torres...</div>";
}

function showError(message) {
    document.getElementById("towers-container").innerHTML = "<div style=\"grid-column: 1/-1; text-align: center; color: #e74c3c; font-size: 1.2rem; padding: 60px 20px;\"> " + message + "</div>";
}

function formatUnlockText(unlockValue) {
    if (unlockValue === null || unlockValue === undefined || unlockValue === "") {
        return "Event: Special";
    }
    
    // Si es un objeto con propiedad event
    if (typeof unlockValue === "object" && unlockValue.event) {
        var eventText = unlockValue.event;
        // Si el evento empieza con "Chapter", extraer el número
        if (eventText.toLowerCase().startsWith("chapter ")) {
            var chapterNum = eventText.substring(8).trim();
            return "Chapter " + chapterNum;
        }
        // Si no, es un evento especial
        return "Event: " + eventText;
    }
    
    // Si es una cadena de texto
    if (typeof unlockValue === "string") {
        // Si la cadena está vacía
        if (unlockValue.trim() === "") {
            return "Event: Special";
        }
        
        // Si empieza con "Chapter", usar ese formato directamente
        if (unlockValue.toLowerCase().startsWith("chapter ")) {
            var match = unlockValue.match(/chapter\s+(\d+)/i);
            if (match) {
                return "Chapter " + match[1];
            }
        }
        
        // Si contiene "event" o "special", es un evento
        if (unlockValue.toLowerCase().includes("event") || unlockValue.toLowerCase().includes("special")) {
            // Extraer nombre del evento si está entre paréntesis
            var eventMatch = unlockValue.match(/\(([^)]+)\)/);
            if (eventMatch) {
                return "Event: " + eventMatch[1];
            }
            
            // Si solo dice "Special Events Only", simplificar
            if (unlockValue.toLowerCase() === "special events only") {
                return "Event: Special";
            }
            
            // Si no, limpiar el texto
            var cleanText = unlockValue
                .replace(/special events? only/gi, "Special")
                .replace(/weekend/gi, "")
                .replace(/\s+/g, " ")
                .trim();
            return "Event: " + (cleanText || "Special");
        }
    }
    
    // Si es un número
    if (typeof unlockValue === "number" || !isNaN(unlockValue)) {
        return "Chapter " + unlockValue;
    }
    
    return String(unlockValue);
}

function formatValue(value) {
    if (value === null || value === undefined) return "N/A";
    return value;
}

function createBadge(text, className) {
    return "<span class=\"meta-badge " + className + "\">" + text + "</span>";
}

function getTypeImage(type) {
    var typeMap = {
        "Swift": "img/swift.png",
        "Elemental": "img/elemental.png",
        "Utility": "img/utility.png",
        "Vanguard": "img/vanguard.png"
    };
    return typeMap[type] || "img/default.png";
}

function getTypeClass(type) {
    var typeMap = {
        "Swift": "type-swift",
        "Elemental": "type-elemental",
        "Utility": "type-utility",
        "Vanguard": "type-vanguard"
    };
    return typeMap[type] || "";
}

function getTargetInfo(target) {
    var targetStr = String(target).toLowerCase();
    
    if (targetStr.includes("air") && targetStr.includes("ground")) {
        return { icon: "", text: "Air & Ground", class: "target-both" };
    } else if (targetStr.includes("air")) {
        return { icon: "", text: "Air", class: "target-air" };
    } else if (targetStr.includes("ground")) {
        return { icon: "", text: "Ground", class: "target-ground" };
    }
    return { icon: "", text: target, class: "target-other" };
}

function getDamageTypeInfo(damage) {
    var damageStr = String(damage);
    
    if (damageStr.includes("Area") || damageStr.includes("area")) {
        return { type: "Area", icon: "", class: "damage-area" };
    } else if (damageStr.includes("Unit")) {
        return { type: "Unit", icon: "", class: "damage-unit" };
    } else if (damageStr === "N/A") {
        return { type: "Support", icon: "", class: "damage-support" };
    }
    return { type: "Single", icon: "", class: "damage-single" };
}

function truncateText(text, maxLength) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

function getRarityClass(rarity) {
    var rarityMap = {
        "Common": "rarity-common",
        "Good": "rarity-good",
        "Rare": "rarity-rare",
        "Epic": "rarity-epic",
        "Epic+": "rarity-epic-plus",
        "Legendary": "rarity-legendary"
    };
    return rarityMap[rarity] || "rarity-common";
}

function createViewModeSelector() {
    var html = "<div id=\"view-mode-selector\">";
    html += "<label> Modo:</label>";
    html += "<div class=\"view-mode-buttons\">";
    html += "<button class=\"view-mode-btn" + (viewMode === "detailed" ? " active" : "") + "\" data-mode=\"detailed\">Detallado</button>";
    html += "<button class=\"view-mode-btn" + (viewMode === "simple" ? " active" : "") + "\" data-mode=\"simple\">Simple</button>";
    html += "<button class=\"view-mode-btn" + (viewMode === "minimal" ? " active" : "") + "\" data-mode=\"minimal\">Minimal</button>";
    html += "</div></div>";
    return html;
}

function createGlobalRaritySelector() {
    var rarities = ["Common", "Good", "Rare", "Epic", "Epic+", "Legendary"];
    var html = "<div id=\"global-rarity-selector\">";
    html += "<label> Rareza:</label>";
    html += "<div class=\"rarity-buttons\">";
    
    for (var i = 0; i < rarities.length; i++) {
        var r = rarities[i];
        var active = r === globalRarity ? " active" : "";
        var rarityClass = getRarityClass(r);
        var displayText = r === "Epic+" ? "E+" : r.charAt(0);
        html += "<button class=\"global-rarity-btn " + rarityClass + active + "\" data-rarity=\"" + r + "\">" + displayText + "</button>";
    }
    
    html += "</div></div>";
    return html;
}

function createLevelControls(cardId, currentLevel) {
    return "<div class=\"level-controls\">" +
           "<button class=\"level-btn\" data-card=\"" + cardId + "\" data-action=\"increment\"></button>" +
           "<button class=\"level-btn\" data-card=\"" + cardId + "\" data-action=\"decrement\"></button>" +
           "</div>";
}

function calculatePower(tower, rarity, level) {
    var basePower = 100;
    var rarityMultiplier = {
        "Common": 1.0,
        "Good": 1.3,
        "Rare": 1.6,
        "Epic": 2.0,
        "Epic+": 2.5,
        "Legendary": 3.0
    };
    var mult = rarityMultiplier[rarity] || 1.0;
    return Math.floor(basePower * mult * level);
}

function updateTowerStats(cardId, rarity, level) {
    var card = document.querySelector("[data-card-id=\"" + cardId + "\"]");
    if (!card) return;
    
    var towerIndex = parseInt(cardId.replace("tower-", ""));
    var tower = towersData[towerIndex];
    if (!tower) return;
    
    var power = calculatePower(tower, rarity, level);
    card.querySelector(".power-value").textContent = power;
    card.querySelector(".level-value").textContent = level;
    
    var rarityBanner = card.querySelector(".rarity-banner");
    rarityBanner.className = "rarity-banner " + getRarityClass(rarity);
    rarityBanner.textContent = rarity;
}

function updateAllTowers() {
    // OPTIMIZADO: Solo actualiza power y rarity, no re-renderiza
    var allCards = document.querySelectorAll(".tower-card");
    for (var i = 0; i < allCards.length; i++) {
        var card = allCards[i];
        var cardId = card.getAttribute("data-card-id");
        var levelValue = card.querySelector(".level-value").textContent;
        var level = parseInt(levelValue);
        updateTowerStats(cardId, globalRarity, level);
    }
}

function changeViewMode(newMode) {
    // Validar modo
    var validModes = ["detailed", "simple", "minimal"];
    if (validModes.indexOf(newMode) === -1) {
        console.error("Modo de vista inválido:", newMode);
        return;
    }
    
    // Evitar cambio si ya está en ese modo
    if (viewMode === newMode) {
        return;
    }
    
    // OPTIMIZADO: Solo cambia clases CSS, no re-renderiza
    var startTime = performance.now();
    viewMode = newMode;
    
    // Actualizar botones activos con animación
    document.querySelectorAll(".view-mode-btn").forEach(function(btn) {
        var isActive = btn.getAttribute("data-mode") === newMode;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive);
    });
    
    // Aplicar clase de vista a todas las tarjetas
    var cards = document.querySelectorAll(".tower-card");
    cards.forEach(function(card) {
        // Remover todas las clases de vista anteriores
        card.classList.remove("view-detailed", "view-simple", "view-minimal");
        // Añadir nueva clase de vista
        card.classList.add("view-" + newMode);
    });
    
    var endTime = performance.now();
    console.log("Cambio de modo " + newMode + " completado en " + (endTime - startTime).toFixed(2) + "ms");
}

// Render Functions
function renderTower(tower, index) {
    var cardId = "tower-" + index;
    var defaultLevel = 1;
    var power = calculatePower(tower, globalRarity, defaultLevel);
    var targetInfo = getTargetInfo(tower.targets);
    var damageInfo = getDamageTypeInfo(tower.damage);
    
    var towerImage = tower.image || getTypeImage(tower.type);
    
    var html = "<div class=\"tower-card view-" + viewMode + "\" data-card-id=\"" + cardId + "\">";
    
    html += "<div class=\"tower-header\">";
    html += "<div class=\"tower-top-section\">";
    html += "<div class=\"tower-info-wrapper\">";
    html += "<div class=\"rarity-banner " + getRarityClass(globalRarity) + "\">" + globalRarity + "</div>";
    html += "<div class=\"tower-name " + getTypeClass(tower.type) + "\">" + tower.name + "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class=\"tower-image-section\">";
    html += "<div class=\"type-icon-overlay-wrapper\">";
    html += "<img src=\"" + getTypeImage(tower.type) + "\" alt=\"" + tower.type + "\" class=\"type-icon-overlay\" onerror=\"this.style.display='none'\">";
    html += "</div>";
    html += "<img src=\"" + towerImage + "\" alt=\"" + tower.name + "\" class=\"tower-main-image\" onerror=\"this.src='" + getTypeImage(tower.type) + "'\">";
    html += "</div>";
    html += "</div>";
    
    if (viewMode === "minimal") {
        html += "<div class=\"tower-meta-minimal\">";
        html += createBadge("🔓 " + formatUnlockText(tower.unlock_at), "unlock-badge");
        html += createBadge(targetInfo.icon + " " + targetInfo.text, "target-badge " + targetInfo.class);
        html += createBadge(damageInfo.icon + " " + damageInfo.type, "damage-badge " + damageInfo.class);
        html += "</div>";
        html += "</div>";
        return html;
    }
    
    html += "<div class=\"tower-body\">";
    
    html += "<div class=\"tower-targets-section\">";
    html += "<div class=\"targets-header\">";
    html += "<span class=\"target-icon\">🎯</span>";
    html += "<span class=\"targets-label\">Targets</span>";
    html += "</div>";
    html += "<div class=\"targets-value\">" + targetInfo.text + "</div>";
    html += "</div>";
    
    html += "<div class=\"tower-stats-grid\">";
    html += "<div class=\"stat-box stat-damage\"><span class=\"stat-icon\">💥</span><div class=\"stat-content\"><span class=\"stat-label\">Damage</span><span class=\"stat-value\">" + formatValue(tower.damage) + "</span></div></div>";
    html += "<div class=\"stat-box stat-attack-rate\"><span class=\"stat-icon\">⚡</span><div class=\"stat-content\"><span class=\"stat-label\">Attack Rate</span><span class=\"stat-value\">" + formatValue(tower.attack_speed) + "</span></div></div>";
    html += "<div class=\"stat-box stat-range\"><span class=\"stat-icon\">📡</span><div class=\"stat-content\"><span class=\"stat-label\">Range</span><span class=\"stat-value\">" + formatValue(tower.range) + "</span></div></div>";
    if (tower.crit_chance) {
        html += "<div class=\"stat-box stat-crit\"><span class=\"stat-icon\">🎯</span><div class=\"stat-content\"><span class=\"stat-label\">Crit</span><span class=\"stat-value\">" + formatValue(tower.crit_chance) + "</span></div></div>";
    }
    html += "</div>";
    
    html += "<div class=\"tower-unlock-badge\">";
    html += "<span class=\"unlock-icon\">🔓</span>";
    html += "<span class=\"unlock-text\">" + formatUnlockText(tower.unlock_at) + "</span>";
    html += "</div>";
    
    // SIEMPRE renderizar upgrades (CSS los oculta según el modo)
    if (tower.upgrades && tower.upgrades.length > 0) {
        html += "<div class=\"tower-upgrades\">";
        html += "<div class=\"upgrades-title\">🔧 Mejoras</div>";
        html += "<div class=\"upgrades-list\">";
        for (var i = 0; i < tower.upgrades.length; i++) {
            var upgrade = tower.upgrades[i];
            if (typeof upgrade === "object" && upgrade.level && upgrade.description) {
                html += "<div class=\"upgrade-item\"><strong>" + upgrade.level + ":</strong> " + upgrade.description + "</div>";
            } else if (typeof upgrade === "string") {
                html += "<div class=\"upgrade-item\">• " + upgrade + "</div>";
            }
        }
        html += "</div>";
        html += "</div>";
    }
    
    // SIEMPRE renderizar comentarios (CSS los oculta según el modo)
    if (tower.commentary) {
        html += "<div class=\"tower-commentary\">";
        html += "<button class=\"commentary-toggle\" data-card=\"" + cardId + "\">💬 Ver Comentario</button>";
        html += "<div class=\"commentary-content\" style=\"display: none;\">" + tower.commentary + "</div>";
        html += "</div>";
    }
    
    html += "</div>"; // Cierra tower-body
    
    html += "<div class=\"tower-bottom\">";
    html += "<div class=\"power-level-row\">";
    html += "<div class=\"power-display\">";
    html += "<span class=\"power-icon\">⚡</span>";
    html += "<span class=\"power-value\">" + power + "</span>";
    html += "</div>";
    html += "<div class=\"level-display\">";
    html += "<span class=\"level-icon\">🎖️</span>";
    html += "<span class=\"level-label\">LVL</span>";
    html += "<span class=\"level-value\">" + defaultLevel + "</span>";
    html += createLevelControls(cardId, defaultLevel);
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "</div>"; // Cierra tower-card
    
    return html;
}

function attachEventListeners() {
    // OPTIMIZADO: Usar delegación de eventos en lugar de múltiples listeners
    var container = document.getElementById("towers-container");
    
    // Event delegation para todos los clicks
    container.addEventListener("click", function(e) {
        var target = e.target;
        
        // View mode buttons
        if (target.classList.contains("view-mode-btn")) {
            changeViewMode(target.getAttribute("data-mode"));
            return;
        }
        
        // Rarity buttons
        if (target.classList.contains("global-rarity-btn")) {
            globalRarity = target.getAttribute("data-rarity");
            
            document.querySelectorAll(".global-rarity-btn").forEach(function(b) { 
                b.classList.remove("active"); 
            });
            target.classList.add("active");
            
            updateAllTowers();
            return;
        }
        
        // Level buttons
        if (target.classList.contains("level-btn")) {
            var cardId = target.getAttribute("data-card");
            var action = target.getAttribute("data-action");
            
            var card = document.querySelector("[data-card-id=\"" + cardId + "\"]");
            var levelValue = card.querySelector(".level-value").textContent;
            var currentLevel = parseInt(levelValue);
            
            var newLevel = currentLevel;
            if (action === "increment" && currentLevel < 100) {
                newLevel = currentLevel + 1;
            } else if (action === "decrement" && currentLevel > 1) {
                newLevel = currentLevel - 1;
            }
            
            updateTowerStats(cardId, globalRarity, newLevel);
            return;
        }
        
        // Commentary toggle
        if (target.classList.contains("commentary-toggle")) {
            var cardId = target.getAttribute("data-card");
            var card = document.querySelector("[data-card-id=\"" + cardId + "\"]");
            var content = card.querySelector(".commentary-content");
            
            if (content.style.display === "none") {
                content.style.display = "block";
                target.textContent = "💬 Ocultar Comentario";
            } else {
                content.style.display = "none";
                target.textContent = "💬 Ver Comentario";
            }
            return;
        }
    });
}

// Main Load Function
async function loadTowers() {
    showLoading();
    
    try {
        var response = await fetch("towers.json");
        if (!response.ok) throw new Error("No se pudo cargar towers.json");
        
        var data = await response.json();
        towersData = data.towers || [];
        
        if (towersData.length === 0) {
            showError("No se encontraron torres en el archivo JSON");
            return;
        }
        
        var container = document.getElementById("towers-container");
        var controlsHtml = "<div id=\"controls-panel\">";
        controlsHtml += createViewModeSelector();
        controlsHtml += createGlobalRaritySelector();
        controlsHtml += "</div>";
        container.innerHTML = controlsHtml;
        
        var towersGrid = document.createElement("div");
        towersGrid.id = "towers-grid";
        towersGrid.className = "towers-grid";
        
        // OPTIMIZADO: Usar DocumentFragment para renderizado más rápido
        var fragment = document.createDocumentFragment();
        var tempDiv = document.createElement("div");
        
        var html = "";
        for (var i = 0; i < towersData.length; i++) {
            html += renderTower(towersData[i], i);
        }
        
        tempDiv.innerHTML = html;
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
        
        towersGrid.appendChild(fragment);
        container.appendChild(towersGrid);
        
        // OPTIMIZADO: Un solo listener con delegación
        attachEventListeners();
        
        console.log("✅ Torres cargadas exitosamente:", towersData.length);
        
    } catch (error) {
        showError("Error: " + error.message);
        console.error("❌ Error cargando torres:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadTowers);