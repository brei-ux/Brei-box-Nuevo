// ============================================================
// BREI-BOX — js/catalogo.js
// Sin módulos ES: funciona abriendo el HTML directamente.
// ============================================================

var catalogo = {

    guitarras: [
        {
            id: "fender-stratocaster-hendrix",
            nombre: "Fender Stratocaster Jimi Hendrix Olympic White",
            descripcion:
                "Réplica oficial de la icónica Stratocaster que Jimi Hendrix tocó invertida en su época dorada. " +
                "Fabricada en la planta de Ensenada, reproduce fielmente los detalles vintage de finales de los 60: " +
                "mástil en U suave, golpeador de 3 capas blanco y pickups en posición de zurdo montada en diestro, " +
                "consiguiendo así el tono brillante y agresivo que Hendrix consagró en Woodstock.",
            caracteristicas: [
                "Cuerpo de aliso (Alder) con acabado Olympic White",
                "Mástil de arce en C suave con radio 9.5 pulgadas (241 mm)",
                "Diapasón de arce con 21 trastes medium jumbo",
                "Pickups Jimi Hendrix Vintage Noiseless (juego de 3)",
                "Puente vintage sincronizado de 6 sillas de acero",
                "Clavijero estilo Fender reversed (zurdo / montaje diestro)",
                "Electrónica: 1 volumen, 2 tonos, selector de 5 posiciones",
                "Longitud de escala: 648 mm (25.5 pulgadas)",
            ],
            precio: 1300,
            imagen: "../img/Fender-Eléctricas/fender-jimi-hendrix-stratocaster-mn-olympic-white.jpg",
        },
        {
            id: "gibson-flying-v",
            nombre: "Gibson Flying V",
            descripcion:
                "La Flying V es uno de los diseños más atrevidos de Gibson, presentado en 1958 y rescatado en los 70 " +
                "por artistas como Albert King y Jimi Hendrix. Su cuerpo en V de caoba proporciona un sustain " +
                "extraordinario y un acceso sin rival a los trastes más altos. Perfecta para rock clásico, blues y metal.",
            caracteristicas: [
                "Cuerpo de caoba (Mahogany) en forma de V",
                "Mástil de caoba encolado, perfil Slim Taper",
                "Diapasón de palisandro con radio 12 pulgadas (305 mm)",
                "Pastillas Gibson 490R (mástil) y 490T (puente)",
                "Puente ABR-1 y cordal Stop Bar de aluminio",
                "Clavijero Kluson-style de 3+3",
                "Electrónica: 2 volúmenes, 1 tono, selector de 3 posiciones",
                "Longitud de escala: 628 mm (24.75 pulgadas)",
            ],
            precio: 1500,
            imagen: "../img/Gibson-Eléctricas/Gibson Flying V.png",
        },
        {
            id: "gibson-sg-clapton-fool",
            nombre: "Eric Clapton Gibson SG The Fool",
            descripcion:
                "Réplica de la célebre Gibson SG Standard de 1964 que Eric Clapton utilizó durante su etapa con Cream. " +
                "The Fool es la guitarra más reconocida de Clapton de esa época, decorada por el colectivo holandés " +
                "The Fool con motivos psicodélicos. Esta versión captura el peso ligero y el punch del diseño " +
                "original que definió el blues-rock de los 60.",
            caracteristicas: [
                "Cuerpo de caoba (Mahogany) con tapa plana",
                "Mástil de caoba encolado, perfil vintage en C",
                "Diapasón de palisandro con 22 trastes medium",
                "Pastillas PAF-style humbuckers de bobina doble",
                "Puente Tune-o-Matic y cordal Stop Bar",
                "Doble cutaway de acceso libre hasta el traste 22",
                "Electrónica: 2 volúmenes, 2 tonos, selector de 3 posiciones",
                "Longitud de escala: 628 mm (24.75 pulgadas)",
            ],
            precio: 3700,
            imagen: "../img/Gibson-Eléctricas/78461f02052fd0a04eb02f6c47cab6bc2de01daa-1000x1000.png",
        },
        {
            id: "fender-jazzmaster-troy-van-leeuwen",
            nombre: "Fender Jazzmaster Troy Van Leeuwen Oxblood",
            descripcion:
                "Firma del guitarrista de Queens of the Stone Age, Troy Van Leeuwen, esta Jazzmaster combina la " +
                "estética offset original de los 60 con modificaciones modernas pensadas para la acción en directo. " +
                "El acabado Oxblood sobre caoba la distingue de cualquier Jazzmaster estándar y la convierte en una " +
                "pieza tan coleccionable como funcional.",
            caracteristicas: [
                "Cuerpo de caoba (Mahogany) con acabado Oxblood",
                "Mástil de arce con diapasón de palisandro bound (radio 9.5 pulgadas)",
                "22 trastes medium jumbo",
                "Pastillas Troy Van Leeuwen Jazzmaster (custom CuNiFe)",
                "Sistema de vibrato Jazzmaster rhythm/lead circuit",
                "Puente ajustable de barril con cordal de rodillo",
                "Botones Dunlop Straplock de serie",
                "Longitud de escala: 648 mm (25.5 pulgadas)",
            ],
            precio: 2000,
            imagen: "../img/Fender-Eléctricas/guitarra-electrica-fender-troy-van-leeuwen-signature-jazzmaster-bound-rosewood-oxblood.png",
        },
        {
            id: "gibson-eds-1275-jimmy-page",
            nombre: "Gibson EDS-1275 Jimmy Page Double Neck",
            descripcion:
                "Réplica de la doble mástil que Jimmy Page inmortalizó en la interpretación en directo de Stairway to Heaven. " +
                "La EDS-1275 combina un mástil de 6 cuerdas y uno de 12 cuerdas en un solo cuerpo SG, " +
                "permitiendo cambiar instantáneamente de registro sin cambiar de instrumento. Una joya de ingeniería " +
                "lutherie y uno de los iconos absolutos del rock.",
            caracteristicas: [
                "Cuerpo doble de caoba (Mahogany), estilo SG",
                "Mástil 6 cuerdas + mástil 12 cuerdas (ambos caoba encolados)",
                "Diapasones de palisandro, perfil vintage en C",
                "4 pastillas humbuckers 490R/490T (dos por mástil)",
                "Controles individuales por mástil: 2 volúmenes + 2 tonos",
                "Selector de mástil activo de 3 posiciones",
                "Puente Tune-o-Matic y cordal Stop Bar en cada mástil",
                "Longitud de escala: 628 mm (24.75 pulgadas) en ambos mástiles",
            ],
            precio: 20000,
            imagen: "../img/Gibson-Eléctricas/1989_Gibson_EDS-1275.png",
        },
        {
            id: "fender-stratocaster-gilmour",
            nombre: "David Gilmour Fender Custom Shop Stratocaster NOS",
            descripcion:
                "Réplica exacta de la legendaria Black Strat de David Gilmour, la guitarra que definió el sonido " +
                "de Pink Floyd en discos como The Dark Side of the Moon, Wish You Were Here y The Wall. " +
                "Fabricada en el Custom Shop de Fender con las especificaciones que el propio Gilmour aprobó: " +
                "cuerpo de aliso negro, mástil de arce de los 70 y la combinación de pastillas única que él configuró.",
            caracteristicas: [
                "Cuerpo de aliso (Alder) con acabado negro NOS (New Old Stock)",
                "Mástil de arce de un solo trozo, perfil de los 70 (tipo C/U)",
                "Diapasón de arce con 21 trastes vintage narrow-tall",
                "Pastillas: EMG-DG20 (set exclusivo David Gilmour)",
                "Puente Fender vintage 2-pivot de 6 sillas de acero inox",
                "Clavijero Sperzel Trim-Lok de bloqueo",
                "Golpeador de 1 capa negro (sin bisel blanco)",
                "Longitud de escala: 648 mm (25.5 pulgadas)",
            ],
            precio: 4000,
            imagen: "../img/Fender-Eléctricas/1502952061Fender_Custom_Shop_David_Gilmour_Stratocaster_NOS.jpg",
        },
        {
            id: "gibson-les-paul-classic",
            nombre: "Gibson Les Paul Classic",
            descripcion:
                "La Les Paul Classic recupera el espíritu de las legendarias Burst de 1959 con detalles modernos " +
                "para el guitarrista contemporáneo. Uno de los diseños más influyentes de la historia, utilizado " +
                "por artistas como Slash, Jimmy Page o Joe Perry. Combina el calor y el sustain ilimitado de su " +
                "construcción de caoba con la precisión de sus pastillas 57 Classic.",
            caracteristicas: [
                "Cuerpo de caoba (Mahogany) con tapa de arce flameado",
                "Mástil de caoba encolado, perfil 60s Slim Taper en D",
                "Diapasón de palisandro con radio 12 pulgadas y 22 trastes medium jumbo",
                "Pastillas Gibson 57 Classic (mástil) y 57 Classic Plus (puente)",
                "Puente Tune-o-Matic Nashville y cordal Stop Bar aluminio",
                "Clavijero Grover Rotomatic de 18:1",
                "Electrónica: 2 volúmenes CTS push-pull (coil-split), 2 tonos, selector 3 posiciones",
                "Longitud de escala: 628 mm (24.75 pulgadas)",
            ],
            precio: 2500,
            imagen: "../img/Gibson-Eléctricas/gibson-les-paul-classic-hcs-p-32523.jpg",
        },
        {
            id: "danelectro-dc59",
            nombre: "Danelectro 3021 DC59",
            descripcion:
                "La Danelectro DC59 es una de las guitarras con más carácter y personalidad del mercado. Originaria " +
                "de los 50, fue utilizada por artistas como Jimmy Page en sesiones de estudio y por Syd Barrett. " +
                "Su construcción semisólida de masonite le da un tono nasal y twangy único, imposible de replicar " +
                "con una guitarra convencional. Una opción fantástica para cualquier amante del sonido vintage.",
            caracteristicas: [
                "Cuerpo semisólido de masonite sobre bastidor de chopo",
                "Mástil de arce de un solo trozo con diapasón de palisandro",
                "21 trastes vintage medium",
                "Pastillas Lipstick Tube de simple bobina (x2)",
                "Puente ajustable estilo Danelectro vintage",
                "Clavijero con botones de nacar (vintage style)",
                "Electrónica: 2 volúmenes, 1 tono, selector de 3 posiciones",
                "Longitud de escala: 648 mm (25.5 pulgadas)",
            ],
            precio: 650,
            imagen: "../img/Fender-Eléctricas/Danelectro3021dc59.png",
        },
    ],

    amplificadores: [
        {
            id: "fender-65-deluxe-reverb",
            nombre: "Fender 65 Deluxe Reverb",
            descripcion:
                "Reissue del amplificador combo que definió el sonido del surf y el blues americano en los años 60. " +
                "El Fender 65 Deluxe Reverb tiene 22 vatios de pura electrónica de válvulas, reverb de muelle y " +
                "vibrato incorporados, y el glorioso clean que hizo famoso a Fender. Favorito de Neil Young, " +
                "Billy Gibbons y referencia en estudios de grabación de todo el mundo.",
            caracteristicas: [
                "Potencia: 22 W RMS en clase A/B",
                "Tecnología: todo válvulas (4x 6V6, 5x 12AX7, 2x 12AT7, 1x GZ34)",
                "Altavoz: 1x 12 pulgadas Jensen C-12K (8 ohmios)",
                "Reverb de muelle de tanque largo (circuito Accutronics)",
                "Vibrato con velocidad e intensidad regulables",
                "Canales: Normal + Vibrato (con entrada de alta y baja impedancia)",
                "Controles: volumen, graves, agudos, reverb, velocidad, intensidad",
                "Dimensiones: 60 x 48 x 24 cm — Peso: 19.5 kg",
            ],
            precio: 10000,
            imagen: "../img/Amplis/fender-65-deluxe-reverb-amplificador.png",
        },
        {
            id: "marshall-1959-plexi",
            nombre: "Marshall 1959 Super Lead Plexi",
            descripcion:
                "El amplificador que inventó el rock clásico. El Marshall Plexi de 100 vatios fue el sonido de Jimi " +
                "Hendrix, Eric Clapton, Pete Townshend y Jimmy Page en la segunda mitad de los 60. Su nombre proviene " +
                "del panel frontal de plexiglás y su sonido sucio, cargado de armónicos, es el blueprint del rock " +
                "clásico y el metal de los 70. Esta reissue reproduce el circuito original al detalle.",
            caracteristicas: [
                "Potencia: 100 W RMS en clase A/B",
                "Tecnología: todo válvulas (4x EL34, 4x 12AX7)",
                "Configuración de cabezal (head) — sin altavoz incluido",
                "Salidas de altavoz: 16, 8 y 4 ohmios (para caja 4x12)",
                "2 canales de alta y baja ganancia con 4 entradas jack",
                "Controles: presencia, graves, medios, agudos, volumen (x2)",
                "Panel frontal de aluminio estilo gold plexi original",
                "Peso: 19 kg",
            ],
            precio: 3500,
            imagen: "../img/Amplis/marshall_plexi_super_lead_1959_gallery_1.png",
        },
        {
            id: "roland-jc-120",
            nombre: "Roland Jazz Chorus JC-120",
            descripcion:
                "Desde 1975, el Roland JC-120 es sinónimo de clean perfecto y chorus cristalino. Amplificador de " +
                "estado sólido, sus 120 W estéreo a través de dos altavoces de 12 pulgadas producen el limpio " +
                "más nítido y presente de la historia. Imprescindible en el new wave, el pop y el jazz, lo usaron " +
                "Andy Summers (The Police), Robert Smith (The Cure) y Jonny Greenwood.",
            caracteristicas: [
                "Potencia: 120 W estéreo (60 W + 60 W) en estado sólido",
                "2 altavoces Jensen JC-120 de 12 pulgadas (8 ohmios cada uno)",
                "Chorus estéreo incorporado (velocidad e intensidad)",
                "Vibrato incorporado con intensidad y velocidad",
                "Reverb de muelle de 3 pistas",
                "2 canales (Normal y Brillante) con 4 entradas",
                "Bucle de efectos estéreo en serie",
                "Dimensiones: 67 x 52 x 26 cm — Peso: 32 kg",
            ],
            precio: 1200,
            imagen: "../img/Amplis/roland-jc-120-jazz-chorus-combo_GIT0000966-000.png",
        },
        {
            id: "vox-ac30",
            nombre: "Vox AC30",
            descripcion:
                "El sonido del British Invasion. El Vox AC30 fue el amplificador de The Beatles, The Rolling Stones " +
                "y The Kinks en los 60, y sigue siendo uno de los combos de válvulas más valorados del mundo. " +
                "Sus 30 W de clase A producen un overdrive natural y brillante al subir el volumen, con un carácter " +
                "tonal inconfundible que ningún pedal ha conseguido replicar del todo.",
            caracteristicas: [
                "Potencia: 30 W RMS en clase A pura",
                "Tecnología: todo válvulas (4x EL84, 3x 12AX7, 1x EZ81)",
                "2 altavoces Celestion Greenback de 12 pulgadas (16 ohmios)",
                "Canal Normal + canal Top Boost con EQ independiente",
                "Reverb de muelle y tremolo incorporados",
                "Salida de altavoz adicional para extensión de caja",
                "Carcasa basket-weave grille cloth original estilo 60s",
                "Dimensiones: 70 x 54 x 27 cm — Peso: 30 kg",
            ],
            precio: 899,
            imagen: "../img/Amplis/VoxAC30.jpg",
        },
    ],

    pedales: [
        {
            id: "big-muff-pi",
            nombre: "Electro-Harmonix Big Muff Pi",
            descripcion:
                "El pedal de distorsión más icónico de la historia. Desde 1969 el Big Muff Pi ha sido el secreto " +
                "detrás del tono sustanado y cremoso de Carlos Santana, David Gilmour, Kurt Cobain y J Mascis. " +
                "Su circuito de cuatro etapas de recorte en silicio produce una distorsión suave, musical y " +
                "con un sustain prácticamente infinito. Un imprescindible absoluto.",
            caracteristicas: [
                "Tipo de efecto: Fuzz / Distorsión sustanada",
                "Controles: Volumen, Tono, Sustain",
                "Circuito: 4 etapas de recorte en diodos de silicio",
                "Alimentación: 9 V DC (centro negativo) o pila 9 V",
                "Consumo: 3.5 mA",
                "Entradas / Salidas: 1x jack TS de 6.3 mm (mono)",
                "True Bypass",
                "Dimensiones: 92 x 51 x 47 mm — Peso: 280 g",
            ],
            precio: 95,
            imagen: "../img/Pedales/BigMuff.png",
        },
        {
            id: "boss-tr2-tremolo",
            nombre: "Boss TR-2 Tremolo",
            descripcion:
                "El TR-2 lleva más de 25 años siendo la referencia en trémolo compacto. Reproduce con fidelidad el " +
                "trémolo clásico de los amplificadores vintage de los 50 y 60. Su circuito analógico crea una " +
                "modulación de amplitud suave y musical que va desde un suave cabeceo a pulsos profundos de tipo " +
                "helicopter. Favorito de Radiohead, Wilco y Sonic Youth.",
            caracteristicas: [
                "Tipo de efecto: Tremolo (modulación de amplitud)",
                "Controles: Wave (forma de onda), Rate (velocidad), Depth (profundidad)",
                "Circuito analógico puro (sin conversión digital)",
                "Alimentación: 9 V DC Boss PSA o pila 9 V",
                "Consumo: 20 mA",
                "Entradas / Salidas: 1x jack TS de 6.3 mm mono",
                "Construcción Boss ABS con interruptor de metal",
                "Dimensiones: 70 x 120 x 55 mm — Peso: 395 g",
            ],
            precio: 115,
            imagen: "../img/Pedales/boss-tr2-tremolo.png",
        },
        {
            id: "ehx-memory-man",
            nombre: "Electro-Harmonix Vintage Deluxe Memory Man",
            descripcion:
                "El delay analógico más buscado por coleccionistas y guitarristas tonales. El Deluxe Memory Man " +
                "combina un delay BBD (Bucket Brigade Device) de cálido sonido analógico con chorus y vibrato " +
                "incorporados. The Edge de U2 construyó todo su sonido alrededor de este pedal en los 80. " +
                "Esta versión vintage recaptura el circuito original con chips NOS.",
            caracteristicas: [
                "Tipo de efecto: Delay analógico BBD + Chorus/Vibrato",
                "Tiempo de delay: hasta 550 ms (analógico)",
                "Controles: Blend, Level, Delay, Feedback, Chorus/Vibrato switch",
                "Chips: MN3005 BBD (circuito original vintage)",
                "Alimentación: 24 V DC (adaptador incluido)",
                "Consumo: 70 mA",
                "Entradas / Salidas: 1x jack TS mono I/O",
                "Dimensiones: 140 x 112 x 55 mm — Peso: 650 g",
            ],
            precio: 900,
            imagen: "../img/Pedales/MemoryMan.png",
        },
        {
            id: "crybaby-wah",
            nombre: "Dunlop CryBaby Wah GCB95",
            descripcion:
                "El pedal wah más vendido de la historia. El CryBaby GCB95 es el estándar absoluto del wah " +
                "desde 1967. Jimi Hendrix, Slash, Kirk Hammett y Eric Clapton han hecho de él una extensión de " +
                "su voz en guitarra. Su circuito inductivo basado en el mítico inductor Fasel produce ese barrido " +
                "vocal inconfundible que ha definido décadas de rock, funk y blues.",
            caracteristicas: [
                "Tipo de efecto: Wah-Wah (filtro de barrido)",
                "Inductor: Fasel rojo (bobina original)",
                "Circuito: analógico inductivo basado en el diseño original de Vox",
                "Alimentación: 9 V DC (centro negativo) o pila 9 V",
                "Consumo: 1 mA",
                "Carcasa de metal fundido a presión (die-cast zinc)",
                "Interruptor de activación por presión de talón",
                "Dimensiones: 107 x 64 x 115 mm — Peso: 520 g",
            ],
            precio: 99,
            imagen: "../img/Pedales/Wahwah.png",
        },
    ],
};

// ── Helpers ───────────────────────────────────────────────────

function formatearPrecio(precio) {
    return precio.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    });
}

function crearCard(p) {
    return '<a class="producto-card" href="Pagina-Producto.html?id=' + p.id + '">' +
               '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy">' +
               '<div class="producto-info">' +
                   '<p class="producto-nombre">' + p.nombre + '</p>' +
                   '<p class="producto-precio">' + formatearPrecio(p.precio) + '</p>' +
               '</div>' +
           '</a>';
}

function renderGrid(gridId, productos) {
    var el = document.getElementById(gridId);
    if (!el) return;
    el.innerHTML = productos.map(crearCard).join("");
}

// ── Punto de entrada ──────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
    renderGrid("grid-guitarras",      catalogo.guitarras);
    renderGrid("grid-amplificadores", catalogo.amplificadores);
    renderGrid("grid-pedales",        catalogo.pedales);
});