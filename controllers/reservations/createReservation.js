const { insertReservation } = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const moment = require("moment");
const sendMail = require("../../services/mailService").sendMail;

const create = async (req, res) => {
  // const bodyData = req.body;
  const reservation = req.body;
  if (!reservation) return BadRequest(res, "invalid data");
  try {
    const result = await insertReservation({
      ...reservation,
      checkIn: moment(reservation.checkIn, "DD/MM/YYYY").toDate(),
      checkOut: moment(reservation.checkOut, "DD/MM/YYYY").toDate(),
      email: reservation.infor.email,
      phone: reservation.infor.phone,
      note: reservation.infor.note,
      name: reservation.infor.name,
      address: reservation.infor.address,
      status: "waiting",
      hotelId: reservation.hotel._id,
      roomId: reservation.room._id,
    });
    const subject = "Your reservation has been send to hotel manager";
    const text =
      "Thanks for using our hotel reservation system.The manager will confirm your reservation soon.";
    const html = `<p style="font-size: 16px">Thanks for using our hotel reservation system.The manager will confirm your reservation soon.</p>
    <div style="max-width:1000px;border: 1px solid #E0E7FF;
    padding: 30px;margin: 50px auto 10px auto;">
          <div style="width: 100%;
          display: flex;
          flex-wrap: wrap;">
            <div style="flex: 0 0 41.66667%;
            max-width: 41.666667%;padding-right: 18px;
            padding-left: 18px;-webkit-box-flex: 0;
            position: relative;    width: 100%;
            min-height: 1px;">
              <img src=${reservation.room.image[0]} width="100%" />
            </div>
            <div style="webkit-box-flex: 0;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 18px;
            padding-left: 18px;flex: 0 0 58.33333%;
            max-width: 58.333333%;">
              <div style="border-bottom: 1px solid #E0E7FF;padding-bottom:20px;">
                <div style="font-weight: 600;
                color: #0f4673;
                font-size: 25px;
                line-height: 25px;
                padding-bottom: 20px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                ">
                  ${reservation.hotel.name}
                </div>
                <div style="width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;">
                    <span>${reservation.hotel.city}</span>
                  <span style="color: #00b4b7;
                  margin-left: 50px;
                  font-weight: 600;">
                    code : ${reservation.code}
                  </span>
                </div>
                <div style="width: 100%;
                display: flex;
                flex-wrap: wrap;
            ">
                  ${reservation.hotel.address}
                </div>
              </div>
              <div
               style="border-bottom: 1px solid #E0E7FF;padding-top: 20px;
               padding-bottom: 20px;width: 100%;
               display: flex;
               flex-wrap: wrap;"
              >
                <label style="margin-right:25px;color: black;
                font-weight: 600;">Room</label>
                <span>${reservation.room.name}</span>
              </div>
              <div
              style="border-bottom: 1px solid #E0E7FF;padding-top: 20px;
              padding-bottom: 20px;width: 100%;
              display: flex;
              flex-wrap: wrap;"
              >
                <div style="-webkit-box-flex: 0;
                position: relative;
                width: 100%;
                min-height: 1px;
                flex: 0 0 33.3333%;
    max-width: 33.3333%;
    ">
                  <div style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;">
                    <label style="color: black;
                    font-weight: 600;">Check-In</label>
                  </div>
                  <div style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;">
                    <span>${reservation.checkIn}</span>
                  </div>
                </div>
                <div style="-webkit-box-flex: 0;
                position: relative;
                width: 100%;
                min-height: 1px;
                flex: 0 0 33.3333%;
    max-width: 33.3333%;
    ">
                  <div  style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  "
                  >
                    <span>
                      ${reservation.diffDays}
                      ${reservation.diffDays > 1 ? "days" : "day"}
                    </span>
                  </div>
                </div>
                <div style="-webkit-box-flex: 0;
                position: relative;
                width: 100%;
                min-height: 1px;
                flex: 0 0 33.3333%;
    max-width: 33.3333%;
    ">
                  <div style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: flex-end;
                  ">
                    <label style="color: black;
                    font-weight: 600;">Check-Out</label>
                  </div>
                  <div style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: flex-end;
                  ">
                    <span>${reservation.checkOut}</span>
                  </div>
                </div>
              </div>
              <div style="width: 100%;
              display: flex;
              flex-wrap: wrap;
              padding-top: 20px
              ">
                <div style="-webkit-box-flex: 0;
                position: relative;
                width: 100%;
                min-height: 1px;
                flex: 0 0 50%;
    max-width: 50%;
                ">
                  <label style="padidng-right: 20px;color: black;
                  font-weight: 600;">Cost</label>
                  <span style=" color: #f52200;">$${reservation.cost}</span>
                </div>
                <div  style="-webkit-box-flex: 0;
                position: relative;
                width: 100%;
                min-height: 1px;
                flex: 0 0 50%;
    max-width: 50%;
    justify-content: flex-end;
    >
                  <label style="margin-right:20px;color: black;
                  font-weight: 600;">Guests</label>
                  <span>
                    ${reservation.guests.adult}
                    ${reservation.guests.adult > 1 ? "Adults" : "Adult"} -
                    ${reservation.guests.children} Children
                  </span>
                </div>
              </div>
            </div>
          </div>
            <div
              style="
          display: flex;
              margin: 40px 0px 20px 15px;
              width: 100%;
              color: black;
    font-weight: 600;
              padding-bottom: 20px;
              border-bottom: 1px solid #E0E7FF
              "
            >
              Your information
            </div>
            <div style="width: 100%;
            display: flex;
            flex-wrap: wrap;
            ">      
            <div style="-webkit-box-flex: 0;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 18px;
            padding-left: 18px;
            flex: 0 0 50%;
  max-width: 50%;
            ">            <div style="width: 100%;
            display: flex;
            flex-wrap: wrap;
            ">                  <label style="margin-right: 10px;color: black;
            font-weight: 600;" >Name: </label>
                  <span>${reservation.infor.name}</span>
                </div>
                <div style="width: 100%;
                display: flex;
                flex-wrap: wrap;
                ">                  <label style="margin-right: 10px;color: black;
                font-weight: 600;">Email: </label>
                  <span>${reservation.infor.email}</span>
                </div>
              </div>
              <div style="-webkit-box-flex: 0;
              position: relative;
              width: 100%;
              min-height: 1px;
              padding-right: 18px;
              padding-left: 18px;
              flex: 0 0 50%;
    max-width: 50%;
              ">
              <div style="width: 100%;
              display: flex;
              flex-wrap: wrap;
              ">                    <label style="margin-right: 10px;color: black;
              font-weight: 600;">Address: </label>
                  <span>${reservation.infor.address}</span>
                </div>
                <div style="width: 100%;
                display: flex;
                flex-wrap: wrap;
                ">                  <label style="margin-right: 10px;color: black;
                font-weight: 600;">Phone: </label>
                  <span>${reservation.infor.phone}</span>
                </div>
              </div>
            </div>
            <div style="width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-left: 18px;
            ">              <label style="margin-right: 10px;color: black;
            font-weight: 600;">Note: </label>
              <span>${reservation.note}</span>
            </div>
      </div>
    `;

    sendMail(reservation.infor.email, subject, text, html);

    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = create;
