import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Rating
} from '@mui/material';
import { School, AccessTime, TrendingUp } from '@mui/icons-material';

const Recommendations = ({ courses }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        <TrendingUp sx={{ mr: 1, verticalAlign: 'bottom' }} />
        Recomendaciones Personalizadas
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Cursos seleccionados especialmente para ti basados en tus intereses y progreso.
      </Typography>
      
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', border: 2, borderColor: 'primary.main' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6">
                    {course.title}
                  </Typography>
                  <Chip label="Recomendado" color="primary" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {course.duration} horas
                  </Typography>
                  <Chip 
                    icon={<School />} 
                    label={course.level} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Rating value={course.rating} readOnly precision={0.1} />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  Empezar Curso
                </Button>
                <Button size="small" color="secondary">
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recommendations;
