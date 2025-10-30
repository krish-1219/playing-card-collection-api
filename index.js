const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store playing cards
let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Diamonds', value: 'K' }
];

// Counter for generating unique IDs
let nextId = 3;

// GET /cards - Retrieve all playing cards
app.get('/cards', (req, res) => {
  res.json({
    success: true,
    data: cards,
    count: cards.length
  });
});

// GET /cards/:id - Retrieve a specific card by ID
app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);
  
  if (!card) {
    return res.status(404).json({
      success: false,
      message: `Card with ID ${cardId} not found`
    });
  }
  
  res.json({
    success: true,
    data: card
  });
});

// POST /cards - Add a new playing card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  
  // Validation
  if (!suit || !value) {
    return res.status(400).json({
      success: false,
      message: 'Both suit and value are required'
    });
  }
  
  // Create new card
  const newCard = {
    id: nextId++,
    suit,
    value
  };
  
  cards.push(newCard);
  
  res.status(201).json({
    success: true,
    message: 'Card added successfully',
    data: newCard
  });
});

// DELETE /cards/:id - Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex(c => c.id === cardId);
  
  if (cardIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Card with ID ${cardId} not found`
    });
  }
  
  const deletedCard = cards.splice(cardIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Card deleted successfully',
    data: deletedCard
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Playing Card Collection API is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /cards      - Get all cards');
  console.log('  GET    /cards/:id  - Get card by ID');
  console.log('  POST   /cards      - Add a new card');
  console.log('  DELETE /cards/:id  - Delete card by ID');
});
