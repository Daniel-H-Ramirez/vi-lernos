import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip
} from '@mui/material';
import { School, AccessTime } from '@mui/icons-material';

const Home = ({ user, recommendedCourses }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {`Bienvenido${user && user.gender === 'female' ? 'a' : ''}, ${user ? user.name : 'Estudiante'}`}
      </Typography>
      <Typography variant="body1" paragraph>
        Tu plataforma educativa inteligente con recomendaciones personalizadas.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Cursos Recomendados para Ti
      </Typography>
      
      <Grid container spacing={3}>
        {recommendedCourses.slice(0, 3).map((course) => (
          <Grid size={{ xs: 12, md: 4 }} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">
                    {course.duration} horas
                  </Typography>
                </Box>
                <Chip 
                  icon={<School />} 
                  label={course.level} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Ver Curso
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Tu Progreso
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Cursos Completados
              </Typography>
              <Typography variant="h4">
                {user ? user.completedCourses : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Horas de Estudio
              </Typography>
              <Typography variant="h4">
                {user ? user.hoursStudied : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Logros
              </Typography>
              <Typography variant="h4">
                {user ? user.achievements : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;