// ============================================
// SCRIPT PRINCIPAL - HERRAMIENTAS AUTOMOTRICES PRO
// ============================================

function initHerramientasApp() {
    console.log('Inicializando scripts de Herramientas Automotrices Pro...');

    // ========================================
    // 1. FILTRO DE HERRAMIENTAS POR CATEGORÍA
    // ========================================
    try {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const toolCategories = document.querySelectorAll('.tool-category');

        function applyFilter(filterValue) {
            filterBtns.forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            toolCategories.forEach(category => {
                const categoryValue = category.getAttribute('data-category');
                if (filterValue === 'all' || categoryValue === filterValue) {
                    category.style.display = 'block';
                    setTimeout(() => category.style.opacity = '1', 10);
                } else {
                    category.style.opacity = '0';
                    setTimeout(() => category.style.display = 'none', 300);
                }
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                window.location.hash = filterValue !== 'all' ? `herramientas/${filterValue}` : 'herramientas';
            });
        });

        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.slice(1);
            let filterValue = 'all';
            if (hash.startsWith('herramientas/')) {
                filterValue = hash.split('/')[1];
            } else if (hash === 'herramientas') {
                filterValue = 'all';
            }
            if (filterValue !== 'all' && !document.querySelector(`.filter-btn[data-filter="${filterValue}"]`)) {
                filterValue = 'all';
            }
            applyFilter(filterValue);
        });

        const initialHash = window.location.hash.slice(1);
        if (initialHash.startsWith('herramientas')) {
            let initialFilter = 'all';
            if (initialHash.startsWith('herramientas/')) {
                initialFilter = initialHash.split('/')[1];
            }
            applyFilter(initialFilter);
        }
    } catch (e) {
        console.error('Error en filtro de categoría:', e);
    }

    // ========================================
    // 2. RECOMENDADOR INTERACTIVO DE HERRAMIENTAS (WIZARD)
    // ========================================
    try {
        const wizardProfile = document.getElementById('wizard-profile');
        const wizardCategory = document.getElementById('wizard-category');
        const resContainer = document.getElementById('wizard-result-box');
        
        const wizardData = {
            'scanner': {
                'profesional': {
                    name: 'Launch CRP123X Pro',
                    img: 'assets/images/Launch CR319.jpg',
                    reason: 'El escáner de diagnóstico preferido por mecánicos: sistemas ABS, SRS, motor y transmisión en tiempo real.',
                    url: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21',
                    tags: ['Mecánico Pro', 'Diagnóstico Avanzado', 'Live Data']
                },
                'aficionado': {
                    name: 'BlueDriver Bluetooth OBD2',
                    img: 'assets/images/BlueDriver.jpg',
                    reason: 'Conexión inalámbrica a tu smartphone. Lee y borra códigos con sugerencias de reparación verificadas.',
                    url: 'https://www.amazon.es/s?k=BlueDriver+Bluetooth+OBD2&tag=herramien044f-21',
                    tags: ['Fácil de usar', 'iOS / Android', 'Reportes Reales']
                },
                'basico': {
                    name: 'Autel MaxiScan MS309',
                    img: 'assets/images/Autel MaxiScan MS309.jpg',
                    reason: 'La mejor herramienta calidad-precio para apagar la luz de Check Engine en segundos.',
                    url: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21',
                    tags: ['Ultra Económico', 'Portátil', 'Plug & Play']
                }
            },
            'multimetro': {
                'profesional': {
                    name: 'Fluke 115 Compact Multimeter',
                    img: 'assets/images/Fluke 115 Compact.jpg',
                    reason: 'Estándar de oro industrial. Precisión categoría CAT III, ideal para electrónica automotriz compleja.',
                    url: 'https://www.amazon.es/s?k=Fluke+115+multimetro+digital&tag=herramien044f-21',
                    tags: ['Precisión Industrial', 'Garantía Fluke', 'CAT III']
                },
                'aficionado': {
                    name: 'Extech EX330 Auto-Ranging',
                    img: 'assets/images/Extech EX330 Handheld.jpg',
                    reason: 'Excelente pantalla grande, detector de voltaje sin contacto y termómetro integrado.',
                    url: 'https://www.amazon.es/s?k=AstroAI+multimetro+digital+automotriz&tag=herramien044f-21',
                    tags: ['Rango Automático', 'Sensor Temp', 'Muy Completo']
                },
                'basico': {
                    name: 'Multímetro Automotriz Auto-Rango',
                    img: 'assets/images/Victor VC9808A.jpg',
                    reason: 'Fiabilidad al mejor precio para mediciones de batería, alternador y fusibles en el auto.',
                    url: 'https://www.amazon.es/s?k=multimetro+digital+automotriz+auto-rango&tag=herramien044f-21',
                    tags: ['Económico', 'Uso Ocasional', 'Lectura Rápida']
                }
            },
            'impacto': {
                'profesional': {
                    name: 'DeWalt 18V / 20V XR Impact Wrench',
                    img: 'assets/images/Launch CR319.jpg',
                    reason: 'Torque de ruptura masivo para tuercas de rueda y suspensión pesada en taller.',
                    url: 'https://www.amazon.es/s?k=DeWalt+llave+de+impacto+18V&tag=herramien044f-21',
                    tags: ['Motor Brushless', 'Alto Torque', 'Batería Li-Ion']
                },
                'aficionado': {
                    name: 'Milwaukee M18 Fuel Compact',
                    img: 'assets/images/BlueDriver.jpg',
                    reason: 'Diseño compacto para ingresar a espacios reducidos del motor con fuerza profesional.',
                    url: 'https://www.amazon.es/s?k=Milwaukee+M18+llave+de+impacto&tag=herramien044f-21',
                    tags: ['Compacta', 'Garantía 5 años', 'Ergonómica']
                },
                'basico': {
                    name: 'Llave de Impacto Eléctrica 1/2"',
                    img: 'assets/images/Autel MaxiScan MS309.jpg',
                    reason: 'Excelente opción para cambios de neumáticos y mantenimiento doméstico.',
                    url: 'https://www.amazon.es/s?k=llave+de+impacto+a+bateria&tag=herramien044f-21',
                    tags: ['Sin Baterías', 'Potencia Constante', 'Barata']
                }
            },
            'compresor': {
                'profesional': {
                    name: 'Compresor de Aire 30L Industrial',
                    img: 'assets/images/Fluke 115 Compact.jpg',
                    reason: 'Flujo continuo de aire para pistolas neumáticas, pintura y herramientas de taller.',
                    url: 'https://www.amazon.es/s?k=compresor+de+aire+50L+taller&tag=herramien044f-21',
                    tags: ['Uso Continuo', 'Bajo Ruido', 'Gran Capacidad']
                },
                'aficionado': {
                    name: 'Compresor Portátil 12V / 110V',
                    img: 'assets/images/BlueDriver.jpg',
                    reason: 'Perfecto para llevar en el maletero e inflar neumáticos en emergencia o paseos.',
                    url: 'https://www.amazon.es/s?k=compresor+aire+portatil+coche+12V&tag=herramien044f-21',
                    tags: ['12V Encendedor', 'Display Digital', 'Portátil']
                },
                'basico': {
                    name: 'Inflador Compacto de Neumáticos',
                    img: 'assets/images/Autel MaxiScan MS309.jpg',
                    reason: 'Pequeño, rápido y con parada automática al llegar a la presión deseada.',
                    url: 'https://www.amazon.es/s?k=inflador+neumaticos+coche+digital&tag=herramien044f-21',
                    tags: ['Corte Automático', 'Luz LED', 'Económico']
                }
            },
            'arrancador': {
                'profesional': {
                    name: 'NOCO Boost Max GB250 5250A',
                    img: 'assets/images/Launch CR319.jpg',
                    reason: 'Capacidad para motores diésel pesados de camión y flota de taller.',
                    url: 'https://www.amazon.es/s?k=NOCO+Boost+Max+GB250+arrancador&tag=herramien044f-21',
                    tags: ['5250 Amperios', 'Uso Rudo', 'Protección Total']
                },
                'aficionado': {
                    name: 'NOCO Boost Plus GB40 1000A',
                    img: 'assets/images/BlueDriver.jpg',
                    reason: 'Líder en ventas. Tamaño ideal para guantera y arranca autos de hasta 6.0L.',
                    url: 'https://www.amazon.es/s?k=NOCO+Boost+Plus+GB40+arrancador&tag=herramien044f-21',
                    tags: ['PowerBank USB', 'Linterna LED', 'UltraSafe']
                },
                'basico': {
                    name: 'Arrancador Portátil Compacto 800A',
                    img: 'assets/images/Autel MaxiScan MS309.jpg',
                    reason: 'Solución económica de respaldo en carretera para autos de 4 cilindros.',
                    url: 'https://www.amazon.es/s?k=arrancador+bateria+coche+portatil+800A&tag=herramien044f-21',
                    tags: ['Económico', 'Carga Tipo-C', 'Pinzas Inteligentes']
                }
            }
        };

        function updateWizard() {
            if (!wizardProfile || !wizardCategory || !resContainer) return;
            const cat = wizardCategory.value;
            const prof = wizardProfile.value;
            const result = wizardData[cat] && wizardData[cat][prof] ? wizardData[cat][prof] : wizardData['scanner']['profesional'];

            resContainer.innerHTML = `
                <img src="${result.img}" alt="${result.name}" loading="lazy" style="max-width:120px; max-height:120px; object-fit:contain;">
                <div class="wizard-info">
                    <h4>${result.name}</h4>
                    <p class="reason">${result.reason}</p>
                    <div class="wizard-tags">
                        ${result.tags.map(tag => `<span class="wizard-tag">✓ ${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="wizard-cta">
                    <a href="${result.url}" target="_blank" rel="sponsored nofollow noopener" class="table-cta-btn">
                        🔥 Ver Precio en Amazon
                    </a>
                    <span style="font-size:0.75rem; color:#64748b;">⭐ Garantía Amazon</span>
                </div>
            `;
        }

        if (wizardProfile && wizardCategory) {
            wizardProfile.addEventListener('change', updateWizard);
            wizardCategory.addEventListener('change', updateWizard);
            updateWizard();
        }
    } catch (e) {
        console.error('Error en wizard:', e);
    }

    // ========================================
    // 3. BUSCADOR INTERACTIVO DE CÓDIGOS DTC OBD2
    // ========================================
    try {
        const dtcInput = document.getElementById('dtc-search-input');
        const dtcResultBox = document.getElementById('dtc-result-container');
        const dtcChips = document.querySelectorAll('.dtc-chip');

        const dtcDatabase = {
            'P0300': {
                title: 'Fallo de Encendido Múltiple / Aleatorio Detectado (Random Misfire)',
                severity: 'Alta (Afecta el rendimiento y puede dañar el catalizador)',
                causes: ['Bujías desgastadas o sulfatadas', 'Cables de bujía o bobinas defectuosas', 'Inyectores de combustible sucios o tapados', 'Baja presión de bomba de gasolina'],
                fix: 'Comprobar bujías con un multímetro y reemplazar el conjunto si supera los 40,000 km.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0420': {
                title: 'Eficiencia del Sistema Catalítico por Debajo del Umbral (Banco 1)',
                severity: 'Media (Aumenta emisiones y consumo de combustible)',
                causes: ['Convertidor catalítico obstruido o dañado', 'Sensor de oxígeno trasero (O2) defectuoso', 'Fuga de escape antes del catalizador'],
                fix: 'Verificar lecturas en tiempo real del sensor de O2 posterior con tu escáner antes de reemplazar el catalizador.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21'
            },
            'P0171': {
                title: 'Sistema Demasiado Magro / Pobre de Combustible (Banco 1 - Lean)',
                severity: 'Media-Alta (Entra demasiada mezcla de aire y poco combustible)',
                causes: ['Sensor MAF (Flujo de masa de aire) sucio', 'Fuga de vacío en la manguera de admisión', 'Filtro de combustible obstruido'],
                fix: 'Limpiar el sensor MAF con spray limpiador especializado y revisar mangueras de vacío.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0301': {
                title: 'Fallo de Encendido Detectado en el Cilindro 1',
                severity: 'Alta (Vibración del motor y pérdida de potencia)',
                causes: ['Bobina de encendido del Cilindro 1 fallada', 'Bujía del Cilindro 1 quemada', 'Falta de compresión en cilindro 1'],
                fix: 'Intercambiar la bobina del Cilindro 1 con el Cilindro 2. Si el código cambia a P0302, la bobina está defectuosa.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21'
            },
            'P0442': {
                title: 'Fuga Pequeña Detectada en el Sistema EVAP (Control de Emisiones Evaporativas)',
                severity: 'Baja (No afecta la conducción inmediata)',
                causes: ['Tapa de combustible suelta, gastada o rajada', 'Manguera de canister EVAP agrietada', 'Válvula de purga pegada'],
                fix: 'Apretar o reemplazar la tapa del tanque de gasolina, borrar el código y realizar prueba de manejo.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21'
            },
            'P0135': {
                title: 'Fallo en el Circuito del Calentador del Sensor de Oxígeno (Banco 1 Sensor 1)',
                severity: 'Media (Causa alto consumo de combustible en frío)',
                causes: ['Resistencia del calentador del sensor O2 quemada', 'Fusible del sensor fundido', 'Cableado dañado'],
                fix: 'Medir la resistencia de la resistencia del calentador con un multímetro automotriz.',
                scanner: 'BlueDriver Bluetooth OBD2',
                link: 'https://www.amazon.es/s?k=BlueDriver+Bluetooth+OBD2&tag=herramien044f-21'
            },
            'P0141': {
                title: 'Falla Circuito Calentador Sensor de Oxígeno (Banco 1 Sensor 2)',
                severity: 'Media (Monitoreo de catalizador comprometido)',
                causes: ['Elemento calefactor del sensor O2 secundario abierto', 'Conector sulfatado o con agua', 'Cable cortado por roce de escape'],
                fix: 'Probar continuidad de las dos líneas calefactoras con multímetro digital.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0401': {
                title: 'Flujo Insuficiente de Recirculación de Gases de Escape (EGR)',
                severity: 'Media (Aumento de emisiones NOx y cascabeleo en aceleración)',
                causes: ['Conductos de EGR tapados de carbón', 'Válvula EGR atascada cerrada', 'Sensor de presión diferencial DPFE defectuoso'],
                fix: 'Desmontar y limpiar la válvula EGR y conductos del múltiple de admisión con spray carbu-clean.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0455': {
                title: 'Fuga Grande en Sistema de Control de Emisiones Evaporativas (EVAP Gross Leak)',
                severity: 'Media-Baja (Fuga masiva de vapores de gasolina)',
                causes: ['Tapón de gasolina ausente o mal enroscado', 'Manguera EVAP desconectada', 'Válvula de venteo (Vent Valve) abierta trabada'],
                fix: 'Verificar el ajuste del tapón de gasolina e inspeccionar las mangueras que llegan al cánister bajo el chasis.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21'
            },
            'P0700': {
                title: 'Falla General en el Sistema de Control de Transmisión Automática (TCM)',
                severity: 'Crítica / Modo Emergencia (Limp Mode)',
                causes: ['Solenoide de cambio trabado', 'Nivel de fluido ATF bajo o quemado', 'Sensor de velocidad de entrada/salida de caja defectuoso'],
                fix: 'Escanear el módulo TCM dedicado (requiere escáner multisistema de 4 sistemas) para leer códigos secundarios de caja.',
                scanner: 'Launch CRP123X Pro',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0101': {
                title: 'Sensor de Flujo de Masa de Aire (MAF) Rango / Rendimiento',
                severity: 'Media (Aceleración perezosa y consumo elevado)',
                causes: ['Filamento MAF sucio', 'Filtro de aire tapado o roto', 'Fuga de aire entre el MAF y el cuerpo de aceleración'],
                fix: 'Limpiar el sensor con spray dieléctrico para MAF y revisar el estado del filtro de aire.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=limpiador+sensor+maf+spray&tag=herramien044f-21'
            },
            'P0102': {
                title: 'Circuito de Flujo de Masa de Aire (Sensor MAF) Entrada Baja',
                severity: 'Alta (Falta de potencia y ahogo al acelerar)',
                causes: ['Filamento sensor MAF contaminado con polvo o aceite', 'Filtro de aire roto', 'Cable de señal a tierra en corto'],
                fix: 'Limpiar el filamento con limpiador de sensor MAF sin residuo; comprobar 12V y 5V de referencia.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0103': {
                title: 'Sensor de Flujo de Masa de Aire (MAF) Entrada Alta del Circuito',
                severity: 'Alta (Humo negro por escape y mezcla excesivamente rica)',
                causes: ['Cortocircuito a 12V o 5V en la línea de señal', 'Pérdida de tierra del sensor MAF', 'Falla interna electrónica del sensor'],
                fix: 'Probar masa y voltajes con multímetro; reemplazar sensor si el cableado está intacto.',
                scanner: 'Multímetro Automotriz',
                link: 'https://www.amazon.es/s?k=multimetro+digital+automotriz+auto-rango&tag=herramien044f-21'
            },
            'P0500': {
                title: 'Falla en el Sensor de Velocidad del Vehículo (VSS)',
                severity: 'Media-Alta (Velocímetro muerto, cambios bruscos de caja)',
                causes: ['Sensor de velocidad en caja roto', 'Engranaje plástico gastado', 'Falla en módulo ABS que entrega señal VSS a la ECU'],
                fix: 'Comprobar pulso de señal de onda cuadrada del sensor con multímetro o escáner en vivo.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            },
            'P0128': {
                title: 'Temperatura del Refrigerante del Motor por Debajo de Regulación (Termostato)',
                severity: 'Media (El motor nunca alcanza su temperatura normal de 90°C)',
                causes: ['Termostato pegado abierto', 'Sensor de temperatura ECT descalibrado', 'Electroventilador encendido permanentemente'],
                fix: 'Reemplazar termostato y purgar el sistema de refrigeración con anticongelante 50/50.',
                scanner: 'Autel MS309',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21'
            },
            'P0301': {
                title: 'Fallo de Encendido Detectado en Cilindro 1 (Misfire)',
                severity: 'Alta (Peligro de daño en convertidor catalítico por gasolina cruda)',
                causes: ['Bobina de encendido quemada', 'Bujía desgastada con electrodo quemado', 'Inyector obstruido o baja compresión'],
                fix: 'Intercambiar bobina con el cilindro 2 para confirmar; reemplazar bujía y comprobar compresión si persiste.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            }
        };

        function displayDTCResult(code) {
            if (!dtcResultBox) return;
            const upperCode = code.trim().toUpperCase();
            if (!upperCode) {
                dtcResultBox.classList.add('hidden');
                return;
            }

            const data = dtcDatabase[upperCode] || {
                title: `Código DTC ${upperCode} registrado`,
                severity: 'Diagnóstico Estándar OBD2',
                causes: ['Sensor descalibrado o falla puntual en circuito', 'Baja batería durante el arranque', 'Código pendiente en computadora ECU'],
                fix: 'Escanea el vehículo con un equipo multitarea OBD2 para ver datos en tiempo real.',
                scanner: 'Launch CRP123X',
                link: 'https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21'
            };

            dtcResultBox.innerHTML = `
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3 mb-4">
                    <div>
                        <span class="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded">DTC: ${upperCode}</span>
                        <h3 class="text-xl font-extrabold text-slate-900 mt-1">${data.title}</h3>
                    </div>
                    <span class="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full"><i class="fas fa-exclamation-triangle"></i> Severidad: ${data.severity}</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm mb-2"><i class="fas fa-list-ul text-orange-500"></i> Causas más Frecuentes:</h4>
                        <ul class="text-xs text-gray-700 space-y-1.5 list-disc pl-4">
                            ${data.causes.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                        <div class="mt-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <h4 class="font-bold text-slate-900 text-xs mb-1"><i class="fas fa-tools text-orange-600"></i> Paso de Diagnóstico Recomendado:</h4>
                            <p class="text-xs text-gray-700">${data.fix}</p>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 flex flex-col justify-between text-center">
                        <div>
                            <span class="text-xs text-gray-500 uppercase font-bold">Escáner Recomendado para este Código</span>
                            <h4 class="font-extrabold text-slate-900 text-base mt-1">${data.scanner}</h4>
                            <p class="text-xs text-gray-600 mt-1">Borra este código instantáneamente y apaga la luz Check Engine.</p>
                        </div>
                        <a href="${data.link}" target="_blank" rel="sponsored nofollow noopener" class="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg shadow text-xs transition flex items-center justify-center gap-2">
                            <i class="fab fa-amazon"></i> Verificar Disponibilidad en Amazon
                        </a>
                    </div>
                </div>
            `;
            dtcResultBox.classList.remove('hidden');
        }

        if (dtcInput) {
            dtcInput.addEventListener('input', function() {
                if (this.value.trim().length >= 3) {
                    displayDTCResult(this.value);
                } else if (this.value.trim().length === 0 && dtcResultBox) {
                    dtcResultBox.classList.add('hidden');
                }
            });
            dtcInput.addEventListener('keyup', function() {
                if (this.value.trim().length >= 3) {
                    displayDTCResult(this.value);
                }
            });
        }

        dtcChips.forEach(chip => {
            chip.addEventListener('click', function() {
                const code = this.getAttribute('data-code');
                if (dtcInput) dtcInput.value = code;
                displayDTCResult(code);
            });
        });
    } catch (e) {
        console.error('Error en buscador DTC:', e);
    }

    // ========================================
    // 4. COMPATIBILIDAD POR MARCAS
    // ========================================
    try {
        const brandBtns = document.querySelectorAll('.brand-btn');
        const brandTitle = document.getElementById('brand-result-title');
        const brandDesc = document.getElementById('brand-result-desc');
        const brandLink = document.getElementById('brand-result-link');

        const brandMap = {
            'Toyota': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+Toyota+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X & Autel MS309', notes: 'Soporta protocolos ISO9141 y CAN bus de Toyota desde 1996 en adelante.' },
            'Chevrolet': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+Chevrolet+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X & BlueDriver', notes: 'Lectura completa de códigos de transmisión y motor para Chevy/GM.' },
            'Ford': { link: 'https://www.amazon.es/s?k=BlueDriver+Bluetooth+OBD2+Ford&tag=herramien044f-21', scanner: 'BlueDriver Bluetooth & Launch', notes: 'Compatibilidad total con protocolos PWM y CAN de Ford.' },
            'Volkswagen': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+Volkswagen+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X Pro', notes: 'Diagnóstico rápido de motor, ABS y airbags en VAG (VW, Audi, SEAT).' },
            'Nissan': { link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+Nissan+OBD2&tag=herramien044f-21', scanner: 'Autel MS309 & Launch', notes: 'Borrado instantáneo de códigos de fallas Check Engine en Nissan.' },
            'Hyundai': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+Hyundai+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X', notes: 'Lectura en tiempo real de temperatura de transmisión y sensores.' },
            'Kia': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+Kia+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X', notes: '100% compatible con todos los motores MPI y GDI de Kia.' },
            'Honda': { link: 'https://www.amazon.es/s?k=BlueDriver+Bluetooth+OBD2+Honda&tag=herramien044f-21', scanner: 'BlueDriver & Launch', notes: 'Lectura precisa de códigos VTEC y sensores ABS.' },
            'BMW': { link: 'https://www.amazon.es/s?k=Launch+CRP123X+BMW+OBD2&tag=herramien044f-21', scanner: 'Launch CRP123X Pro', notes: 'Soporta protocolos de diagnóstico avanzados europeos.' },
            'Renault': { link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+Renault+OBD2&tag=herramien044f-21', scanner: 'Autel MS309 & Launch', notes: 'Conexión estándar OBD2 de 16 pines verificada.' }
        };

        brandBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                brandBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const brand = this.getAttribute('data-brand');
                const data = brandMap[brand] || brandMap['Toyota'];

                if (brandTitle) brandTitle.textContent = `Compatibilidad confirmada para vehículos ${brand.toUpperCase()} (1996 - 2026)`;
                if (brandDesc) brandDesc.innerHTML = `Recomendados: <strong>${data.scanner}</strong>. ${data.notes}`;
                if (brandLink) {
                    brandLink.href = data.link;
                    brandLink.textContent = `🔥 Ver Escáner ${brand} en Amazon`;
                }
            });
        });
    } catch (e) {
        console.error('Error en compatibilidad por marcas:', e);
    }

    // ========================================
    // 5. CALCULADORA DE AHORRO (ROI)
    // ========================================
    try {
        const roiSelect = document.getElementById('roi-service-select');
        const roiShopCost = document.getElementById('roi-shop-cost');
        const roiToolCost = document.getElementById('roi-tool-cost');
        const roiSavings = document.getElementById('roi-savings');
        const roiResultBox = document.getElementById('roi-recommendation-box');

        const roiDatabase = {
            'checkengine': {
                shop: 85,
                tool: 29,
                toolName: 'Autel MaxiScan MS309 OBD2',
                link: 'https://www.amazon.es/s?k=Autel+MaxiScan+MS309+OBD2&tag=herramien044f-21',
                desc: 'Lee y borra códigos de motor Check Engine ilimitadas veces sin pagar diagnóstico en taller.'
            },
            'bateria': {
                shop: 120,
                tool: 65,
                toolName: 'NOCO Boost Plus GB40 1000A',
                link: 'https://www.amazon.es/s?k=NOCO+Boost+Plus+GB40+arrancador&tag=herramien044f-21',
                desc: 'Evita pagar servicio de grúa o auxilio mecánico. Arranca tu auto tú mismo en 30 segundos.'
            },
            'multimetro': {
                shop: 95,
                tool: 24,
                toolName: 'Multímetro Automotriz Digital Auto-Rango',
                link: 'https://www.amazon.es/s?k=AstroAI+multimetro+digital+automotriz&tag=herramien044f-21',
                desc: 'Prueba la salud del alternador, batería y fugas de corriente sin adivinar ni cambiar piezas al azar.'
            },
            'boroscopio': {
                shop: 180,
                tool: 59,
                toolName: 'DEPSTECH Boroscopio 1080P Doble Lente',
                link: 'https://www.amazon.es/s?k=DEPSTECH+boroscopio+automotriz+doble+lente&tag=herramien044f-21',
                desc: 'Inspecciona válvulas, pistones y fuga de fluidos dentro del motor sin desarmar la culata.'
            },
            'ruedas': {
                shop: 70,
                tool: 98,
                toolName: 'Llave de Impacto de Alto Torque',
                link: 'https://www.amazon.es/s?k=DeWalt+llave+de+impacto+18V&tag=herramien044f-21',
                desc: 'Remueve tuercas de llantas pegadas y trabaja en suspensión como profesional en tu cochera.'
            }
        };

        function updateROICalculator() {
            if (!roiSelect || !roiResultBox) return;
            const key = roiSelect.value;
            const data = roiDatabase[key] || roiDatabase['checkengine'];
            const savings = data.shop - data.tool;

            if (roiShopCost) roiShopCost.textContent = `${data.shop} €`;
            if (roiToolCost) roiToolCost.textContent = `${data.tool} €`;
            if (roiSavings) roiSavings.textContent = `${savings} €`;

            roiResultBox.innerHTML = `
                <span class="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-500/30">
                    <i class="fas fa-piggy-bank"></i> Te Ahorras ${savings} € desde el 1er uso
                </span>
                <h4 class="font-extrabold text-white text-base mt-2">${data.toolName}</h4>
                <p class="text-xs text-slate-300 leading-relaxed">${data.desc}</p>
                <a href="${data.link}" target="_blank" rel="sponsored nofollow noopener" class="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-xs shadow-lg transition flex items-center justify-center gap-2">
                    <i class="fab fa-amazon"></i> 🔥 Comprar en Amazon (${data.tool} €) y Ahorrar
                </a>
            `;
        }

        if (roiSelect) {
            roiSelect.addEventListener('change', updateROICalculator);
            updateROICalculator();
        }
    } catch (e) {
        console.error('Error en calculadora ROI:', e);
    }

    // ========================================
    // 6. ACCORDION FAQ
    // ========================================
    try {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    } catch (e) {
        console.error('Error en FAQ accordion:', e);
    }

    // ========================================
    // 7. ASISTENTE / QUIZ INTERACTIVO DE ESCÁNERES
    // ========================================
    try {
        const quizBtns = document.querySelectorAll('.scanner-quiz-btn');
        quizBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                quizBtns.forEach(b => {
                    b.classList.remove('active', 'bg-orange-500', 'text-white');
                    b.classList.add('bg-slate-800', 'text-slate-300');
                });
                this.classList.add('active', 'bg-orange-500', 'text-white');
                this.classList.remove('bg-slate-800', 'text-slate-300');

                document.querySelectorAll('.quiz-panel').forEach(panel => {
                    panel.classList.add('hidden');
                });
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                }
            });
        });
    } catch (e) {
        console.error('Error en scanner quiz:', e);
    }

    // ========================================
    // 8. BARRA FLOTANTE DE CONVERSIÓN MÓVIL (STICKY CTA)
    // ========================================
    try {
        if (!document.getElementById('mobile-sticky-cta')) {
            const stickyBar = document.createElement('div');
            stickyBar.id = 'mobile-sticky-cta';
            stickyBar.className = 'mobile-sticky-cta';
            stickyBar.innerHTML = `
                <div class="flex flex-col text-left text-white leading-tight">
                    <span class="text-[10px] text-orange-400 font-bold uppercase tracking-wider">🔥 Top Oferta Amazon</span>
                    <span class="text-xs font-black truncate max-w-[170px] text-white">Launch CRP123X OBD2</span>
                </div>
                <a href="https://www.amazon.es/s?k=Launch+CRP123X+Pro+escaner+automotriz&tag=herramien044f-21" target="_blank" rel="sponsored nofollow noopener" class="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-extrabold px-3.5 py-2 rounded-lg text-xs shadow-md transition flex items-center gap-1.5 whitespace-nowrap">
                    <i class="fab fa-amazon text-sm"></i> Ver en Amazon
                </a>
            `;
            document.body.appendChild(stickyBar);

            window.addEventListener('scroll', function() {
                if (window.scrollY > 450) {
                    stickyBar.classList.add('visible');
                } else {
                    stickyBar.classList.remove('visible');
                }
            }, { passive: true });
        }
    } catch (e) {
        console.error('Error en mobile sticky cta:', e);
    }
}

// Ejecutar inmediatamente si el DOM ya se cargó, o escuchar DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHerramientasApp);
} else {
    initHerramientasApp();
}
