require('dotenv').config();
const {createServer} = require('http')



module.exports = async (app) => {
  try{
    const httpServer = createServer(app)
    require('../websockets')(httpServer)
    await require('../database/connection')()
    const PORT = process.env.PORT || 5001;
    httpServer.listen(PORT, () => console.log(`Running on ${PORT}`));
  }catch(error){
    console.log(error);
  }
}
