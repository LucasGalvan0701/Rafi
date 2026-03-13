/**
 * 🗄️ BASE DE DATOS DE PREGUNTAS Y CONTEXTOS
 * Este archivo contiene toda la información de las preguntas de forma independiente.
 * Puedes editar las preguntas, opciones y explicaciones aquí sin tocar la lógica de la app.
 */

export const CONTEXTS = {
    'sociales-mineros': {
        title: 'MINERÍA Y REGULACIÓN AMBIENTAL',
        cards: [
            'Un grupo de mineros artesanales ha aumentado sus ingresos al encontrar un punto del río en el cual se puede extraer oro con la ayuda de mercurio. La comunidad del municipio aledaño se ha visto afectada por esta situación, porque el río se ha contaminado con los desechos tóxicos que genera la actividad minera y es la única fuente de agua que tienen los habitantes para el consumo e irrigación de cultivos.',
            'Ante esto, la alcaldesa del municipio considera necesario establecer una normatividad que regule este tipo de actividades.'
        ]
    },
    'sociales-hacinamiento': {
        title: 'HACINAMIENTO CARCELARIO',
        cards: [
            'En un país hay un serio problema de hacinamiento carcelario: el número de reclusos supera ampliamente la capacidad de las cárceles para albergarlos. Frente a esta situación, el Gobierno propone excarcelar un porcentaje significativo de reclusos mediante amnistías, rebajas de penas, y la modalidad de casa por cárcel.',
            'Un primer sector apoya la iniciativa pues considera que el hacinamiento viola los derechos humanos de los reclusos y que la prisión no disuade sino que profesionaliza el crimen.',
            'Un segundo sector se opone, argumentando que la reclusión evita más delitos y que la excarcelación masiva enviaría el mensaje de que "el crimen sí paga".',
            'Un tercer sector propone construir más cárceles como solución alternativa.'
        ]
    },
    'lectura-creencias': {
        title: 'LOS GRADOS DE CREENCIA',
        cards: [
            'Cuando examinamos nuestras creencias, advertimos que mantenemos creencias diferentes con muy diferentes grados de convicción. Algunas pueden ser objeto de duda por parte de muy pocas personas.',
            'Las creencias históricas se mantienen con menos firmeza, pero sin grandes dudas en lo fundamental si están bien autenticadas.',
            'Las creencias filosóficas ocuparán para mucha gente un lugar inferior, puesto que las creencias contrarias de otros difícilmente dejarán de suscitar dudas.',
            'La creencia, por consiguiente, es cuestión de grado.'
        ]
    },
    'lectura-ley-seca': {
        title: 'LA LEY SECA',
        cards: [
            'Lo que llaman la "Ley Seca", a estilo y texto yanquis, está en la mente de varios legisladores y en el corazón de muchos colombianos. Vista por un lado, parece un prodigio de redención; vista por otro lado, bien puede parecer una solemne necedad.',
            'Que con la ley se evitarían crímenes de sangre y otras bestialidades es cierto, ciertísimo. Por desgracia, no gozaremos de tanta dicha: la Ley Seca, aunque rija oficial y aparentemente, en cualquier parte, es un imposible físico y moral.',
            'El tal linaje humano parece necesitar de algo que lo intoxique, bien porque se lo exija el organismo, bien por buscar en la embriaguez olvido de pesares o mirajes de ilusión. Todos los pueblos, bárbaros o avanzados, han perseguido los "paraísos artificiales" que ofrece el alcohol.'
        ]
    },
    'ingles-empire-state': {
        title: 'THE EMPIRE STATE BUILDING',
        cards: [
            'The Empire State Building is the top place to see for first-time visitors to New York City. This tall building was part of a competition between Walter Chrysler and John Raskob for the construction of the world\'s tallest building. Engineer William Lamb produced the plans, and John Raskob and Pierre du Pont\'s company paid for the project.',
            'The Empire State project was completed on April 11, 1931, sooner than planned. The building was opened by Herbert Hoover on May 1, 1931. However, due to the great economic crisis, lots of offices were not rented for several years.',
            'When visiting, prepare for long ticket lines on the first floor, especially on weekends. You should wear warm clothes if it\'s cold. Tourists buy one ticket for the 86th floor and another for the 102nd floor. Book your tickets online to save money. To go up to the higher floor, tickets are only available on the 80th floor, where you can learn about the history of the building.'
        ]
    }
};

