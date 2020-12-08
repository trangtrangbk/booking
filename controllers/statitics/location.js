
const { InternalServerError } = require("../../utils/ResponseHelper");
const Hotel = require("../../models/hotel");
const get = async (req, res) => {
  try {
    const hotels = await Hotel.countDocuments();
    const groupHotel = await Hotel.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
    ])
    groupHotel.sort((a,b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0)); 
   
   if(groupHotel.length <=3){
     const result = groupHotel.map(hotel =>{
       return {name : hotel._id, percent : (hotel.count*100/hotels).toFixed(1)}
     })
    res.send({result})
   }
   else {
    const result = [];
    let remain = hotels
    if(groupHotel[0]){
      result.push({name : groupHotel[0]._id, percent : (groupHotel[0].count*100/hotels).toFixed(1)})
      remain -=groupHotel[0].count
    }
    if(groupHotel[1]){
      result.push({name : groupHotel[1]._id, percent : (groupHotel[1].count*100/hotels).toFixed(1)})
      remain -=groupHotel[1].count

    }
    if(groupHotel[2]){
      result.push({name : groupHotel[2]._id, percent : (groupHotel[2].count*100/hotels).toFixed(1)})
      remain -=groupHotel[2].count
    }
    result.push({name : "other", percent : (remain*100/hotels).toFixed(1)})
    res.send({result})
   }
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
