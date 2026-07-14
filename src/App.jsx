import React, { useState, useEffect, useMemo } from 'react';

// === BANCO DE PREGUNTAS CLASIFICADAS ===
const QUESTIONS_DATA = [
  // ─── Módulo 1: Comunicación Interprocesos (IPC) ───
  {
    id: 1,
    category: "Comunicación Interprocesos",
    question: "¿Qué hace la función fork()?",
    answer: "Realiza una copia idéntica del proceso actual, creando un proceso hijo que hereda recursos como el código y la pila, y continúa su ejecución exactamente desde donde se invocó el fork()."
  },
  {
    id: 2,
    category: "Comunicación Interprocesos",
    question: "En C++, al usar fork(), ¿cómo se distingue si estás en el proceso padre o en el proceso hijo?",
    answer: "Mediante el valor de retorno del PID: si el PID devuelto es 0, estás en el proceso hijo; si el PID es mayor a 0, estás en el proceso padre."
  },
  {
    id: 3,
    category: "Comunicación Interprocesos",
    question: "¿Cuál es la diferencia principal entre usar hilos (threads) y fork()?",
    answer: "Los hilos son más rápidos porque no duplican recursos, pero son totalmente dependientes; si el proceso padre termina, todos sus hilos también terminan."
  },
  {
    id: 4,
    category: "Comunicación Interprocesos",
    question: "¿Cuáles son los cuatro mecanismos básicos de comunicación entre procesos?",
    answer: "Son el Buffer (almacena datos temporalmente de forma secuencial), Cola o Queue (atiende procesos por orden de llegada), Tubería o Pipe (mecanismo directo de comunicación entre procesos) y Flujo o Stream (fuente continua de datos que se procesan en secuencia y no se almacenan en memoria)."
  },
  {
    id: 5,
    category: "Comunicación Interprocesos",
    question: "¿Qué es un Buffer en el contexto de IPC?",
    answer: "Es un amortiguador que almacena datos temporalmente de manera secuencial, permitiendo coordinar la velocidad de producción y consumo de datos entre procesos."
  },
  {
    id: 6,
    category: "Comunicación Interprocesos",
    question: "¿Qué es un Stream (Flujo) y cómo se diferencia de un Buffer?",
    answer: "Un Stream es una fuente continua de datos que se procesan en secuencia y no se almacenan en memoria, a diferencia del Buffer que sí almacena los datos temporalmente de forma secuencial."
  },

  // ─── Módulo 2: Sistema de Archivos (File System) ───
  {
    id: 7,
    category: "Sistema de Archivos",
    question: "¿Qué es el File System y cuáles son sus objetivos principales?",
    answer: "Es el componente manejado por el kernel del S.O. que gestiona el conjunto de archivos. Sus objetivos son garantizar la persistencia del almacenamiento, organizar la información agrupando datos similares y permitir el procesamiento de esos datos."
  },
  {
    id: 8,
    category: "Sistema de Archivos",
    question: "¿Qué es un archivo desde la perspectiva del sistema operativo?",
    answer: "Es una entidad manejada como unidad de almacenamiento para un conjunto de bytes, que puede contener datos para procesamiento o contenido binario (como ejecutables)."
  },
  {
    id: 9,
    category: "Sistema de Archivos",
    question: "¿Cuáles son los atributos principales de un archivo?",
    answer: "Son su ID, nombre, tipo o extensión (ejecutables como .exe/.com o datos como .txt/.xls), tamaño en bytes, fechas de creación y modificación, propietario y permisos (lectura, escritura y ejecución)."
  },
  {
    id: 10,
    category: "Sistema de Archivos",
    question: "¿Cuáles son las unidades mínimas de almacenamiento a nivel de hardware y software?",
    answer: "A nivel de hardware (disco duro magnético) la unidad mínima de grabación es el sector, que típicamente tiene 512 bytes. A nivel de software, la unidad mínima de lectura y grabación es el clúster."
  },
  {
    id: 11,
    category: "Sistema de Archivos",
    question: "¿Qué es el MBR y qué contiene?",
    answer: "El Master Boot Record (MBR) es el primer sector de 512 bytes del disco duro. Su función es indicarle al sistema dónde está el Sistema Operativo y cómo está dividido el disco, a través de la Tabla de Particiones. Es fundamental en el proceso de arranque."
  },
  {
    id: 12,
    category: "Sistema de Archivos",
    question: "¿Qué sucede durante el proceso de arranque (Boot) del sistema?",
    answer: "Se inicializa el hardware mediante el BIOS, que ejecuta el POST (Power-On Self Test). Luego lee el MBR (primer sector de 512 bytes del disco) para localizar la Tabla de Particiones y encontrar dónde está instalado el Sistema Operativo."
  },
  {
    id: 13,
    category: "Sistema de Archivos",
    question: "¿Para qué sirve exactamente la Tabla de Particiones?",
    answer: "Es un índice o mapa ubicado en el MBR que indica al sistema cómo está dividido físicamente el disco duro en particiones y en cuál de ellas está ubicado el Sistema Operativo para poder arrancar."
  },
  {
    id: 14,
    category: "Sistema de Archivos",
    question: "¿Qué es un directorio a nivel de Sistema Operativo?",
    answer: "Técnicamente es un archivo especial que guarda una tabla o lista de enlaces (punteros) hacia otros archivos junto con sus metadatos, permitiendo organizar la información de manera jerárquica."
  },
  {
    id: 15,
    category: "Sistema de Archivos",
    question: "¿Qué es el CRC y cómo funciona para la grabación de archivos?",
    answer: "Es el Control de Redundancia Cíclica, un mecanismo matemático que detecta errores. El sistema calcula un código polinómico al grabar y lo guarda junto a los datos; al leer, recalcula el código y los compara para asegurar que no haya corrupción."
  },
  {
    id: 16,
    category: "Sistema de Archivos",
    question: "¿Qué papel juega el Sistema Operativo frente a un DBMS?",
    answer: "El Sistema Operativo actúa solo como un mensajero/espectador que sabe dónde están los bytes en el disco. El DBMS aporta la inteligencia: entiende la estructura interna (tablas/columnas), maneja los índices y realiza las búsquedas lógicas."
  },

  // ─── Módulo 2b: Bases de Datos e Índices ───
  {
    id: 17,
    category: "Bases de Datos e Índices",
    question: "¿Qué es un registro y cuáles son sus tipos según su longitud?",
    answer: "Es una agrupación lógica de campos de datos. Pueden ser de longitud variable (como un archivo de texto, que usa delimitadores de fin de línea) o de longitud uniforme (como una base de datos, que permite el acceso aleatorio y rápido)."
  },
  {
    id: 18,
    category: "Bases de Datos e Índices",
    question: "¿Por qué la inserción física en archivos ordenados es onerosa y cómo lo soluciona el archivo índice?",
    answer: "Para aplicar búsqueda binaria, el archivo físico gigante debe estar ordenado, por lo que insertar un dato requiere reescribir todo el archivo. La solución es crear un archivo índice pequeño y complementario que guarda solo la clave y el puntero al registro."
  },
  {
    id: 19,
    category: "Bases de Datos e Índices",
    question: "¿Cómo fue la evolución de la arquitectura de desarrollo para el manejo de archivos?",
    answer: "Evolucionó desde aplicaciones ejecutables básicas (.EXE), pasando por el modelo cliente-servidor, hasta llegar a los gestores de bases de datos de escritorio (dBase, Visual Fox) que popularizaron los archivos índice para solucionar la inserción onerosa."
  },

  // ─── Módulo 3: Virtualización ───
  {
    id: 20,
    category: "Virtualización y E/S",
    question: "¿Cuál es la principal diferencia entre Virtualización y Emulación?",
    answer: "La virtualización simula un componente conservando el 100% de su funcionalidad, sin diferencias notorias con el entorno real. La emulación intenta imitar el comportamiento mediante software, pero el sistema 'sabe que no es real' porque no alcanza la funcionalidad completa."
  },
  {
    id: 21,
    category: "Virtualización y E/S",
    question: "¿Qué es una Máquina Virtual (VM) y cuál es un ejemplo concreto?",
    answer: "Es un archivo de software que se comporta íntegramente como una computadora física, ejecutando su propio kernel independiente. Un ejemplo es VirtualBox corriendo Linux sobre Windows."
  },
  {
    id: 22,
    category: "Virtualización y E/S",
    question: "¿En qué se diferencia un contenedor (ej. Docker) de una Máquina Virtual completa?",
    answer: "Una Máquina Virtual ejecuta su propio kernel independiente, mientras que un contenedor (como Docker) no tiene kernel propio; utiliza el kernel del sistema operativo host (anfitrión), lo que lo hace más ligero."
  },
  {
    id: 23,
    category: "Virtualización y E/S",
    question: "¿Por qué se utiliza la Máquina Virtual de Java (JVM) y qué problema resuelve?",
    answer: "Resuelve el problema de que el código de máquina es altamente dependiente de una arquitectura de procesador específica. La JVM permite ejecutar código intermedio (bytecode) en cualquier arquitectura sin recompilar."
  },

  // ─── Módulo 4: Gestión de E/S ───
  {
    id: 24,
    category: "Virtualización y E/S",
    question: "¿Cómo interactúa el procesador con los dispositivos de E/S?",
    answer: "El procesador interactúa con módulos o tarjetas de hardware (como sonido, video o red) enviando instrucciones a través de direcciones de puertos específicos hacia sus controladores."
  },
  {
    id: 25,
    category: "Virtualización y E/S",
    question: "¿Cuáles son los componentes principales de la arquitectura de Gestión de E/S?",
    answer: "La gestión de E/S involucra la coordinación entre puertos, controladores, dispositivos, periféricos y canales de E/S para que el procesador pueda comunicarse con el hardware externo."
  },

  // ─── Módulo 5: Seguridad y Auditoría ───
  {
    id: 26,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Cuál es el objetivo principal de la Seguridad en Sistemas Operativos?",
    answer: "Reducir los riesgos del sistema: mitigar fallas funcionales del hardware (por mantenimiento), corregir vulnerabilidades de software (actualizaciones y antivirus) y prevenir la pérdida de información sensible o la ejecución de archivos peligrosos."
  },
  {
    id: 27,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Qué es una VPN (Virtual Private Network) y qué ventaja ofrece?",
    answer: "Es un mecanismo de seguridad en redes que convierte una conexión expuesta a internet en un entorno cerrado y local (privado), mejorando significativamente la seguridad de los datos transmitidos."
  },
  {
    id: 28,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Qué es la Auditoría en un Sistema Operativo y para qué sirve?",
    answer: "Es el proceso de registrar, monitorear y analizar la actividad del sistema mediante logs (archivos de registro de eventos). Permite trazar qué usuario accedió a qué archivo, qué procesos se ejecutaron, o detectar intentos fallidos de acceso. Es indispensable para análisis forenses y el cumplimiento de normativas de ciberseguridad."
  },
  {
    id: 29,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Qué información se puede obtener mediante la auditoría del sistema?",
    answer: "Permite rastrear la trazabilidad del File System (quién accedió a qué archivo), supervisar qué procesos IPC se ejecutaron, detectar múltiples intentos fallidos de contraseña y obtener evidencia para análisis forenses tras una amenaza de seguridad."
  },

  // ─── Módulo 6: SO Distribuidos ───
  {
    id: 30,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Cuál es el concepto central de los Sistemas Operativos Distribuidos?",
    answer: "Múltiples equipos físicos trabajan de manera conjunta para resolver tareas comunes, de forma que el usuario final no percibe que hay varios equipos involucrados; todo el conglomerado actúa como si fuera una sola computadora."
  },
  {
    id: 31,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Cuáles son las tres características fundamentales de los Sistemas Distribuidos?",
    answer: "Transparencia (independencia de la ubicación física; el usuario no percibe múltiples equipos), Escalabilidad (capacidad de crecer en hardware y manejar aumento de carga sin perder rendimiento) e Interoperabilidad (comunicación fluida entre diferentes arquitecturas computacionales)."
  },
  {
    id: 32,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Qué significa la 'Transparencia' en un Sistema Distribuido?",
    answer: "Que el usuario final no percibe que está interactuando con múltiples equipos físicos. El sistema oculta la complejidad de la distribución, dando la impresión de ser una sola máquina unificada."
  },
  {
    id: 33,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Qué significa la 'Escalabilidad' en un Sistema Distribuido?",
    answer: "Es la capacidad del sistema de crecer agregando más hardware y de manejar un aumento continuo de carga de trabajo sin que el rendimiento se degrade de manera significativa."
  },

  // ─── Módulo 7: SO en Red (NOS) ───
  {
    id: 34,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿En qué consiste la arquitectura de un Sistema Operativo en Red (NOS)?",
    answer: "Se basa en un modelo Cliente-Servidor. A diferencia del SO Distribuido, el NOS es consciente de que la red tiene múltiples máquinas autónomas y separadas. El servidor gestiona cuentas de usuario centralizadas, provee seguridad y comparte recursos (carpetas, impresoras). El cliente sabe que está accediendo a un recurso remoto en el servidor."
  },
  {
    id: 35,
    category: "Redes, Seguridad y Distribuidos",
    question: "¿Cuál es la diferencia clave entre un Sistema Operativo Distribuido y un Sistema Operativo en Red (NOS)?",
    answer: "En un SO Distribuido, el conjunto de servidores actúa como una sola computadora transparente para el usuario. En un NOS, cada máquina es consciente de que está conectada a otras máquinas autónomas; el usuario sabe que accede a recursos remotos alojados en el servidor."
  }
];

