// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Alert
} from '@mui/material';
import {
  Home as HomeIcon,
  School as CourseIcon,
  Chat as ChatIcon,
  Person as ProfileIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Componentes de la aplicación
import Home from './components/Home';
import CourseCatalog from './components/CourseCatalog';
import Recommendations from './components/Recommendations';
import RealTimeChat from './components/RealTimeChat';
import UserProfile from './components/UserProfile';
import SearchBar from './components/SearchBar';

// Servicios (simulados para este ejemplo)
import { 
  getUserData, 
  getRecommendedCourses, 
  getAllCourses, 
  searchCourses,
  simulateRealTimeNotification 
} from './services/api';

// Crear tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos del usuario y cursos al iniciar
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await getUserData();
      setUser(userData);
      
      const recommended = await getRecommendedCourses(userData.id);
      setRecommendedCourses(recommended);
      
      const courses = await getAllCourses();
      setAllCourses(courses);
      
    } catch (err) {
      setError('Error cargando datos. Algunas funciones pueden estar limitadas.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  loadData();

    // Simular notificaciones en tiempo real
    const notificationInterval = setInterval(() => {
      const newNotification = simulateRealTimeNotification();
      if (newNotification) {
        setNotification(newNotification);
        setTimeout(() => setNotification(null), 5000);
      }
    }, 15000);

    return () => clearInterval(notificationInterval);
  }, []);

  const handleSearch = async (query) => {
    try {
      const results = await searchCourses(query);
      setAllCourses(results);
      setCurrentPage('courses');
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} recommendedCourses={recommendedCourses} />;
      case 'courses':
        return <CourseCatalog courses={allCourses} />;
      case 'recommendations':
        return <Recommendations courses={recommendedCourses} />;
      case 'chat':
        return <RealTimeChat user={user} />;
      case 'profile':
        return <UserProfile user={user} setUser={setUser} />;
      default:
        return <Home user={user} recommendedCourses={recommendedCourses} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1, pb: 7 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Vi Lernos
              </Typography>
              <SearchBar onSearch={handleSearch} />
            </Toolbar>
          </AppBar>

          {notification && (
            <Alert severity="info" sx={{ mt: 2, mx: 2 }}>
              {notification}
            </Alert>
          )}
          {loading && (
            <Alert severity="info" sx={{ mt: 2, mx: 2 }}>
              Cargando datos...
            </Alert>
          )}

          {error && (
            <Alert severity="warning" sx={{ mt: 2, mx: 2 }}>
              {error}
            </Alert>
          )}
          
          <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              {renderContent()}
            </Paper>
          </Container>

          <BottomNavigation
            showLabels
            value={currentPage}
            onChange={(event, newValue) => {
              setCurrentPage(newValue);
            }}
            sx={{ 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0,
              bgcolor: 'background.paper',
              boxShadow: 3
            }}
          >
            <BottomNavigationAction label="Inicio" value="home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Cursos" value="courses" icon={<CourseIcon />} />
            <BottomNavigationAction label="Recomendaciones" value="recommendations" icon={<SearchIcon />} />
            <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
            <BottomNavigationAction label="Perfil" value="profile" icon={<ProfileIcon />} />
          </BottomNavigation>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;