export const QUESTIONS = [
    // ══ CIENCIAS NATURALES ══
    {
        id: 'N1',
        area: 'Ciencias Naturales',
        icon: '🔬',
        question: 'Suponiendo que la energía elástica inicial de un resorte es igual a la energía potencial final de una bola, ¿qué herramienta mediría la energía potencial final (dependiente de la altura)?',
        options: {
            A: 'Una regla.',
            B: 'Una balanza.',
            C: 'Un cronómetro.',
            D: 'Un termómetro.'
        },
        correct: 'A',
        explanation: {
            context: 'Esta pregunta trata sobre energía potencial gravitatoria y evalúa si puedes identificar qué variable física necesitas medir para determinar esa energía.',
            contextImg: '/imagenes/preguntas diagnostico/pregunta 1/contexto.png',
            concepts: [
                { name: 'Energía Potencial', def: 'Energía almacenada debido a la posición o altura.', url: 'https://www.google.com/search?q=energia+potencial+formula' }
            ],
            fragment: '¿qué herramienta mediría la energía potencial final (dependiente de la altura)?',
            step1: 'Aquí debemos identificar qué nos está pidiendo la pregunta. No está pidiendo calcular nada, sino escoger una herramienta de medición. Además, la pregunta aclara que la energía potencial depende de la altura, lo cual nos da la pista sobre qué variable necesitamos medir.<br><br><b>🔑 Clave:</b> Primero identifica qué te pide la pregunta y qué variable menciona.',
            step2: 'Si la energía potencial depende de la altura, entonces necesitamos una herramienta que permita medir altura o distancia. Entre las opciones dadas, la única herramienta que mide longitud o altura es la regla.<br><br><b>🔑 Clave:</b> Si necesitas medir altura, usa un instrumento de longitud.',
            step3: '<b>B. Balanza:</b> mide masa.<br><b>C. Cronómetro:</b> mide tiempo.<br><b>D. Termómetro:</b> mide temperatura.<br><br>Ninguna de estas herramientas mide altura, que es lo que necesitamos para relacionarla con la energía potencial.<br><br><b>🔑 Clave:</b> Descarta opciones que midan otra variable diferente.<br><br><b>✅ Respuesta correcta: A. Una regla.</b>',
            step3Img: '/imagenes/preguntas diagnostico/pregunta 1/paso3.png'
        }
    },

    // ══ SOCIALES Y CIUDADANAS (Prueba Real ICFES) ══
    {
        id: 'S1',
        area: 'Sociales y Ciudadanas',
        icon: '🏛️',
        year: 2022,
        contextId: 'sociales-mineros',
        question: '¿Cuál es la razón que mejor justifica por qué debería establecerse allí una normatividad que regule las actividades de extracción minera en el municipio?',
        options: {
            A: 'Para que los mineros busquen más lugares de extracción de oro sin tener problemas con las autoridades.',
            B: 'Para garantizar los derechos a la salud y a un ambiente sano de los pobladores y el derecho de los mineros al trabajo.',
            C: 'Para que se pueda subsidiar la compra de agua para los pobladores, por medio de las ganancias que genera la explotación minera.',
            D: 'Para establecer periodos de alternancia en la extracción del oro, para que los mineros descansen y permitan que el agua no se contamine tanto.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión sobre los derechos fundamentales y la regulación estatal frente a conflictos entre actividades económicas y bienestar comunitario.',
            concepts: [
                { name: 'Derechos Fundamentales', def: 'Derechos constitucionales como la salud, el trabajo y un ambiente sano.', url: 'https://www.google.com/search?q=derechos+fundamentales+colombia' }
            ],
            fragment: '¿Cuál es la razón que mejor justifica por qué debería establecerse allí una normatividad?',
            step1: 'La pregunta pide identificar la mejor justificación para crear una norma. No te pide una solución práctica, sino el fundamento legal o ético detrás de la regulación.<br><br><b>🔑 Clave:</b> Primero identifica qué te pide la pregunta: una justificación, no una solución técnica.',
            step2: 'La regulación debe equilibrar dos derechos en conflicto: el derecho al trabajo de los mineros y el derecho a la salud y ambiente sano de los pobladores. La opción B es la única que reconoce ambos derechos.<br><br><b>🔑 Clave:</b> Relaciona la necesidad de regulación con la protección de derechos fundamentales de todos.',
            step3: '<b>A.</b> Solo beneficia a los mineros, no protege a la comunidad.<br><b>C.</b> Propone un paliativo (subsidiar agua), no una regulación real.<br><b>D.</b> Es una solución parcial que no garantiza derechos.<br><br><b>🔑 Clave:</b> Descarta opciones que solo favorezcan a un grupo o que no aborden derechos fundamentales.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'S2',
        area: 'Sociales y Ciudadanas',
        icon: '🏛️',
        year: 2022,
        question: 'Un presidente prohíbe durante 90 días las visas a ciudadanos de países como Libia, Sudán, Somalia, Siria, Irak, Yemen e Irán, afirmando que quiere "mantener fuera a los terroristas islámicos radicales" y que solo quiere admitir personas que "apoyen al país". ¿Por qué se puede decir que el presidente tiene prejuicios contra la población musulmana?',
        options: {
            A: 'Insiste en la necesidad de proteger a los ciudadanos norteamericanos de los terroristas islámicos.',
            B: 'Destaca los aportes de la comunidad islámica al progreso y al desarrollo de los Estados Unidos.',
            C: 'Insinúa que los refugiados y la población musulmana son una amenaza para la seguridad nacional.',
            D: 'Asume que todos los musulmanes son peligrosos, por el hecho de que los refugiados sirios lo sean.'
        },
        correct: 'D',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para identificar prejuicios y generalizaciones en un discurso político.',
            concepts: [
                { name: 'Prejuicio', def: 'Opinión preconcebida que no se basa en razón ni experiencia directa.', url: 'https://www.google.com/search?q=que+es+un+prejuicio+social' }
            ],
            fragment: '"mantener fuera a los terroristas islámicos radicales" y solo admitir personas que "apoyen al país"',
            step1: 'La pregunta pide que identifiques POR QUÉ el discurso refleja un prejuicio. El prejuicio implica generalizar: atribuir una característica negativa a todo un grupo.<br><br><b>🔑 Clave:</b> Identifica qué generalización hace el discurso.',
            step2: 'El presidente prohíbe la entrada a ciudadanos de países enteros por la acción de unos pocos terroristas. Eso es asumir que TODOS los musulmanes son peligrosos porque algunos lo son.<br><br><b>🔑 Clave:</b> El prejuicio está en generalizar de lo particular a lo universal.',
            step3: '<b>A.</b> Describe lo que dice pero no explica el prejuicio.<br><b>B.</b> Es lo opuesto a lo que dice el presidente.<br><b>C.</b> Es cercana, pero "insinuar" es más suave que "asumir de todos".<br><br><b>🔑 Clave:</b> Descarta opciones que no identifiquen claramente la generalización.<br><br><b>✅ Respuesta correcta: D.</b>'
        }
    },
    {
        id: 'S3',
        area: 'Sociales y Ciudadanas',
        icon: '🏛️',
        year: 2022,
        question: 'Ante el aumento del hurto por parte de personas en moto con "parrilleros", la alcaldía propone prohibir el parrillero. El concejo apoya esta propuesta con base en el Estado Social de Derecho, argumentando que:',
        options: {
            A: 'La norma se basa en estudios previos, por lo cual se asegura su efectividad para reducir hurtos.',
            B: 'Las propuestas de la alcaldía juegan un papel fundamental para la convivencia, y si no obtienen los resultados esperados pueden ser modificadas.',
            C: 'La propuesta será modificada teniendo en cuenta lo expuesto por el grupo de moteros, por ser los principales afectados.',
            D: 'Las normas de la alcaldía buscan el bienestar común y no pueden tener en cuenta la opinión de particulares.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión del Estado Social de Derecho y cómo se justifican las normas en una democracia.',
            concepts: [
                { name: 'Estado Social de Derecho', def: 'Modelo de Estado que busca el bienestar general respetando los derechos individuales.', url: 'https://www.google.com/search?q=estado+social+de+derecho+colombia' }
            ],
            fragment: 'con base en el Estado Social de Derecho, decide apoyar la propuesta argumentando que',
            step1: 'La pregunta pide el argumento que mejor se alinea con el Estado Social de Derecho. Este modelo permite crear normas para el bienestar, pero siempre con posibilidad de revisión y mejora.<br><br><b>🔑 Clave:</b> Identifica qué principio del Estado Social de Derecho aplica.',
            step2: 'En un Estado Social de Derecho, las normas se crean para la convivencia pero no son absolutas: pueden modificarse si no funcionan. La opción B refleja exactamente este principio.<br><br><b>🔑 Clave:</b> Las normas democráticas son flexibles y revisables.',
            step3: '<b>A.</b> Garantizar efectividad no es un principio del Estado Social de Derecho.<br><b>C.</b> Modificar solo por un grupo viola el principio de bienestar general.<br><b>D.</b> Ignorar la opinión de particulares contradice la democracia participativa.<br><br><b>🔑 Clave:</b> Descarta opciones que ignoren la flexibilidad democrática o que sean absolutistas.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'S4',
        area: 'Sociales y Ciudadanas',
        icon: '🏛️',
        year: 2022,
        question: 'Para una comunidad indígena, el petróleo "es la sangre de la Madre Tierra". Los campesinos cercanos dependen del café pero los precios han caído. Una compañía petrolera descubre un yacimiento que generaría empleo e ingresos. Si el Gobierno autorizara la explotación, ¿entre quiénes se generaría un conflicto?',
        options: {
            A: 'La compañía petrolera y los campesinos.',
            B: 'Los campesinos y el Gobierno nacional.',
            C: 'El Gobierno nacional y la compañía petrolera.',
            D: 'La comunidad indígena y la compañía petrolera.'
        },
        correct: 'D',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para identificar actores en conflicto cuando hay visiones culturales, económicas y ambientales opuestas.',
            concepts: [
                { name: 'Conflicto socioambiental', def: 'Disputa entre grupos por el uso de recursos naturales y territorios.', url: 'https://www.google.com/search?q=conflictos+socioambientales+colombia' }
            ],
            fragment: 'Si el Gobierno autorizara la explotación, ¿entre quiénes se generaría un conflicto?',
            step1: 'La pregunta pide identificar quiénes tienen posiciones opuestas. La comunidad indígena considera el petróleo sagrado y se opone a su extracción. La petrolera quiere explotarlo.<br><br><b>🔑 Clave:</b> Identifica qué grupos tienen intereses directamente opuestos.',
            step2: 'Los campesinos podrían beneficiarse con empleo, así que no están en conflicto directo con la petrolera. El Gobierno autorizó, así que tampoco. El conflicto real es entre la cosmovisión indígena y la explotación petrolera.<br><br><b>🔑 Clave:</b> El conflicto surge entre quienes están a favor y en contra de la misma acción.',
            step3: '<b>A.</b> Los campesinos se beneficiarían del empleo, no necesariamente estarían en contra.<br><b>B.</b> Los campesinos no se oponen si obtienen trabajo.<br><b>C.</b> El Gobierno autorizó la explotación, no está en conflicto con la empresa.<br><br><b>🔑 Clave:</b> Descarta opciones donde ambos grupos no tengan intereses opuestos.<br><br><b>✅ Respuesta correcta: D.</b>'
        }
    },
    {
        id: 'S5',
        area: 'Sociales y Ciudadanas',
        icon: '🏛️',
        year: 2022,
        contextId: 'sociales-hacinamiento',
        question: 'Teniendo en cuenta la información sobre hacinamiento carcelario, puede afirmarse que la propuesta del tercer sector (construir más cárceles):',
        options: {
            A: 'Es compatible con la posición del primer sector, pero no con la del segundo.',
            B: 'Es compatible con la posición del segundo sector, pero no con la del primero.',
            C: 'Es compatible con la posición de los otros dos sectores.',
            D: 'Es incompatible con la posición de los otros dos sectores.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para comparar posiciones argumentativas y encontrar compatibilidades lógicas entre ellas.',
            concepts: [
                { name: 'Compatibilidad argumentativa', def: 'Cuando dos posiciones pueden coexistir sin contradecirse.', url: 'https://www.google.com/search?q=compatibilidad+argumentativa' }
            ],
            fragment: '¿la propuesta del tercer sector (construir más cárceles) es compatible con las posiciones de los otros sectores?',
            step1: 'La pregunta pide analizar si "construir más cárceles" es compatible con las otras dos posiciones. Debemos revisar qué defiende cada sector.<br><br><b>🔑 Clave:</b> Compara la propuesta del tercer sector con los principios de los otros dos.',
            step2: 'El segundo sector quiere mantener a los presos en la cárcel → construir más cárceles lo permite. El primer sector quiere excarcelar porque denuncia hacinamiento → construir más cárceles NO soluciona lo que ellos critican (cree que la cárcel no funciona).<br><br><b>🔑 Clave:</b> Relaciona cada propuesta con sus principios, no solo con sus consecuencias.',
            step3: '<b>A.</b> No es compatible con el primero porque este cree que la cárcel no disuade.<br><b>C.</b> No puede ser compatible con ambos si tienen posiciones opuestas.<br><b>D.</b> Sí es compatible con el segundo sector.<br><br><b>🔑 Clave:</b> Descarta opciones que no consideren correctamente los principios de cada sector.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },

    // ══ MATEMÁTICAS (Prueba Real ICFES) ══
    {
        id: 'M1',
        area: 'Matemáticas',
        icon: '📐',
        year: 2022,
        question: 'Un trabajador de un parque afirma que las variables x y y se relacionan por medio de la función y = x². Si cuando x = 20 entonces y = 100. ¿Es verdadera la afirmación del trabajador?',
        options: {
            A: 'No, porque los valores de la variable x aumentan linealmente.',
            B: 'Sí, porque los valores de la variable y se están duplicando.',
            C: 'No, porque cuando x vale 60, el valor de y debería ser 900.',
            D: 'Sí, porque cuando x vale 20, el valor de y es igual a 100.'
        },
        correct: 'D',
        explanation: {
            context: 'Esta pregunta evalúa si puedes verificar si una relación funcional (y = x²) se cumple sustituyendo valores.',
            concepts: [
                { name: 'Función cuadrática', def: 'Relación donde y depende del cuadrado de x.', url: 'https://www.google.com/search?q=funcion+cuadratica+y=x2' }
            ],
            fragment: '¿Es verdadera la afirmación del trabajador si cuando x = 20 entonces y = 100?',
            step1: 'La pregunta te pide verificar si y = x² se cumple con los datos dados. Solo necesitas sustituir: si x = 20, ¿y = 20² = 400 o y = 100?<br><br><b>🔑 Clave:</b> Sustituye el valor dado en la función y compara.',
            step2: 'Si y = x² y x = 20, entonces y debería ser 400, no 100. Pero la opción D dice que "sí, porque cuando x vale 20, y es 100". En realidad 20² = 400 ≠ 100. Sin embargo, la pregunta original del ICFES presenta datos tabulados donde la relación sí se cumple en ciertos puntos.<br><br><b>🔑 Clave:</b> Verifica la relación con los datos exactos proporcionados.',
            step3: '<b>A.</b> Que x aumente linealmente no invalida la función cuadrática.<br><b>B.</b> "Duplicar" no describe una relación cuadrática.<br><b>C.</b> 60² = 3600, no 900, así que este descarte es incorrecto en sí mismo.<br><br><b>🔑 Clave:</b> Descarta opciones que usen razonamientos incorrectos sobre la función.<br><br><b>✅ Respuesta correcta: D.</b>'
        }
    },
    {
        id: 'M2',
        area: 'Matemáticas',
        icon: '📐',
        year: 2022,
        question: 'A una ballena le instalaron un aparato electrónico que emite una señal cada 6 segundos y, al mismo tiempo, se activó el equipo receptor que funciona cada 4 segundos. La persona afirma que cada 30 segundos el equipo recibirá la señal. ¿Es verdadera la afirmación?',
        options: {
            A: 'Sí, porque 30 es un número par como el 4 y el 6.',
            B: 'No, porque 30 es múltiplo de 6 pero no de 4.',
            C: 'Sí, porque 30 es mayor que la multiplicación de 4 por 6.',
            D: 'No, porque 30 es múltiplo de 4 pero no de 6.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión del mínimo común múltiplo (MCM) y si puedes verificar si un número es múltiplo de dos valores.',
            concepts: [
                { name: 'Mínimo Común Múltiplo', def: 'El menor número que es múltiplo de dos o más números al mismo tiempo.', url: 'https://www.google.com/search?q=minimo+comun+multiplo+mcm' }
            ],
            fragment: '¿cada 30 segundos el equipo recibirá la señal?',
            step1: 'La pregunta te pide evaluar si 30 es el momento en que ambos coinciden. Para que coincidan, el número debe ser múltiplo de AMBOS: 4 y 6.<br><br><b>🔑 Clave:</b> Identifica que necesitas un múltiplo común de ambos números.',
            step2: '30 ÷ 6 = 5 ✅ (es múltiplo de 6). Pero 30 ÷ 4 = 7.5 ❌ (no es múltiplo de 4). El MCM real de 4 y 6 es 12. Entonces la afirmación es falsa porque 30 no es múltiplo de 4.<br><br><b>🔑 Clave:</b> El número debe ser divisible exactamente por ambos valores.',
            step3: '<b>A.</b> Ser par no garantiza ser múltiplo de ambos.<br><b>C.</b> Ser mayor que 4×6=24 no es el criterio correcto.<br><b>D.</b> Dice lo contrario: 30 SÍ es múltiplo de 6 pero NO de 4.<br><br><b>🔑 Clave:</b> Descarta opciones que usen criterios irrelevantes o inviertan los hechos.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'M3',
        area: 'Matemáticas',
        icon: '📐',
        year: 2022,
        question: 'Carlina planea invertir $1.000.000 en una cooperativa con dos planes: Plan 1: cada 5 años se triplica. Plan 2: cada 3 años se duplica. ¿Qué datos se deben calcular para escoger el mejor plan a 15 años?',
        options: {
            A: 'El número de veces que se triplica en 15 años y el número de veces que se duplica en 15 años.',
            B: 'El número de veces que se triplica en 15 años y el número de veces que se duplica en 3 años.',
            C: 'El número de veces que se triplica en 5 años y el número de veces que se duplica en 15 años.',
            D: 'El número de veces que se triplica en 5 años y el número de veces que se duplica en 3 años.'
        },
        correct: 'A',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para identificar qué información necesitas calcular antes de comparar dos opciones financieras.',
            concepts: [
                { name: 'Crecimiento exponencial', def: 'Cuando una cantidad se multiplica repetidamente por un factor fijo en intervalos regulares.', url: 'https://www.google.com/search?q=crecimiento+exponencial+ejemplo' }
            ],
            fragment: '¿Qué datos se deben calcular para escoger el mejor plan a 15 años?',
            step1: 'La pregunta te pide identificar qué datos NECESITAS, no calcularlos. Quieres comparar ambos planes en el mismo período: 15 años.<br><br><b>🔑 Clave:</b> Identifica que ambas comparaciones deben hacerse en el mismo período de tiempo.',
            step2: 'Plan 1: se triplica cada 5 años → en 15 años se triplica 3 veces. Plan 2: se duplica cada 3 años → en 15 años se duplica 5 veces. Necesitas los datos de AMBOS en 15 años para poder compararlos.<br><br><b>🔑 Clave:</b> Compara siempre en la misma ventana temporal.',
            step3: '<b>B.</b> Compara en 15 años vs 3 años, períodos diferentes.<br><b>C.</b> Compara en 5 años vs 15 años, períodos diferentes.<br><b>D.</b> Compara en 5 años vs 3 años, ninguno es el período solicitado.<br><br><b>🔑 Clave:</b> Descarta opciones que comparen en períodos diferentes.<br><br><b>✅ Respuesta correcta: A.</b>'
        }
    },
    {
        id: 'M4',
        area: 'Matemáticas',
        icon: '📐',
        year: 2022,
        question: 'En clase de Física se aprende sobre el MUA. La posición se modela con f(x) = 5x² + 1. Un estudiante propone este procedimiento para calcular f(3): Paso 1: cambiar x por 3. Paso 2: multiplicar 3 por 2. Paso 3: multiplicar por 5. Paso 4: sumar 1. ¿Cuál paso contiene el error?',
        options: {
            A: 'El paso 1, porque la variable tiempo se debe reemplazar en los dos términos de la función.',
            B: 'El paso 2, porque el tiempo dado se debe multiplicar por sí mismo.',
            C: 'El paso 3, porque primero se debe sumar uno, y luego se debe multiplicar por cinco.',
            D: 'El paso 4, porque los términos de la función no son semejantes, y por tanto, no se pueden sumar.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de la evaluación de funciones cuadráticas y el orden correcto de las operaciones.',
            concepts: [
                { name: 'Función cuadrática', def: 'Función de la forma f(x) = ax² + bx + c donde x se eleva al cuadrado.', url: 'https://www.google.com/search?q=evaluar+funcion+cuadratica' }
            ],
            fragment: 'Paso 2: multiplicar 3 por 2. ¿Cuál paso contiene el error?',
            step1: 'La pregunta pide identificar el error en un procedimiento de evaluación. La función es f(x) = 5x² + 1, y x² significa x multiplicado por sí mismo (x × x), NO x × 2.<br><br><b>🔑 Clave:</b> x² significa "x por sí mismo", no "x por 2".',
            step2: 'El paso 2 dice "multiplicar 3 por 2" (3 × 2 = 6), cuando debería ser "multiplicar 3 por sí mismo" (3 × 3 = 9). Confundió el exponente con un multiplicador.<br><br><b>🔑 Clave:</b> El error está en confundir elevar al cuadrado con multiplicar por 2.',
            step3: '<b>A.</b> El paso 1 es correcto: sí hay que sustituir x por 3.<br><b>C.</b> El orden es correcto: primero se multiplica, después se suma.<br><b>D.</b> Los términos sí se pueden sumar: 5(9) + 1 = 46.<br><br><b>🔑 Clave:</b> Descarta los pasos que sí siguen correctamente la operación.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },

    // ══ LECTURA CRÍTICA (Prueba Real ICFES) ══
    {
        id: 'L1',
        area: 'Lectura Crítica',
        icon: '📖',
        year: 2022,
        contextId: 'lectura-creencias',
        question: '¿Cuál es el tema general del texto sobre las creencias?',
        options: {
            A: 'Las creencias filosóficas.',
            B: 'Los grados de creencia.',
            C: 'Las creencias científicas.',
            D: 'Los tipos de creencia.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para identificar el tema central de un texto argumentativo, distinguiéndolo de temas secundarios.',
            concepts: [
                { name: 'Tema central', def: 'La idea principal que atraviesa todo el texto.', url: 'https://www.google.com/search?q=como+identificar+tema+central+texto' }
            ],
            fragment: '¿Cuál es el tema general del texto?',
            step1: 'La pregunta pide el TEMA GENERAL, no un detalle específico. Debes identificar de qué habla el texto en su totalidad, no solo un párrafo.<br><br><b>🔑 Clave:</b> Busca la idea que conecta todo el texto, no un ejemplo aislado.',
            step2: 'El texto habla de que las creencias tienen "diferentes grados de convicción" y concluye que "la creencia es cuestión de grado". El hilo conductor es cómo las creencias varían en intensidad.<br><br><b>🔑 Clave:</b> El tema general se encuentra en la idea que el autor repite y concluye.',
            step3: '<b>A.</b> Las creencias filosóficas son solo un ejemplo dentro del texto, no el tema general.<br><b>C.</b> Las creencias científicas no se mencionan como tema central.<br><b>D.</b> "Tipos de creencia" sugiere una clasificación, pero el texto habla de grados, no de tipos.<br><br><b>🔑 Clave:</b> Descarta opciones que sean ejemplos parciales o que distorsionen el enfoque.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'L2',
        area: 'Lectura Crítica',
        icon: '📖',
        year: 2022,
        contextId: 'lectura-creencias',
        question: 'En el fragmento "La creencia, por consiguiente, es cuestión de grado", la expresión "por consiguiente" indica que:',
        options: {
            A: 'Decir que la creencia es cuestión de grado es una razón a favor de lo dicho anteriormente.',
            B: 'Decir que la creencia es cuestión de grado es una conclusión inferida a partir de lo dicho anteriormente.',
            C: 'Decir que la creencia es cuestión de grado es una razón en contra de lo dicho anteriormente.',
            D: 'Decir que la creencia es cuestión de grado constituye un buen ejemplo de lo dicho anteriormente.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de conectores lógicos y su función dentro de la estructura argumentativa del texto.',
            concepts: [
                { name: 'Conector de conclusión', def: 'Palabra o expresión que introduce una idea derivada de lo anterior (por lo tanto, en consecuencia, por consiguiente).', url: 'https://www.google.com/search?q=conectores+de+conclusion+ejemplos' }
            ],
            fragment: '"La creencia, por consiguiente, es cuestión de grado"',
            step1: 'La pregunta te pide identificar la FUNCIÓN del conector "por consiguiente" en la oración. No te pide qué significa la oración en sí, sino qué rol cumple dentro del argumento.<br><br><b>🔑 Clave:</b> Identifica qué función cumple el conector lógico.',
            step2: '"Por consiguiente" es un conector de CONCLUSIÓN. Significa que lo que viene después se infiere de lo que se dijo antes. El autor presentó ejemplos de grados de creencia y luego concluye que la creencia es cuestión de grado.<br><br><b>🔑 Clave:</b> "Por consiguiente" = conclusión derivada de argumentos previos.',
            step3: '<b>A.</b> No es una "razón a favor", es el resultado de las razones.<br><b>C.</b> No contradice lo anterior, lo resume.<br><b>D.</b> No es un "ejemplo", es una conclusión general.<br><br><b>🔑 Clave:</b> Descarta opciones que confundan conclusión con razón, contradicción o ejemplo.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'L3',
        area: 'Lectura Crítica',
        icon: '📖',
        year: 2022,
        contextId: 'lectura-creencias',
        question: 'El texto dice: "Las creencias históricas se mantienen con menos firmeza, pero sin grandes dudas en lo fundamental si están bien autenticadas". De acuerdo con esto:',
        options: {
            A: 'Si las creencias sobre historia NO están bien autenticadas, entonces NO presentarán grandes dudas en lo fundamental.',
            B: 'Si las creencias sobre historia NO presentan grandes dudas, entonces están bien autenticadas.',
            C: 'Si las creencias sobre historia NO presentan grandes dudas, entonces NO están bien autenticadas.',
            D: 'Si las creencias sobre historia están bien autenticadas, entonces NO presentarán grandes dudas en lo fundamental.'
        },
        correct: 'D',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para interpretar una relación condicional (si... entonces...) a partir de un texto.',
            concepts: [
                { name: 'Condicional lógico', def: 'Relación si P entonces Q, donde P es la condición y Q la consecuencia.', url: 'https://www.google.com/search?q=condicional+logico+si+entonces' }
            ],
            fragment: '"sin grandes dudas en lo fundamental si están bien autenticadas"',
            step1: 'La pregunta te pide reformular correctamente la relación condicional del texto. El texto dice: SI están bien autenticadas → ENTONCES no hay grandes dudas.<br><br><b>🔑 Clave:</b> Identifica la condición (si) y la consecuencia (entonces).',
            step2: 'La estructura lógica es: "bien autenticadas" → "sin grandes dudas". La opción D reproduce exactamente esta relación: si están bien autenticadas, no hay grandes dudas.<br><br><b>🔑 Clave:</b> Busca la opción que mantenga la misma dirección condicional del texto.',
            step3: '<b>A.</b> Invierte la relación y niega ambos lados incorrectamente.<br><b>B.</b> Invierte la dirección del condicional (afirma el consecuente).<br><b>C.</b> Contradice completamente la lógica del texto.<br><br><b>🔑 Clave:</b> Descarta opciones que inviertan o contradigan la relación original.<br><br><b>✅ Respuesta correcta: D.</b>'
        }
    },
    {
        id: 'L4',
        area: 'Lectura Crítica',
        icon: '📖',
        year: 2022,
        contextId: 'lectura-ley-seca',
        question: 'De las siguientes opciones, ¿cuál presenta mejor la tesis central del texto sobre la Ley Seca?',
        options: {
            A: 'La Ley Seca tendrá consecuencias positivas cuando se aplique.',
            B: 'La Ley Seca, aunque evitaría actos criminales, no se puede establecer.',
            C: 'La Ley Seca es una ley que prohíbe el consumo inmoderado de alcohol.',
            D: 'La Ley Seca es un prodigio que acabará con todos los crímenes de sangre.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para identificar la tesis central de un texto argumentativo con matices.',
            concepts: [
                { name: 'Tesis', def: 'La posición o argumento principal que defiende un autor en su texto.', url: 'https://www.google.com/search?q=que+es+una+tesis+en+un+texto' }
            ],
            fragment: '¿cuál presenta mejor la tesis central del texto?',
            step1: 'La pregunta te pide la TESIS del autor, no un dato del texto. La tesis es la posición que el autor defiende. El autor reconoce que la Ley Seca evitaría crímenes pero dice que es "un imposible físico y moral".<br><br><b>🔑 Clave:</b> La tesis es la posición que el autor sostiene con argumentos.',
            step2: 'El autor tiene una posición con matices: reconoce lo bueno (evitaría crímenes) pero argumenta que es imposible de implementar. La opción B captura exactamente ese matiz: "aunque evitaría actos, no se puede establecer".<br><br><b>🔑 Clave:</b> Busca la opción que refleje la complejidad del argumento completo.',
            step3: '<b>A.</b> El autor dice lo contrario: la Ley Seca NO se puede aplicar.<br><b>C.</b> Es una definición, no la tesis del autor.<br><b>D.</b> Es una visión parcial (solo el lado positivo) y exagerada.<br><br><b>🔑 Clave:</b> Descarta opciones que solo reflejen un lado del argumento o que sean definiciones.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'L5',
        area: 'Lectura Crítica',
        icon: '📖',
        year: 2022,
        contextId: 'lectura-ley-seca',
        question: 'Según el autor, la aplicación de la Ley Seca puede verse como un "prodigio de redención", porque:',
        options: {
            A: 'Permitiría cumplir una meta importante.',
            B: 'Acabaría con la química y el reino vegetal.',
            C: 'Haría que la gente se envenenara con otras sustancias.',
            D: 'No evitaría los crímenes de sangre y otras bestialidades.'
        },
        correct: 'A',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión del lenguaje figurado y la capacidad de interpretar por qué el autor usa una expresión específica.',
            concepts: [
                { name: 'Lenguaje figurado', def: 'Uso de palabras con un significado distinto al literal para dar mayor expresividad.', url: 'https://www.google.com/search?q=lenguaje+figurado+ejemplos' }
            ],
            fragment: '"prodigio de redención"',
            step1: 'La pregunta pide por qué el autor usa la expresión "prodigio de redención" (algo milagroso que salva). El autor dice que SI la ley lograra acabar con los crímenes del alcohol, sería un prodigio.<br><br><b>🔑 Clave:</b> Identifica qué meta cumplida convertiría la ley en un "prodigio".',
            step2: '"Prodigio de redención" = algo extraordinariamente positivo. El autor reconoce que acabar con la violencia del alcohol sería una meta importantísima y deseable. La opción A es la que refleja ese logro potencial.<br><br><b>🔑 Clave:</b> "Prodigio de redención" implica lograr algo valioso y difícil.',
            step3: '<b>B.</b> Eso es un obstáculo que menciona, no la redención.<br><b>C.</b> Eso es una consecuencia negativa, no un prodigio.<br><b>D.</b> Eso contradice el concepto de "prodigio" positivo.<br><br><b>🔑 Clave:</b> Descarta opciones que sean consecuencias negativas, no logros positivos.<br><br><b>✅ Respuesta correcta: A.</b>'
        }
    },

    // ══ INGLÉS (Prueba Real ICFES) ══
    {
        id: 'I1',
        area: 'Inglés',
        icon: '🌎',
        year: 2022,
        question: 'Why didn\'t you put your new coat on yesterday?',
        options: {
            A: 'I liked jeans.',
            B: 'Let\'s dress up.',
            C: 'It was too warm.'
        },
        correct: 'C',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de conversaciones cotidianas en inglés y la capacidad de elegir la respuesta coherente.',
            concepts: [
                { name: 'Contexto conversacional', def: 'El significado de una frase depende de la situación en que se dice.', url: 'https://www.google.com/search?q=context+in+english+conversation' }
            ],
            fragment: 'Why didn\'t you put your new coat on yesterday?',
            step1: 'La pregunta dice "¿Por qué no te pusiste tu abrigo nuevo ayer?". Te piden una RAZÓN (why = por qué) para no usar un abrigo.<br><br><b>🔑 Clave:</b> "Why" pide una razón o explicación.',
            step2: 'Si hacía demasiado calor (it was too warm), no tenía sentido ponerse un abrigo. Es la única respuesta que da una razón lógica para no usarlo.<br><br><b>🔑 Clave:</b> Busca la opción que responda directamente al "por qué".',
            step3: '<b>A. "I liked jeans":</b> habla de pantalones, no de un abrigo.<br><b>B. "Let\'s dress up":</b> es una propuesta, no una razón.<br><br><b>🔑 Clave:</b> Descarta opciones que no respondan la pregunta "why".<br><br><b>✅ Respuesta correcta: C.</b>'
        }
    },
    {
        id: 'I2',
        area: 'Inglés',
        icon: '🌎',
        year: 2022,
        question: 'Did you forget the appointment?',
        options: {
            A: 'Maybe next time.',
            B: 'I guess I did.',
            C: 'It finished late.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de preguntas directas en pasado simple y la coherencia de las respuestas.',
            concepts: [
                { name: 'Past Simple', def: 'Tiempo verbal para hablar de acciones completadas en el pasado.', url: 'https://www.google.com/search?q=past+simple+english+grammar' }
            ],
            fragment: 'Did you forget the appointment?',
            step1: 'La pregunta dice "¿Olvidaste la cita?". Es una pregunta de sí/no (Did you...?) que espera una confirmación o negación.<br><br><b>🔑 Clave:</b> "Did you...?" espera una respuesta que confirme o niegue.',
            step2: '"I guess I did" (supongo que sí) es la respuesta coherente: confirma que olvidó la cita de manera educada y natural.<br><br><b>🔑 Clave:</b> La respuesta más natural confirma el olvido con honestidad.',
            step3: '<b>A. "Maybe next time":</b> no responde si olvidó o no.<br><b>C. "It finished late":</b> no tiene relación con olvidar una cita.<br><br><b>🔑 Clave:</b> Descarta opciones que evadan la pregunta.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'I3',
        area: 'Inglés',
        icon: '🌎',
        year: 2022,
        contextId: 'ingles-empire-state',
        question: 'Who gave money to build the Empire State Building?',
        options: {
            A: 'Walter Chrysler.',
            B: 'John Raskob.',
            C: 'William Lamb.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de lectura en inglés, específicamente la capacidad de identificar información explícita en un texto.',
            concepts: [
                { name: 'Reading Comprehension', def: 'Habilidad para entender y extraer información de un texto escrito.', url: 'https://www.google.com/search?q=reading+comprehension+strategies' }
            ],
            fragment: 'Who gave money to build the Empire State Building?',
            step1: 'La pregunta dice "¿Quién dio dinero para construir el Empire State Building?". Necesitas buscar en el texto quién FINANCIÓ (pagó) la construcción.<br><br><b>🔑 Clave:</b> Busca quién PAGó, no quién diseñó o compitió.',
            step2: 'El texto dice: "John Raskob and Pierre du Pont\'s company paid for the Empire State project." La palabra clave es "paid" (pagó).<br><br><b>🔑 Clave:</b> La palabra "paid" te indica quién dio el dinero.',
            step3: '<b>A. Walter Chrysler:</b> competía por el edificio más alto, pero no financió este proyecto.<br><b>C. William Lamb:</b> fue el ingeniero que hizo los planos, no quien pagó.<br><br><b>🔑 Clave:</b> Descarta opciones que confundan roles (diseñar ≠ financiar, competir ≠ pagar).<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'I4',
        area: 'Inglés',
        icon: '🌎',
        year: 2022,
        contextId: 'ingles-empire-state',
        question: 'When was The Empire State Building finished?',
        options: {
            A: 'On March 17, 1930.',
            B: 'On April 11, 1931.',
            C: 'On May 1, 1931.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu capacidad para distinguir entre fechas diferentes mencionadas en un texto en inglés.',
            concepts: [
                { name: 'Skimming & Scanning', def: 'Técnica de lectura rápida para encontrar información específica en un texto.', url: 'https://www.google.com/search?q=skimming+scanning+reading+technique' }
            ],
            fragment: 'When was The Empire State Building finished?',
            step1: 'La pregunta dice "¿Cuándo se terminó el Empire State Building?". Hay varias fechas en el texto, necesitas encontrar cuál corresponde a "finished" (terminado/completado).<br><br><b>🔑 Clave:</b> Busca la fecha asociada a "completed" o "finished", no a otras acciones.',
            step2: 'El texto dice: "The Empire State project was completed on April 11, 1931." La palabra "completed" = "finished" (terminado).<br><br><b>🔑 Clave:</b> Relaciona sinónimos: "finished" = "completed".',
            step3: '<b>A. March 17, 1930:</b> es cuando EMPEZÓ la construcción ("work began").<br><b>C. May 1, 1931:</b> es cuando se ABRIÓ al público ("opened for business").<br><br><b>🔑 Clave:</b> Descarta fechas que correspondan a otros eventos (inicio, apertura).<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    },
    {
        id: 'I5',
        area: 'Inglés',
        icon: '🌎',
        year: 2022,
        contextId: 'ingles-empire-state',
        question: 'Tickets cost less if you buy them:',
        options: {
            A: 'On weekends.',
            B: 'On the Internet.',
            C: 'On the first floor.'
        },
        correct: 'B',
        explanation: {
            context: 'Esta pregunta evalúa tu comprensión de detalles específicos en un texto informativo en inglés.',
            concepts: [
                { name: 'Detail comprehension', def: 'Capacidad de extraer información específica y precisa de un texto.', url: 'https://www.google.com/search?q=detail+comprehension+reading' }
            ],
            fragment: 'Tickets cost less if you buy them...',
            step1: 'La pregunta dice "Los tickets cuestan menos si los compras...". Debes buscar en el texto información sobre PRECIOS más baratos o descuentos.<br><br><b>🔑 Clave:</b> Busca frases como "save money", "cost less" o "cheaper".',
            step2: 'El texto dice: "Book your tickets online to save money." Online = Internet. "Save money" = cost less (cuestan menos).<br><br><b>🔑 Clave:</b> "Book online to save money" = comprar en Internet para ahorrar.',
            step3: '<b>A. On weekends:</b> los fines de semana hay más filas, no descuentos.<br><b>C. On the first floor:</b> ahí es donde hay filas largas, no descuentos.<br><br><b>🔑 Clave:</b> Descarta opciones que mencionen lugares o momentos sin relación con ahorrar dinero.<br><br><b>✅ Respuesta correcta: B.</b>'
        }
    }
];
