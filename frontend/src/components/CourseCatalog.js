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
import { School, AccessTime } from '@mui/icons-material';

const CourseCatalog = ({ courses }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Catálogo de Cursos
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Explora todos los cursos disponibles de diferentes plataformas.
      </Typography>
      
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, md: 6 }} key={course.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={course.rating} readOnly precision={0.1} size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {course.rating}
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">
                  Proveedor: {course.provider}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Ver Detalles
                </Button>
                <Button size="small" color="secondary">
                  Inscribirse
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseCatalog;
