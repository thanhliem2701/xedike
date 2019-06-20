const { User } = require("../../../models/users");
const { Trip } = require("../../../models/Trip");

const createTrip = (req, res, next) => {
  //req.body la cac thong tin can luu

  // const {
  //   locationFrom,
  //   locationTo,
  //   startTime,
  //   availableSeats,
  //   passengerIds,
  //   fee
  // } = req.body;
  const driverId = req.user.id;
  User.findById(driverId)
    .then(driver => {
      if (!driver) return Promise.reject({ errors: "Driver does not exist !" });

      const trip = { ...req.body, driverId };

      console.log(trip);
      const newTrip = new Trip(
        trip
        // driverId,
        // locationFrom,
        // locationTo,
        // startTime,
        // availableSeats,
        // passengerIds,
        // fee
      );

      return newTrip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

// const bookTrip = async (req, res, next) => {
//   const { tripId } = req.params;
//   const { numberOfBookingSeats } = req.body;
//   const passengerId = req.user.id;
//   const passenger = await User.findById(passengerId);
//   const trip = await Trip.findById(tripId);

//   if (!passenger)
//     return res.status(404).json({ errors: "Passenger not found !" });
//   if (!trip) return res.status(404).json({ errors: "Trip not found !" });
//   if (numberOfBookingSeats > trip.availableSeats)
//     return res.status(400).json({ errors: "Available seats does not enough for your booking !" });

//   trip.availableSeats = trip.availableSeats - numberOfBookingSeats;
//   trip.passengerIds.push(passengerId);
//   const savedTrip = await trip.save();
//   res.status(200).json(savedTrip);
// };

const bookTrip = (req, res, next) => {
  const { tripId } = req.params;
  const { numberOfBookingSeats } = req.body;
  const passengerId = req.user.id;

  Promise.all([User.findById(passengerId), Trip.findById(tripId)])
    .then(result => {
      const passenger = result[0];
      const trip = result[1];
      
      if (!passenger)
        return Promise.reject({ errors: "Passenger not found !" });
      if (!trip) return Promise.reject({ errors: "Trip not found !" });
      if (numberOfBookingSeats > trip.availableSeats)
        return Promise.reject({
          errors: "Available seats does not enough for your booking !"
        });

      trip.availableSeats = trip.availableSeats - numberOfBookingSeats;
      trip.passengerIds.push(passengerId);
      return trip.save();
    })
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.status(404).json(err));
};

module.exports = { createTrip, bookTrip };