// === CATEGORÍAS DISPONIBLES ===
const UNIQUE_CATEGORIES = [...new Set(QUESTIONS_DATA.map(q => q.category))];

// === PALABRAS NO SIGNIFICATIVAS EN ESPAÑOL ===
const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'en', 'y', 'o',
  'que', 'es', 'son', 'se', 'al', 'para', 'por', 'con', 'su', 'sus', 'como', 'esta',
  'este', 'estos', 'estas', 'ser', 'suya', 'suyo', 'cuando', 'donde', 'tiene', 'tienen',
  'donde', 'mientras', 'entre', 'dentro', 'fuera', 'otra', 'otro', 'otras', 'otros'
]);

// === FUNCIÓN DE LIMPIEZA DE PALABRAS ===
const cleanWord = (word) => {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?]/g, ""); // Eliminar puntuaciones
};

// === ALGORITMO JACCARD + COINCIDENCIAS LOCALE ===
const getLocalFeedback = (userAns, correctAns) => {
  if (!userAns) return { score: 0, matchedWords: [] };

  const userWords = userAns.split(/\s+/).map(cleanWord).filter(w => w.length > 1);
  const correctWords = correctAns.split(/\s+/).map(cleanWord).filter(w => w.length > 1);

  const cleanCorrectNoStop = correctWords.filter(w => !STOP_WORDS.has(w));
  const matchedSignificantWords = cleanCorrectNoStop.filter(w => userWords.includes(w));

  // Coincidencias totales (Jaccard aproximado)
  const userSet = new Set(userWords);
  const correctSet = new Set(correctWords);
  const intersection = new Set([...userSet].filter(x => correctSet.has(x)));
  const union = new Set([...userSet, ...correctSet]);

  const rawScore = union.size > 0 ? (intersection.size / union.size) * 100 : 0;
  // Multiplicamos un poco para dar un bonus si contiene palabras críticas
  const keyMatchRatio = cleanCorrectNoStop.length > 0 ? (matchedSignificantWords.length / cleanCorrectNoStop.length) * 100 : 0;

  const score = Math.min(100, Math.round((rawScore * 0.4) + (keyMatchRatio * 0.6)));

  return {
    score,
    matchedWords: Array.from(new Set(matchedSignificantWords))
  };
};

