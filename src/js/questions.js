/**
 * 🗄️ BANCO DE PREGUNTAS Y CONTEXTOS
 */

const CONTEXTS = {
    'lectura-sagas': {
        title: 'LAS SAGAS ISLANDESAS',
        cards: [
            'En la antigüedad escandinava se llamaba saga a las pequeñas leyendas sobre seres heróicos, mitológicos, etc. Sin embargo, en el siglo XIII apareció en Islandia un género literario al que se aplicó la misma denominación: la saga propiamente dicha.',
            'La palabra islandesa saga quiere decir "lo dicho, lo contado". En general, podríamos traducirla por "narración". Se aplica a historias escritas en Islandia sobre los reyes de Noruega.',
            'Estas historias orales se conservaron a lo largo de varios siglos. Su función era múltiple: entretenimiento, pero también guardaban los recuerdos históricos y la genealogía de las familias.'
        ]
    },
    'lectura-lenguaje': {
        title: 'EL LENGUAJE EN EL COMIENZO DEL MUNDO',
        cards: [
            'El lenguaje hace la diferencia sustancial entre el hombre y el primate. Sin lenguaje no hay pensamiento, y el tejido de relaciones por fuera del lenguaje aún no es social.',
            'Según Claude Lévi-Strauss antes el lenguaje era el reino del canto. Los fines arcaicos del canto animal fueron sobrepasados por los fines del lenguaje simbólico que terminó apoderándose de lo humano.',
            'Gracias al lenguaje simbólico que proyecta sobre lo real el soplo de su propio "sentido", el "mundo" fue posible como mundo y como representación de un "todo" exterior coherente.'
        ]
    }
};

