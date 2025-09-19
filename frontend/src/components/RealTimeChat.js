// components/RealTimeChat.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Divider
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Simulación de servicio de chat en tiempo real
const chatService = {
  messages: [
    { id: 1, user: "Tutor Carlos", text: "¡Hola! ¿En qué puedo ayudarte hoy?", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, user: "María López", text: "Tengo una duda sobre el ejercicio de matemáticas", timestamp: new Date(Date.now() - 3500000) },
    { id: 3, user: "Tutor Carlos", text: "Claro, dime específicamente qué no entiendes", timestamp: new Date(Date.now() - 3400000) },
  ],
  
  subscribe(callback) {
    this.callback = callback;
  },
  
  sendMessage(message) {
    const newMessage = {
      id: this.messages.length + 1,
      user: "Tú",
      text: message,
      timestamp: new Date()
    };
    this.messages.push(newMessage);
    this.callback(newMessage);
    
    // Simular respuesta automática después de un tiempo
    setTimeout(() => {
      const responses = [
        "Entiendo tu pregunta, déjame explicarte...",
        "Buena pregunta! Veamos cómo resolverlo...",
        "Claro, ese concepto puede ser confuso al principio.",
        "¿Has intentado revisar el material adicional del curso?"
      ];
      const botMessage = {
        id: this.messages.length + 1,
        user: "Tutor IA",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      this.messages.push(botMessage);
      this.callback(botMessage);
    }, 2000);
  }
};

const RealTimeChat = ({ user }) => {
  const [messages, setMessages] = useState(chatService.messages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    chatService.subscribe((message) => {
      setMessages([...chatService.messages]);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      chatService.sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Chat en Tiempo Real
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Conecta con tutores y otros estudiantes para resolver dudas y colaborar en tiempo real.
      </Typography>

      <Paper variant="outlined" sx={{ height: '400px', overflow: 'auto', p: 2, mb: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" component="span">
                      {message.user}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {message.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          sx={{ ml: 1 }}
        >
          Enviar
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Salas de Estudio Disponibles
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {['Matemáticas Avanzadas', 'Programación Python', 'Historia Universal', 'Ciencias Biológicas'].map((room) => (
          <Button key={room} variant="outlined">
            Unirse a {room}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default RealTimeChat;