export default function App() {
  // === ESTADOS GENERALES ===
  const [currentTab, setCurrentTab] = useState('practice'); // 'practice', 'flashcards', 'list'
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(UNIQUE_CATEGORIES);
  
  // === ESTADOS DEL SIMULADOR ===
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [sessionScores, setSessionScores] = useState({}); // id -> { score, status: 'correcto' | 'regular' | 'incorrecto' }
  const [showNotification, setShowNotification] = useState(null);

  // === ESTADOS DE IA (GEMINI) ===
  const [aiFeedback, setAiFeedback] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // === ESTADOS DE LAS FLASHCARDS ===
  const [flipped, setFlipped] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // === INICIALIZACIÓN Y MEZCLA ===
  const startNewTest = () => {
    let filteredData = QUESTIONS_DATA;
    if (selectedCategories.length > 0) {
      filteredData = QUESTIONS_DATA.filter(q => selectedCategories.includes(q.category));
    }
    
    if (filteredData.length === 0) {
      triggerNotification("⚠️ Selecciona al menos un bloque de temas para empezar.");
      return;
    }

    const shuffled = [...filteredData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswer('');
    setHasChecked(false);
    setAiFeedback(null);
    setSessionScores({});
    triggerNotification("🚀 ¡Test reiniciado con orden aleatorio!");
  };

  const filteredQuestionsData = useMemo(() => {
    if (selectedCategories.length === 0) return [];
    return QUESTIONS_DATA.filter(q => selectedCategories.includes(q.category));
  }, [selectedCategories]);

  useEffect(() => {
    setFlashcardIndex(0);
  }, [selectedCategories]);

  useEffect(() => {
    startNewTest();
  }, []);

  // === AYUDANTE DE NOTIFICACIONES ===
  const triggerNotification = (text) => {
    setShowNotification(text);
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  // === ANÁLISIS DE RESPUESTAS ===
  const currentQuestion = questions[currentIndex];
  const { score: localScore, matchedWords } = useMemo(() => {
    if (!currentQuestion) return { score: 0, matchedWords: [] };
    return getLocalFeedback(userAnswer, currentQuestion.answer);
  }, [userAnswer, currentQuestion]);

  const handleCheck = () => {
    if (!userAnswer.trim()) {
      triggerNotification("⚠️ Por favor, escribe una respuesta primero.");
      return;
    }
    setHasChecked(true);

    // Auto-asignar estado basado en score local
    let status = 'incorrecto';
    if (localScore >= 75) status = 'correcto';
    else if (localScore >= 40) status = 'regular';

    setSessionScores(prev => ({
      ...prev,
      [currentQuestion.id]: {
        score: localScore,
        status: status,
        userAnswer: userAnswer
      }
    }));
  };

  const setManualStatus = (status) => {
    setSessionScores(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        status: status
      }
    }));
    triggerNotification(`Actualizado a: ${status === 'correcto' ? '✅ Excelente' : status === 'regular' ? '⚠️ Regular' : '❌ Por mejorar'}`);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setHasChecked(false);
      setAiFeedback(null);
    } else {
      triggerNotification("🏆 ¡Has completado todas las preguntas!");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const pastData = sessionScores[questions[currentIndex - 1].id];
      setUserAnswer(pastData?.userAnswer || '');
      setHasChecked(!!pastData);
      setAiFeedback(null);
    }
  };

  // === CONSULTA A LA IA (GEMINI 2.5 FLASH) ===
  const handleAIEvaluation = async () => {
    setLoadingAI(true);
    setAiFeedback(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const systemPrompt = `Eres un profesor experto y ultra constructivo de Sistemas Operativos. 
    Analiza la respuesta del usuario y compárala con la respuesta correcta provista de manera conceptual y técnica. No te fijes únicamente en coincidencias literales de palabras, sino en si el usuario comprende verdaderamente el concepto.
    Debes estructurar tu respuesta de forma amigable usando EXACTAMENTE el siguiente formato JSON para tu respuesta:
    {
      "score": 85, // número de 0 a 100 de acuerdo al dominio semántico
      "positives": ["Identifica correctamente que es la capa intermedia", "Menciona el hardware"], // Lista de hasta 3 cosas que hizo bien
      "missing": ["Faltó mencionar que provee funcionalidades simples"], // Lista de hasta 3 cosas críticas que le faltaron o tiene erróneas
      "feedback": "¡Muy buen intento! Tienes clara la función general de abstracción...", // Un resumen explicativo ameno en 2 o 3 oraciones de cómo mejorar
      "tip": "Mnemotecnia: Piensa en el S.O. como un traductor que convierte el lenguaje de máquina complejo en clics y gestos fáciles para ti." // Un truco, recordatorio o mnemotecnia para memorizar este concepto.
    }`;

    const payload = {
      contents: [{
        parts: [{
          text: `Pregunta: "${currentQuestion.question}"\nRespuesta Correcta Esperada: "${currentQuestion.answer}"\nRespuesta del Estudiante: "${userAnswer}"`
        }]
      }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            score: { type: "INTEGER" },
            positives: { type: "ARRAY", items: { type: "STRING" } },
            missing: { type: "ARRAY", items: { type: "STRING" } },
            feedback: { type: "STRING" },
            tip: { type: "STRING" }
          },
          required: ["score", "positives", "missing", "feedback", "tip"]
        }
      }
    };

    // Implementación de backoff exponencial (5 reintentos)
    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return JSON.parse(text);
      } catch (err) {
        if (retries > 1) {
          await new Promise(r => setTimeout(r, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const evaluation = await fetchWithRetry();
      setAiFeedback(evaluation);
      // Actualizamos el score de la sesión con la puntuación de la IA
      setSessionScores(prev => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          score: evaluation.score,
          status: evaluation.score >= 75 ? 'correcto' : evaluation.score >= 40 ? 'regular' : 'incorrecto'
        }
      }));
    } catch (err) {
      console.error(err);
      triggerNotification("❌ Error al conectar con el servidor de evaluación.");
    } finally {
      setLoadingAI(false);
    }
  };

  // === RENDERIZADO DE COMPARACIÓN VISUAL ===
  const renderHighlightedAnswer = () => {
    const words = currentQuestion.answer.split(' ');
    return (
      <p className="leading-relaxed text-sm md:text-base">
        {words.map((word, idx) => {
          const isMatched = matchedWords.includes(cleanWord(word));
          return (
            <span 
              key={idx} 
              className={`inline-block mr-1 px-1 rounded transition-colors ${
                isMatched 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium' 
                  : 'text-zinc-300 dark:text-zinc-400'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
    );
  };

  // === ESTADÍSTICAS GLOBALES DEL TEST ===
  const stats = useMemo(() => {
    const totalAnswered = Object.keys(sessionScores).length;
    const correctCount = Object.values(sessionScores).filter(s => s.status === 'correcto').length;
    const regularCount = Object.values(sessionScores).filter(s => s.status === 'regular').length;
    const incorrectCount = Object.values(sessionScores).filter(s => s.status === 'incorrecto').length;
    const averageScore = totalAnswered > 0 
      ? Math.round(Object.values(sessionScores).reduce((sum, item) => sum + item.score, 0) / totalAnswered)
      : 0;

    return { totalAnswered, correctCount, regularCount, incorrectCount, averageScore };
  }, [sessionScores]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-800'}`}>
      
      {/* NOTIFICACIONES FLOTANTES */}
      {showNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-bounce border border-indigo-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-sm">{showNotification}</span>
        </div>
      )}

      {/* HEADER DE LA APP */}
      <header className="border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-30 bg-opacity-70 dark:bg-zinc-950/80 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Sistemas Operativos Pro
              </h1>
              <p className="text-xs text-zinc-400">Simulador de Entrenamiento y Conceptos</p>
            </div>
          </div>

          {/* MENÚ DE NAVEGACIÓN PRINCIPAL */}
          <div className="flex items-center space-x-2 bg-zinc-900/80 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button 
              onClick={() => setCurrentTab('practice')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                currentTab === 'practice' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>✍️ Modo Examen</span>
            </button>
            <button 
              onClick={() => setCurrentTab('flashcards')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                currentTab === 'flashcards' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🎴 Flashcards 3D</span>
            </button>
            <button 
              onClick={() => setCurrentTab('list')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                currentTab === 'list' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>📋 Balotario completo ({filteredQuestionsData.length})</span>
            </button>
          </div>

          {/* AJUSTES DE TEMA */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white transition-colors"
              title="Cambiar tema"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={startNewTest}
              className="px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center space-x-1"
            >
              <span>🔄 Barajar</span>
            </button>
          </div>

        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* FILTROS DE TEMAS */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-bold text-zinc-300 mb-3 flex items-center">
            <span>🏷️ Filtrar por Bloques de Temas</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {UNIQUE_CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategories(prev => 
                      isSelected 
                        ? prev.filter(c => c !== cat)
                        : [...prev, cat]
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center space-x-2 ${
                    isSelected 
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300' 
                      : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-500 bg-zinc-900'}`}>
                    {isSelected && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span>{cat}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                if (selectedCategories.length === UNIQUE_CATEGORIES.length) {
                  setSelectedCategories([]);
                } else {
                  setSelectedCategories(UNIQUE_CATEGORIES);
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors ml-2"
            >
              {selectedCategories.length === UNIQUE_CATEGORIES.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
            </button>
          </div>
          {currentTab === 'practice' && (
            <div className="mt-4 flex justify-end">
               <button
                  onClick={startNewTest}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-2"
               >
                 <span>🔄 Aplicar y Reiniciar Test</span>
               </button>
            </div>
          )}
        </div>
        
        {/* ======================================= */}
        {/* MODO PRÁCTICA / EXAMEN                  */}
        {/* ======================================= */}
        {currentTab === 'practice' && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* PANEL IZQUIERDO: SEGUIMIENTO Y TEMAS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* PANEL DE PROGRESO DE LA SESIÓN */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  <span>Tu Rendimiento</span>
                  <span className="text-xs font-normal text-zinc-500">Sesión actual</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 text-center">
                    <span className="block text-2xl font-black text-indigo-400">{stats.averageScore}%</span>
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Afinidad Promedio</span>
                  </div>
                  <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 text-center">
                    <span className="block text-2xl font-black text-white">{stats.totalAnswered} / {questions.length}</span>
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Respondidas</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Progreso total</span>
                      <span className="text-white font-bold">{Math.round((stats.totalAnswered / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-2.5 overflow-hidden border border-zinc-800">
                      <div 
                        className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${(stats.totalAnswered / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-800/60">
                    <span className="flex items-center text-emerald-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block mr-1.5"></span>
                      Excelente: {stats.correctCount}
                    </span>
                    <span className="flex items-center text-amber-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block mr-1.5"></span>
                      Regular: {stats.regularCount}
                    </span>
                    <span className="flex items-center text-rose-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block mr-1.5"></span>
                      Por mejorar: {stats.incorrectCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* LISTA DE PREGUNTAS DEL TEST */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 max-h-[450px] overflow-y-auto">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">Navegación del Test</h4>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => {
                    const progress = sessionScores[q.id];
                    let borderClass = "border-zinc-800";
                    let bgClass = "bg-zinc-900 hover:bg-zinc-800 text-zinc-400";
                    
                    if (currentIndex === index) {
                      borderClass = "ring-2 ring-indigo-500 border-transparent";
                    }

                    if (progress) {
                      if (progress.status === 'correcto') bgClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/40";
                      else if (progress.status === 'regular') bgClass = "bg-amber-500/15 text-amber-400 border-amber-500/40";
                      else bgClass = "bg-rose-500/15 text-rose-400 border-rose-500/40";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentIndex(index);
                          const pastData = sessionScores[q.id];
                          setUserAnswer(pastData?.userAnswer || '');
                          setHasChecked(!!pastData);
                          setAiFeedback(null);
                        }}
                        className={`py-2 rounded-xl text-center text-sm font-bold border ${borderClass} ${bgClass} transition-all`}
                        title={`Pregunta: ${q.question}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* PANEL DERECHO: INTERFAZ DE ENTRADA Y COMPARACIÓN */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TARJETA DE LA PREGUNTA */}
              <div className="bg-linear-to-b from-zinc-900 to-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                
                {/* Categoría superior */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20 uppercase tracking-wider">
                    📌 {currentQuestion.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    ID original #{currentQuestion.id}
                  </span>
                </div>

                {/* Pregunta */}
                <h2 className="text-xl md:text-2xl font-bold leading-snug text-white mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Área de respuesta del usuario */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Tu Respuesta por Teclado:
                  </label>
                  <textarea
                    disabled={hasChecked}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Escribe tu definición aquí... Procura mencionar las palabras y conceptos técnicos clave."
                    className="w-full min-h-[120px] p-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-zinc-600 leading-relaxed text-sm md:text-base resize-y"
                  ></textarea>
                </div>

                {/* Botones de control primarios */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={handlePrev}
                      className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 rounded-xl transition-all text-zinc-400 hover:text-white"
                      title="Pregunta anterior"
                    >
                      ◀️
                    </button>
                    <span className="text-sm text-zinc-500 font-medium">
                      Pregunta {currentIndex + 1} de {questions.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 rounded-xl transition-all text-zinc-400 hover:text-white"
                      title="Siguiente pregunta"
                    >
                      ▶️
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    {!hasChecked ? (
                      <button
                        onClick={handleCheck}
                        className="w-full sm:w-auto px-6 py-3.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        🔍 Verificar mi respuesta
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setHasChecked(false);
                          setAiFeedback(null);
                        }}
                        className="w-full sm:w-auto px-5 py-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 rounded-xl text-sm text-zinc-300 font-bold transition-all"
                      >
                        ✏️ Volver a editar
                      </button>
                    )}
                  </div>

                </div>

              </div>

              {/* SECCIÓN DE EVALUACIÓN Y FEEDBACK COMPARATIVO */}
              {hasChecked && (
                <div className="space-y-6 animate-fadeIn">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* FEEDBACK LOCAL Y COINCIDENCIAS */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-md font-bold text-white flex items-center">
                            🎯 Comparación de Texto
                          </h3>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                            localScore >= 75 ? 'bg-emerald-500/10 text-emerald-400' :
                            localScore >= 40 ? 'bg-amber-500/10 text-amber-400' :
                            'bg-rose-500/10 text-rose-400'
                          }`}>
                            Score: {localScore}%
                          </span>
                        </div>

                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm leading-relaxed max-h-[220px] overflow-y-auto mb-4">
                          <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Tu respuesta:</span>
                          <p className="text-zinc-300 italic">"{userAnswer}"</p>
                        </div>

                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm leading-relaxed max-h-[220px] overflow-y-auto">
                          <span className="block text-[10px] uppercase font-bold text-emerald-500 mb-1">
                            Sugerido por el Profesor (Coincidencias en Verde):
                          </span>
                          {renderHighlightedAnswer()}
                        </div>
                      </div>

                      {/* Ajuste manual por sinónimos */}
                      <div className="mt-4 pt-4 border-t border-zinc-800/80">
                        <span className="block text-xs text-zinc-400 font-bold mb-2">
                          ¿El algoritmo automático fue muy estricto? Modifica tu estado:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => setManualStatus('correcto')}
                            className="px-2 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/25 transition-all"
                          >
                            Lo hice excelente
                          </button>
                          <button
                            onClick={() => setManualStatus('regular')}
                            className="px-2 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/25 transition-all"
                          >
                            Regular
                          </button>
                          <button
                            onClick={() => setManualStatus('incorrecto')}
                            className="px-2 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold border border-rose-500/25 transition-all"
                          >
                            Repasaré más
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* SECCIÓN ESPECIAL: EVALUACIÓN CON INTELIGENCIA ARTIFICIAL */}
                    <div className="bg-linear-to-br from-indigo-950/20 via-purple-950/10 to-zinc-900 border border-indigo-900/35 rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-md font-bold text-indigo-300 flex items-center space-x-1.5">
                            <span>✨ Feedback con IA (Gemini)</span>
                          </h3>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded px-2 py-0.5 font-bold uppercase tracking-wider">
                            Recomendado
                          </span>
                        </div>

                        {!aiFeedback && !loadingAI && (
                          <div className="text-center py-10 space-y-4">
                            <p className="text-sm text-zinc-400">
                              Obtén una evaluación detallada semántica hecha por inteligencia artificial para ver si comprendiste de fondo la teoría.
                            </p>
                            <button
                              onClick={handleAIEvaluation}
                              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                            >
                              ⚡ Evaluar respuesta con IA
                            </button>
                          </div>
                        )}

                        {loadingAI && (
                          <div className="text-center py-12 space-y-4">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-sm text-zinc-400 font-medium">
                              Gemini está analizando la precisión técnica de tu respuesta...
                            </p>
                          </div>
                        )}

                        {aiFeedback && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-400">Puntaje Semántico de la IA:</span>
                              <span className="text-xl font-black text-indigo-400">{aiFeedback.score} / 100</span>
                            </div>

                            {/* Puntos correctos */}
                            {aiFeedback.positives?.length > 0 && (
                              <div className="bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/20">
                                <span className="block text-xs font-bold text-emerald-400 mb-1">🌟 Lo que hiciste excelente:</span>
                                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-0.5">
                                  {aiFeedback.positives.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                              </div>
                            )}

                            {/* Puntos faltantes */}
                            {aiFeedback.missing?.length > 0 && (
                              <div className="bg-rose-500/5 p-3.5 rounded-xl border border-rose-500/20">
                                <span className="block text-xs font-bold text-rose-400 mb-1">⚠️ Lo que faltó o debió aclararse:</span>
                                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-0.5">
                                  {aiFeedback.missing.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                              </div>
                            )}

                            {/* Comentarios generales de la IA */}
                            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs leading-relaxed text-zinc-300">
                              <span className="block text-indigo-400 font-bold mb-1">Profesor Gemini dice:</span>
                              <p className="italic">"{aiFeedback.feedback}"</p>
                            </div>

                          </div>
                        )}
                      </div>

                      {aiFeedback && aiFeedback.tip && (
                        <div className="mt-4 pt-4 border-t border-zinc-800 bg-indigo-500/5 -mx-6 -mb-6 p-6 rounded-b-3xl">
                          <span className="block text-xs font-bold text-indigo-300 mb-1">💡 Tip Mnemotécnico para el Examen:</span>
                          <p className="text-xs text-zinc-300 italic">{aiFeedback.tip}</p>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* MODO FLASHCARDS                         */}
        {/* ======================================= */}
        {currentTab === 'flashcards' && filteredQuestionsData.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            Selecciona al menos un bloque de temas para ver las flashcards.
          </div>
        )}
        {currentTab === 'flashcards' && filteredQuestionsData.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-8 py-4">
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">🎴 Modo Tarjetas Flashcard 3D</h2>
              <p className="text-sm text-zinc-400">Estudia los conceptos y dales la vuelta para comprobar tu conocimiento antes de dar el examen.</p>
            </div>

            {/* Tarjeta con efecto 3D */}
            <div 
              onClick={() => setFlipped(!flipped)}
              className="relative w-full h-[320px] cursor-pointer group perspective-[1000px]"
            >
              <div className={`relative w-full h-full duration-700 transform-3d ${flipped ? 'transform-[rotateY(180deg)]' : ''}`}>
                
                {/* LADO A: PREGUNTA */}
                <div className="absolute w-full h-full p-8 rounded-3xl bg-zinc-900 border-2 border-zinc-800 flex flex-col justify-between backface-hidden">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20 uppercase tracking-wider">
                      🎯 {filteredQuestionsData[flashcardIndex]?.category}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Pregunta {flashcardIndex + 1} de {filteredQuestionsData.length}</span>
                  </div>

                  <div className="text-center my-auto space-y-4">
                    <h3 className="text-xl md:text-2xl font-black leading-snug text-white">
                      {filteredQuestionsData[flashcardIndex]?.question}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest animate-pulse">
                      Pulse la tarjeta para dar la vuelta 🔄
                    </p>
                  </div>

                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-1.5 rounded-full" 
                      style={{ width: `${((flashcardIndex + 1) / filteredQuestionsData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* LADO B: RESPUESTA */}
                <div className="absolute w-full h-full p-8 rounded-3xl bg-linear-to-br from-indigo-950 via-zinc-900 to-zinc-950 border-2 border-indigo-500 flex flex-col justify-between backface-hidden transform-[rotateY(180deg)]">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20 uppercase tracking-wider">
                      💡 Solución correcta
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">Pregunta {flashcardIndex + 1} de {filteredQuestionsData.length}</span>
                  </div>

                  <div className="text-center my-auto px-2">
                    <p className="text-sm md:text-base leading-relaxed text-zinc-100 font-medium">
                      {filteredQuestionsData[flashcardIndex]?.answer}
                    </p>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center uppercase tracking-wider">
                    Pulse la tarjeta para ver de nuevo la pregunta 🔄
                  </p>
                </div>

              </div>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setFlipped(false);
                  setFlashcardIndex(prev => (prev === 0 ? filteredQuestionsData.length - 1 : prev - 1));
                }}
                className="px-5 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl font-bold transition-all"
              >
                ◀️ Anterior
              </button>
              
              <button
                onClick={() => {
                  setFlipped(false);
                  // Mezclar una aleatoria
                  const randomIndex = Math.floor(Math.random() * filteredQuestionsData.length);
                  setFlashcardIndex(randomIndex);
                  triggerNotification("🎲 Tarjeta aleatoria seleccionada");
                }}
                className="px-5 py-3 bg-indigo-600/15 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 rounded-xl font-bold transition-all"
              >
                🎲 Tarjeta Aleatoria
              </button>

              <button
                onClick={() => {
                  setFlipped(false);
                  setFlashcardIndex(prev => (prev === filteredQuestionsData.length - 1 ? 0 : prev + 1));
                }}
                className="px-5 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl font-bold transition-all"
              >
                Siguiente ▶️
              </button>
            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* BALOTARIO COMPLETO                      */}
        {/* ======================================= */}
        {currentTab === 'list' && filteredQuestionsData.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            Selecciona al menos un bloque de temas para ver el balotario.
          </div>
        )}
        {currentTab === 'list' && filteredQuestionsData.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">📋 Balotario Oficial Completo de Sistemas Operativos</h2>
              <p className="text-sm text-zinc-400">Estudia de forma estática todas tus preguntas con respuestas estructuradas.</p>
            </div>

            {/* Clasificación en módulos */}
            {UNIQUE_CATEGORIES.map((category) => {
              if (!selectedCategories.includes(category)) return null;
              const matchedQuestions = filteredQuestionsData.filter(q => q.category === category);
              if (matchedQuestions.length === 0) return null;
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-black text-indigo-400 border-b border-zinc-800 pb-2 flex items-center space-x-2">
                    <span>📌 {category}</span>
                    <span className="text-xs font-normal text-zinc-500">({matchedQuestions.length} preguntas)</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedQuestions.map((q) => (
                      <div key={q.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-700/80 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Pregunta #{q.id}</span>
                          <button
                            onClick={() => {
                              // Ir directamente a practicar esta pregunta
                              const targetIndex = questions.findIndex(item => item.id === q.id);
                              if (targetIndex !== -1) {
                                setCurrentIndex(targetIndex);
                                setCurrentTab('practice');
                                setUserAnswer('');
                                setHasChecked(false);
                                setAiFeedback(null);
                                triggerNotification(`✍️ Listo para practicar la Pregunta #${q.id}`);
                              }
                            }}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
                          >
                            Entrenar esta pregunta →
                          </button>
                        </div>
                        <h4 className="text-md font-bold text-white mb-2">{q.question}</h4>
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/60 mt-3 text-sm leading-relaxed text-zinc-300">
                          <span className="block text-[10px] uppercase font-bold text-emerald-500 mb-1">RPTA Oficial:</span>
                          {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <p className="text-xs text-zinc-500">
            Simulador de Examen de Sistemas Operativos — Desarrollado para el repaso dinámico y la asimilación conceptual.
          </p>
          <div className="flex justify-center space-x-4 text-xs text-indigo-400/80">
            <span>Conceptos clave: IPC, File System, Virtualización, Gestión de E/S, Seguridad y SO Distribuidos.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}