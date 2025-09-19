// services/api.js - Versión REAL que conecta con backend Python
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Función para hacer requests con manejo de errores
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Puedes manejar esto de forma más elegante si prefieres
  }
};

// Obtener datos del usuario
export const getUserData = async (userId = '1') => {
  try {
    return await fetchData(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.warn('Using fallback user data due to API error');
    // Datos de ejemplo como fallback (opcional)
    return {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@example.com",
      gender: "female",
      academicLevel: "Universidad",
      interests: ["Matemáticas", "Programación", "Ciencias"],
      completedCourses: 5,
      hoursStudied: 42,
      achievements: 3
    };
  }
};

// Obtener cursos recomendados
export const getRecommendedCourses = async (userId) => {
  try {
    return await fetchData(`${API_BASE_URL}/recommendations/${userId}?max_recommendations=4`);
  } catch (error) {
    console.warn('Using fallback recommended courses due to API error');
    return [
      {
        id: "1",
        title: "Introducción a Python",
        description: "Aprende los fundamentos de la programación con Python.",
        duration: 12,
        level: "Principiante",
        rating: 4.7,
        provider: "Coursera"
      },
      {
        id: "2",
        title: "Cálculo Diferencial",
        description: "Domina los conceptos básicos del cálculo diferencial.",
        duration: 15,
        level: "Intermedio",
        rating: 4.5,
        provider: "edX"
      }
    ];
  }
};

// Obtener todos los cursos
export const getAllCourses = async () => {
  try {
    return await fetchData(`${API_BASE_URL}/courses`);
  } catch (error) {
    console.warn('Using fallback courses due to API error');
    return [
        {
        id: "1",
        title: "Introducción a Python",
        description: "Aprende los fundamentos de la programación con Python.",
        duration: 12,
        level: "Principiante",
        rating: 4.7,
        provider: "Coursera"
        },
        {
          id: 2,
          title: "Cálculo Diferencial",
          description: "Domina los conceptos básicos del cálculo diferencial.",
          duration: 15,
          level: "Intermedio",
          rating: 4.5,
          provider: "edX"
        },
        {
          id: 3,
          title: "Machine Learning Básico",
          description: "Introducción a los algoritmos de aprendizaje automático.",
          duration: 20,
          level: "Avanzado",
          rating: 4.8,
          provider: "Udacity"
        },
        {
          id: 4,
          title: "Historia del Arte Moderno",
          description: "Explora los movimientos artísticos del siglo XX.",
          duration: 10,
          level: "Intermedio",
          rating: 4.3,
          provider: "Khan Academy"
        },
        {
          id: 5,
          title: "Fundamentos de Bases de Datos",
          description: "Aprende diseño e implementación de bases de datos.",
          duration: 14,
          level: "Intermedio",
          rating: 4.6,
          provider: "Coursera"
        },
        {
          id: 6,
          title: "Química Orgánica",
          description: "Estudio de los compuestos del carbono y sus reacciones.",
          duration: 18,
          level: "Avanzado",
          rating: 4.4,
          provider: "edX"
        }
];
  }
};

// Buscar cursos
export const searchCourses = async (query) => {
  try {
    return await fetchData(`${API_BASE_URL}/courses/search?q=${encodeURIComponent(query)}`);
  } catch (error) {
    console.warn('Search API not available, using client-side search');
    // Búsqueda local como fallback
    const allCourses = await getAllCourses();
    return allCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.provider.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Actualizar datos del usuario
export const updateUserData = async (userId, userData) => {
  try {
    return await fetchData(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Simular notificaciones (puede conectarse a WebSockets después)
export const simulateRealTimeNotification = () => {
  const notifications = [
    "Nuevo curso disponible: Inteligencia Artificial Avanzada",
    "Tutor disponible en la sala de Matemáticas",
    "Tu curso de Python ha sido actualizado con nuevo contenido",
    "Recordatorio: Tu sesión de tutoría comienza en 15 minutos",
    "Logro desbloqueado: 10 horas de estudio completadas"
  ];
  
  if (Math.random() < 0.3) {
    return notifications[Math.floor(Math.random() * notifications.length)];
  }
  
  return null;
};