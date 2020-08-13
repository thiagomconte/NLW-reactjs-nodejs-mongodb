const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/NLW',{useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connection stablished');
}).catch((err)=>{
    console.log(err);
})

module.exports = {mongoose}