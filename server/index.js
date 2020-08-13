//Dependências
const express = require('express');
const cors = require('cors');

//banco de dados
require('./database/db');

const app = express();

//configurações
app.use(express.json());
app.use(cors());

//routes
app.use('/classes', require('./routes/classRouter'));
app.use('/connections', require('./routes/connectionRouter'));

const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});