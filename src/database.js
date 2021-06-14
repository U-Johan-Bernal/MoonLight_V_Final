const mongoose=require ('mongoose');
// Contraseña: Rz61DlHtyOmKJwhU
const link = 'mongodb+srv://admin:Rz61DlHtyOmKJwhU@moonlight.uzqyt.mongodb.net/productosmoon?retryWrites=true&w=majority';
mongoose.connect(link,{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(db=>console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;