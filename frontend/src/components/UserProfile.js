import React from 'react';
import { updateUserData } from '../services/api';

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Avatar,
  Divider
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const UserProfile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState(user);

  const handleSave = async () => {
  try {
    const updatedUser = await updateUserData(user.id, {
      name: editedUser.name,
      email: editedUser.email,
      academicLevel: editedUser.academicLevel,
      interests: editedUser.interests,
      gender: editedUser.gender
    });
    
    setUser(updatedUser);
    setIsEditing(false);
  } catch (error) {
    console.error('Error saving user data:', error);
    // Puedes mostrar un mensaje de error al usuario
  }
};

  const handleChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Mi Perfil
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto 16px' }}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Nivel: {user.academicLevel}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Información Personal</Typography>
                {isEditing ? (
                  <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave}>
                    Guardar
                  </Button>
                ) : (
                  <Button startIcon={<EditIcon />} variant="outlined" onClick={() => setIsEditing(true)}>
                    Editar
                  </Button>
                )}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre"
                    value={isEditing ? editedUser.name : user.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nivel Académico"
                    value={isEditing ? editedUser.academicLevel : user.academicLevel}
                    onChange={(e) => handleChange('academicLevel', e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Intereses"
                    value={isEditing ? editedUser.interests.join(', ') : user.interests.join(', ')}
                    onChange={(e) => handleChange('interests', e.target.value.split(',').map(i => i.trim()))}
                    fullWidth
                    disabled={!isEditing}
                    helperText="Separa los intereses con comas"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
