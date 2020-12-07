const Reservation = require("../models/reservation");

const countNewsByMonth = async (hotelId) => {
  let arrData = await getYear();
  for (let j = 0; j < arrData.length; j++) {
    let arr = [];
    for (let i = 1; i < 13; i++) {
      let dateG, dateL;
      dateG = setTimes(1, i, arrData[j].year);
      if (i == 12) {
        dateL = setTimes(1, i + 1, arrData[j].year + 1);
      } else {
        dateL = setTimes(1, i + 1, arrData[j].year);
      }

      let query = {
        hotelId,
        createdAt: {
          $gte: dateG,
          $lt: dateL,
        },
      };
      const totalNewsByMonth = Math.ceil(await Reservation.countDocuments(query));
      arr.push(totalNewsByMonth);
    }
    arrData[j].data = arr;
  }

  return arrData;
};

const getYear = async () => {
  reservations = await Reservation.find();
  arr = [];
  for (let i = 0; i < reservations.length; i++) {
    const a = reservations[i].createdAt;
    const b = a.getFullYear();
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].year == b) check = false;
    }
    if (check) arr = [...arr, { year: b, data: [] }];
  }
  return arr;
};

const setTimes = (day, month, year) => {
  let date = new Date();
  date.setDate(day);
  date.setMonth(month - 1);
  date.setFullYear(year);
  date.setHours(7);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

module.exports = {
  countNewsByMonth,
};
