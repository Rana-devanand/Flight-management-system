const filterFlight = async (req, res , next) => {
   const {Departure , Arrival , Date} = await req.query;
   
          if(!Departure || !Arrival  || !Date){
               if(!Departure){
                    return res.status(203).json({
                         message: 'Departure City is required',
                         success: false,
                         error: {}
                    })
               }
               if(!Arrival){
                    return res.status(203).json({
                         message: 'Arrival City is required',
                         success: false,
                         error: {}
                    })
               }
               if(!Date){
                    return res.status(203).json({
                         message: 'Date is required',
                         success: false,
                         error: {}
                    })
               }
          }
    
          next();
}    

module.exports = {
     filterFlight
}