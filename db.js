const mongoose = require('mongoose');

const db = () => {
  mongoose.connect('mongodb+srv://Satwik:Satwik@facedetection.oemio.mongodb.net/userinfo?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false })
  .then(console.log('Database connected'))
  .catch(err => console.log(err + '\n\nDatabase Error brooo'))}

  module.exports = db;