const QUESTIONS = [
    // ══ MATEMÁTICAS ══
    {
        id: 'M1', area: 'Matemáticas', icon: '📐',
        question: 'El movimiento de una partícula P1 se representa con 9x² + y² - 18x - 4y - 2 = 0 y el de P2 con 3x² - 2y² + 12x - 4y - 2 = 0. Es correcto afirmar que:',
        options: {
            A: 'P1 describe una elipse y P2 una parábola.',
            B: 'P1 describe una parábola y P2 una elipse.',
            C: 'P1 describe una elipse y P2 una hipérbola.',
            D: 'P1 describe una hipérbola y P2 una elipse.'
        },
        correct: 'C',
        explanation: {
            context: 'Identificación de cónicas a partir de sus ecuaciones generales.',
            concepts: [
                { name: 'Elipse', def: 'Los coeficientes de x² y y² tienen el mismo signo.', url: 'https://www.google.com/search?q=ecuacion+general+elipse' },
                { name: 'Hipérbola', def: 'Los coeficientes de x² y y² tienen signos opuestos.', url: 'https://www.google.com/search?q=ecuacion+general+hiperbola' }
            ],
            step1: 'Analizamos los coeficientes de las variables al cuadrado en ambas ecuaciones.',
            step2: 'P1 tiene (+9x²) y (+1y²), signos iguales -> Elipse. P2 tiene (+3x²) y (-2y²), signos opuestos -> Hipérbola.',
            step3: 'La opción C identifica correctamente ambas trayectorias.'
        }
    },
    {
        id: 'M2', area: 'Matemáticas', icon: '📐',
        question: 'Dos mil personas se encuestan. El 60% tiene entre 18 y 38 años. ¿Cuántos encuestados corresponden a este rango de edad?',
        options: {
            A: '2.000', B: '1.200', C: '1.000', D: '600'
        },
        correct: 'B',
        explanation: {
            context: 'Cálculo de porcentajes en una población.',
            concepts: [
                { name: 'Porcentaje', def: 'Fracción de 100.', url: 'https://www.google.com/search?q=como+calcular+porcentajes' }
            ],
            step1: 'Se pide hallar el 60% de una población total de 2000 personas.',
            step2: 'Operación: 2000 * 0.60 = 1200.',
            step3: '1200 es exactamente el 60% de 2000.'
        }
    },
    {
        id: 'M3', area: 'Matemáticas', icon: '📐',
        question: 'En un curso de 75 estudiantes, 45 son mujeres. La probabilidad 3/5 de escoger una mujer corresponde a la razón entre el número de mujeres y:',
        options: {
            A: 'El número total de estudiantes.',
            B: 'El número total de hombres.',
            C: 'El número de mujeres de un solo salón.',
            D: 'El número de hombres del curso A.'
        },
        correct: 'A',
        explanation: {
            context: 'Probabilidad simple como razón.',
            concepts: [
                { name: 'Probabilidad', def: 'Casos favorables entre casos totales.', url: 'https://www.google.com/search?q=probabilidad+simple+definicion' }
            ],
            step1: 'Identificamos que 45/75 simplificado es 3/5.',
            step2: 'El denominador 75 representa al grupo completo.',
            step3: 'Por tanto, es la razón entre mujeres y el total de estudiantes.'
        }
    },
    {
        id: 'M4', area: 'Matemáticas', icon: '📐',
        question: 'La masa de una sustancia decae según M(t) = 1000(0,9)^t. ¿Qué sucede con la masa cuando t toma valores muy grandes?',
        options: {
            A: 'Es cero cuando t = 1.000.',
            B: 'Se acerca a 1.000 gramos.',
            C: 'Se acerca a cero (0) gramos.',
            D: 'Es constante a partir de t=1.000.'
        },
        correct: 'C',
        explanation: {
            context: 'Límites y funciones exponenciales decaimiento.',
            concepts: [
                { name: 'Función Exponencial', def: 'Función donde la variable t es un exponente.', url: 'https://www.google.com/search?q=funcion+exponencial+decaimiento' }
            ],
            step1: 'La base (0.9) es menor a 1, lo que indica un decaimiento.',
            step2: 'A medida que t crece, (0.9)^t tiende a cero.',
            step3: 'La masa se aproxima a cero pero nunca llega a serlo exactamente en tiempo finito.'
        }
    },
    {
        id: 'M5', area: 'Matemáticas', icon: '📐',
        question: 'Un estudiante afirma que "todo número impar al cuadrado es divisible por dos". ¿Por qué es falsa?',
        options: {
            A: 'Porque el resultado es impar todas las veces.',
            B: 'Porque es impar la mitad de las veces.',
            C: 'Porque solo es impar si n es distinto de 0.',
            D: 'Porque solo es impar cuando n es 0.'
        },
        correct: 'A',
        explanation: {
            context: 'Propiedades de números pares e impares.',
            concepts: [
                { name: 'Impar al cuadrado', def: 'El producto de dos impares siempre es impar.', url: 'https://www.google.com/search?q=producto+de+numeros+impares' }
            ],
            step1: 'Un número impar se representa como 2n+1.',
            step2: '(2n+1)² = 4n² + 4n + 1 = 2(2n² + 2n) + 1.',
            step3: 'La forma 2(K) + 1 siempre es un número impar, por lo tanto nunca es divisible por 2.'
        }
    },

    // ══ CIENCIAS NATURALES ══
    {
        id: 'N1', area: 'Ciencias Naturales', icon: '🔬',
        question: 'Suponiendo que la energía elástica inicial de un resorte es igual a la energía potencial final de una bola, ¿qué herramienta mediría la energía potencial final (dependiente de la altura)?',
        options: {
            A: 'Una regla.', B: 'Una balanza.', C: 'Un cronómetro.', D: 'Un termómetro.'
        },
        correct: 'A',
        explanation: {
            context: 'Energía Potencial Gravitatoria (mgh).',
            concepts: [
                { name: 'Energía Potencial', def: 'Energía almacenada debido a la posición/altura.', url: 'https://www.google.com/search?q=energia+potencial+formula' }
            ],
            step1: 'La energía potencial depende directamente de la altura (h).',
            step2: 'Para hallar la energía, necesitamos conocer h.',
            step3: 'La regla es el instrumento adecuado para medir longitudes o alturas.'
        }
    },
    {
        id: 'N2', area: 'Ciencias Naturales', icon: '🔬',
        question: 'De la investigación sobre la energía cinética (EC) y potencial (EP) de un acróbata en caída, se concluye que:',
        options: {
            A: 'La energía potencial es siempre mayor.',
            B: 'La suma de EP y EC cambia en cada punto.',
            C: 'La suma de EP y EC es constante en cada punto.',
            D: 'La energía cinética es siempre mayor.'
        },
        correct: 'C',
        explanation: {
            context: 'Conservación de la Energía Mecánica.',
            concepts: [
                { name: 'Energía Mecánica', def: 'Suma de energía cinética y potencial.', url: 'https://www.google.com/search?q=ley+conservacion+energia+mecanica' }
            ],
            step1: 'En ausencia de fricción, la energía no se crea ni destruye, solo se transforma.',
            step2: 'Mientras la EP disminuye al caer, la EC aumenta proporcionalmente.',
            step3: 'La suma total (Energía Mecánica) permanece constante.'
        }
    },
    {
        id: 'N3', area: 'Ciencias Naturales', icon: '🔬',
        question: 'Se calientan 4 varillas de metales distintos. Varilla 1: 29x10⁻⁶, Varilla 2: 17x10⁻⁷, Varilla 3: 17x10⁻⁶, Varilla 4: 11x10⁻⁶. ¿Cuál se expande más?',
        options: {
            A: '4, por menor coeficiente.',
            B: '3, por mayor coeficiente.',
            C: '2, por menor coeficiente.',
            D: '1, por mayor coeficiente.'
        },
        correct: 'D',
        explanation: {
            context: 'Expansión Térmica Lineal.',
            concepts: [
                { name: 'Coeficiente de Expansión', def: 'Grado en que un material se expande por grado de temp.', url: 'https://www.google.com/search?q=coeficiente+expansion+lineal+metales' }
            ],
            step1: 'La expansión es directamente proporcional al coeficiente.',
            step2: 'Comparamos los valores: 29x10⁻⁶ es mayor que 17x10⁻⁶, 11x10⁻⁶ y 17x10⁻⁷.',
            step3: 'La varilla 1 tiene el coeficiente más alto, por lo tanto se expande más.'
        }
    },
    {
        id: 'N4', area: 'Ciencias Naturales', icon: '🔬',
        question: 'Dos globos se frotan contra un saco y se cuelgan de un hilo. El estudiante observa que al soltarlos:',
        options: {
            A: 'Se juntan por carga diferente.',
            B: 'Se juntan por igual signo.',
            C: 'Se separen por carga diferente.',
            D: 'Se separen porque quedaron con carga de igual signo.'
        },
        correct: 'D',
        explanation: {
            context: 'Electrostática y ley de cargas.',
            concepts: [
                { name: 'Carga Eléctrica', def: 'Propiedad física que causa fuerzas de atracción/repulsión.', url: 'https://www.google.com/search?q=ley+de+cargas+electricas' }
            ],
            step1: 'Ambos globos se frotan con el mismo material (el saco).',
            step2: 'Por lo tanto, ambos adquieren el mismo tipo de carga (positiva o negativa).',
            step3: 'Cargas del mismo signo se repelen, por lo que los globos se separan.'
        }
    },
    {
        id: 'N5', area: 'Ciencias Naturales', icon: '🔬',
        question: 'Se conecta una resistencia eléctrica en un recipiente con gas y este se calienta. ¿Por qué ocurre esto?',
        options: {
            A: 'El gas entrega energía a la resistencia.',
            B: 'La resistencia entrega energía térmica al gas.',
            C: 'Pasa corriente eléctrica por el gas.',
            D: 'Aparece resistencia térmica en el circuito.'
        },
        correct: 'B',
        explanation: {
            context: 'Efecto Joule y transferencia de calor.',
            concepts: [
                { name: 'Efecto Joule', def: 'Desprendimiento de calor al pasar corriente por un conductor.', url: 'https://www.google.com/search?q=efecto+joule+explicacion' }
            ],
            step1: 'La corriente pasa por la resistencia, calentándola.',
            step2: 'La resistencia caliente transfiere calor al gas circundante.',
            step3: 'Es una transferencia de energía térmica de la fuente (resistencia) al receptor (gas).'
        }
    },

    // ══ SOCIALES Y CIUDADANAS ══
    {
        id: 'S1', area: 'Sociales y Ciudadanas', icon: '🏛️',
        question: 'Países desarrollados compiten con innovación, mientras los "subdesarrollados" venden materias primas. Esto pasa porque estos últimos:',
        options: {
            A: 'Realizan poca inversión en investigación tecnológica.',
            B: 'Tienen poca iniciativa para exportar minerales.',
            C: 'No saben cómo vender en el mercado internacional.',
            D: 'Decidieron marginarse de los avances mundiales.'
        },
        correct: 'A',
        explanation: {
            context: 'Globalización y brecha tecnológica.',
            concepts: [
                { name: 'I+D', def: 'Inversión en Investigación y Desarrollo.', url: 'https://www.google.com/search?q=importancia+de+inversion+en+tecnologia+paises' }
            ],
            step1: 'La capacidad de innovar depende de la inversión estatal y privada en ciencia.',
            step2: 'Los países que solo exportan materias primas suelen tener baja inversión en tecnología.',
            step3: 'Esto perpetúa la dependencia económica de mercados externos.'
        }
    },
    {
        id: 'S2', area: 'Sociales y Ciudadanas', icon: '🏛️',
        question: 'El taylorismo y fordismo buscaban reducir costos. ¿Cuál de estos NO cumple sus criterios?',
        options: {
            A: 'Aumento de destreza mediante enseñanza técnica.',
            B: 'Mayor control del tiempo para productividad.',
            C: 'Distribución equitativa de ganancias entre industriales y obreros.',
            D: 'Estudio científico del proceso productivo.'
        },
        correct: 'C',
        explanation: {
            context: 'Sistemas de producción industrial.',
            concepts: [
                { name: 'Fordismo', def: 'Producción en cadena y estandarización.', url: 'https://www.google.com/search?q=caracteristicas+taylorismo+fordismo' }
            ],
            step1: 'Estos sistemas priorizaban la eficiencia y el lucro del capitalista.',
            step2: 'Aunque aumentaron salarios, la distribución NO era equitativa (igualitaria).',
            step3: 'La opción C es un principio ajeno a las metas originales de Taylor y Ford.'
        }
    },
    {
        id: 'S3', area: 'Sociales y Ciudadanas', icon: '🏛️',
        question: 'La sustitución de importaciones busca favorecer la producción interna. Además de aranceles, ¿cómo puede lograrse?',
        options: {
            A: 'Liberando importaciones sin barreras.',
            B: 'Aumentando exportaciones agrícolas.',
            C: 'Disminución de costos y mejora de productos nacionales.',
            D: 'Otorgando subsidios a importadores externos.'
        },
        correct: 'C',
        explanation: {
            context: 'Modelo Industrialización por Sustitución de Importaciones (ISI).',
            concepts: [
                { name: 'ISI', def: 'Modelo que busca producir internamente lo que se importaba.', url: 'https://www.google.com/search?q=modelo+sustitucion+importaciones+latinoamerica' }
            ],
            step1: 'Para no comprar afuera, los productos locales deben ser competitivos.',
            step2: 'Bajar costos y subir calidad hace que el consumidor prefiera lo nacional.',
            step3: 'Esto fortalece la industria interna de forma orgánica.'
        }
    },
    {
        id: 'S4', area: 'Sociales y Ciudadanas', icon: '🏛️',
        question: 'La Época Medieval tenía economía agrícola. El Estado moderno, con monarquías absolutas, se caracterizó por:',
        options: {
            A: 'Poder dividido entre iglesia y gobernantes.',
            B: 'Organización en feudos y burgos.',
            C: 'Poder político y militar centralizado y territorio delimitado.',
            D: 'Organización regida por la ley natural divina.'
        },
        correct: 'C',
        explanation: {
            context: 'Evolución del Estado Moderno.',
            concepts: [
                { name: 'Estado Moderno', def: 'Surgimiento de fronteras y poder central soberano.', url: 'https://www.google.com/search?q=caracteristicas+del+estado+moderno' }
            ],
            step1: 'El Estado moderno quita poder a los señores feudales.',
            step2: 'El Rey concentra el ejército y la administración en un territorio claro.',
            step3: 'Esta centralización es la base de las naciones actuales.'
        }
    },
    {
        id: 'S5', area: 'Sociales y Ciudadanas', icon: '🏛️',
        question: 'Personas de ingresos medios abandonan el centro urbano hacia zonas periféricas. La principal causa es:',
        options: {
            A: 'Desarrollo de industria en el centro.',
            B: 'Búsqueda de mejor calidad de vida en barrios tranquilos.',
            C: 'Escasa oferta de servicios en el centro.',
            D: 'Oferta de vivienda barata en las afueras.'
        },
        correct: 'B',
        explanation: {
            context: 'Urbanismo y dinámicas de población.',
            concepts: [
                { name: 'Suburbanización', def: 'Crecimiento de las áreas periféricas de las ciudades.', url: 'https://www.google.com/search?q=causas+de+la+suburbanizacion' }
            ],
            step1: 'El centro suele ser ruidoso, contaminado o congestionado.',
            step2: 'Las familias con recursos buscan aire puro, menos tráfico y seguridad.',
            step3: 'Por ello se mudan a las afueras para ganar "calidad de vida".'
        }
    },

    // ══ LECTURA CRÍTICA ══
    {
        id: 'L1', area: 'Lectura Crítica', icon: '📖', contextId: 'lectura-sagas',
        question: 'Cuando se dice que la palabra islandesa saga quiere decir "lo dicho, lo contado", esto último permite:',
        options: {
            A: 'Definir qué es una saga.',
            B: 'Sugerir la naturaleza del género.',
            C: 'Caracterizar un tipo especial de relato.',
            D: 'Diferenciar las sagas islandesas de las leyendas.'
        },
        correct: 'A',
        explanation: {
            context: 'Comprensión textual y definiciones.',
            concepts: [
                { name: 'Etimología', def: 'Origen y significado de las palabras.', url: 'https://www.google.com/search?q=que+es+etimologia' }
            ],
            step1: 'El texto usa el significado de la palabra para explicar su esencia.',
            step2: 'Al decir qué significa, está estableciendo una definición.',
            step3: 'La opción A es la más directa: permite definir el concepto.'
        }
    },
    {
        id: 'L2', area: 'Lectura Crítica', icon: '📖', contextId: 'lectura-sagas',
        question: 'Se afirma que las sagas tienen rasgos estilísticos propios del lenguaje hablado. Esto indica que:',
        options: {
            A: 'Los escandinavos no las escribieron nunca.',
            B: 'El lenguaje hablado no tiene rigurosidad.',
            C: 'El desarrollo escritural fue incipiente.',
            D: 'El origen de estos relatos se funda en la tradición oral.'
        },
        correct: 'D',
        explanation: {
            context: 'Análisis de estilos literarios.',
            concepts: [
                { name: 'Tradición Oral', def: 'Historias pasadas de voz en voz antes de escribirse.', url: 'https://www.google.com/search?q=tradicion+oral+caracteristicas' }
            ],
            step1: 'Si un texto escrito suena como "hablado", es porque nació así.',
            step2: 'Las sagas se contaban por siglos antes de llegar al papel.',
            step3: 'Esa raíz oral deja huellas en el estilo de escritura.'
        }
    },
    {
        id: 'L3', area: 'Lectura Crítica', icon: '📖', contextId: 'lectura-sagas',
        question: '¿Por qué se puede afirmar que el texto sobre las sagas es explicativo?',
        options: {
            A: 'Expresa opiniones.', B: 'Demuestra ideas.', C: 'Aclara un fenómeno.', D: 'Expone un pensamiento.'
        },
        correct: 'C',
        explanation: {
            context: 'Tipología textual.',
            concepts: [
                { name: 'Texto Explicativo', def: 'Su objetivo es informar y hacer entender algo.', url: 'https://www.google.com/search?q=caracteristicas+texto+explicativo' }
            ],
            step1: 'El texto no intenta convencernos (argumentativo) ni contarnos un cuento (narrativo).',
            step2: 'Nos da datos, fechas y definiciones sobre las sagas.',
            step3: 'Su fin principal es que comprendamos qué son las sagas islandesas.'
        }
    },
    {
        id: 'L4', area: 'Lectura Crítica', icon: '📖', contextId: 'lectura-lenguaje',
        question: 'Según el texto sobre el lenguaje, ¿cuál es la organización de los párrafos?',
        options: {
            A: '1: Afirmación/Introd, 2: Explicación (autoridad), 3: Reflexión.',
            B: '1: Introducción/Expl, 2: Hecho histórico, 3: Conclusión.',
            C: '1: Explicación/Introd, 2: Hecho histórico, 3: Explicación.',
            D: '1: Introd/Planteamiento, 2: Explicación (autoridad), 3: Conclusión.'
        },
        correct: 'A',
        explanation: {
            context: 'Estructura lógica de un texto.',
            concepts: [
                { name: 'Argumento de Autoridad', def: 'Uso de un experto para validar una idea.', url: 'https://www.google.com/search?q=argumento+de+autoridad+ejemplo' }
            ],
            step1: 'Párrafo 1 afirma que el lenguaje diferencia al hombre.',
            step2: 'Párrafo 2 cita a Lévi-Strauss (autoridad) para explicar el canto.',
            step3: 'Párrafo 3 reflexiona sobre cómo el lenguaje crea el "mundo".'
        }
    },
    {
        id: 'L5', area: 'Lectura Crítica', icon: '📖', contextId: 'lectura-lenguaje',
        question: 'En el tercer párrafo del texto se habla específicamente de:',
        options: {
            A: 'El hombre y el primate.',
            B: 'La significación y del sentido.',
            C: 'El trabajo y del hombre.',
            D: 'La realidad y del azar.'
        },
        correct: 'B',
        explanation: {
            context: 'Extracción de ideas principales.',
            concepts: [
                { name: 'Simbólico', def: 'Que representa a una cosa con otra.', url: 'https://www.google.com/search?q=lenguaje+simbolico+filosofia' }
            ],
            step1: 'El párrafo dice que el lenguaje da "sentido" a lo real.',
            step2: 'Menciona que el mundo es posible como representación con sentido.',
            step3: 'Por tanto, el foco es cómo asignamos significado a las cosas.'
        }
    },

    // ══ INGLÉS ══
    {
        id: 'I1', area: 'Inglés', icon: '🌎',
        question: 'People drive it on a road and it carries big things.',
        options: {
            A: 'Truck', B: 'Bike', C: 'Bus', D: 'Helicopter'
        },
        correct: 'A',
        explanation: {
            context: 'Vocabulary: Means of transport.',
            concepts: [
                { name: 'Truck', def: 'A large, heavy motor vehicle for transporting goods.', url: 'https://www.google.com/search?q=truck+definition+english' }
            ],
            step1: 'Key words: "drive", "road", "carries big things".',
            step2: 'A bus carries people, a bike carries one person, a helicopter flies.',
            step3: 'A truck fits all descriptions perfectly.'
        }
    },
    {
        id: 'I2', area: 'Inglés', icon: '🌎',
        question: 'This is only for one or two people to go by road.',
        options: {
            A: 'Plane', B: 'Boat', C: 'Motorbike', D: 'Train'
        },
        correct: 'C',
        explanation: {
            context: 'Vocabulary: Means of transport.',
            concepts: [
                { name: 'Motorbike', def: 'A two-wheeled vehicle that is powered by a motor.', url: 'https://www.google.com/search?q=motorbike+definition+english' }
            ],
            step1: 'Key words: "one or two people", "by road".',
            step2: 'Plane flies, Boat is on water, Train is on rails.',
            step3: 'Motorbike is for small groups on roads.'
        }
    },
    {
        id: 'I3', area: 'Inglés', icon: '🌎',
        question: 'Many people fly on it to go to a place.',
        options: {
            A: 'Bus', B: 'Plane', C: 'Truck', D: 'Train'
        },
        correct: 'B',
        explanation: {
            context: 'Vocabulary: Flight.',
            concepts: [
                { name: 'Plane', def: 'A powered flying vehicle with fixed wings.', url: 'https://www.google.com/search?q=airplane+definition+english' }
            ],
            step1: 'Key word: "fly".',
            step2: 'Only one option refers to air travel.',
            step3: 'A plane is the correct means to fly.'
        }
    },
    {
        id: 'I4', area: 'Inglés', icon: '🌎',
        question: 'It is long, with many parts and it carries people or things on rails.',
        options: {
            A: 'Train', B: 'Boat', C: 'Helicopter', D: 'Bus'
        },
        correct: 'A',
        explanation: {
            context: 'Vocabulary: Public transport.',
            concepts: [
                { name: 'Train', def: 'A series of connected railway carriages or wagons moved by a locomotive.', url: 'https://www.google.com/search?q=train+definition+english' }
            ],
            step1: 'Key words: "long", "many parts", "rails".',
            step2: 'Boats are on water, helicopters fly, buses aren\'t usually on rails.',
            step3: 'The train is the one that uses rails.'
        }
    },
    {
        id: 'I5', area: 'Inglés', icon: '🌎',
        question: 'It is small and you can sail on it.',
        options: {
            A: 'Truck', B: 'Boat', C: 'Bus', D: 'Plane'
        },
        correct: 'B',
        explanation: {
            context: 'Vocabulary: Water transport.',
            concepts: [
                { name: 'Boat', def: 'A small vessel for travelling over water.', url: 'https://www.google.com/search?q=boat+definition+english' }
            ],
            step1: 'Key words: "small", "sail".',
            step2: "Sailing requires water.",
            step3: 'A boat is designed for sailing.'
        }
    }
];
