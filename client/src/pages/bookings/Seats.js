import React from 'react';
import classes from './BookMySeats.module.css';

const Seats = (props) => {
    return (
      <div className={classes.section}>
          {props.values.map(seat => {
              const isAvailable = props.availableSeats.includes(seat);
              const isBooked = props.bookedSeats.includes(seat);
              let seatClass;
              if(!isAvailable) {
                  seatClass = classes.disabled;
              }
              if(isBooked) {
                  seatClass = classes.booked;
              }
              return <div className={seatClass} onClick={props.addSeat} key={seat}>{seat}</div>;
          })}
      </div>
    );
}
export default Seats;