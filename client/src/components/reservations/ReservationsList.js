import React, { Component } from "react";
import ReservationsCard from "./reservationCard";

class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };
    this.fetchReservationList = this.fetchReservationList.bind(this);
  }

  componentDidMount() {
    this.fetchReservationList();
  }

  async fetchReservationList() {
    await fetch("reservations")
      .then(res => res.json())
      .then(data =>
        this.setState({
          reservations: data
        })
      );
  }

  render() {
    return (
      <div className="App">
        <h1>Reservations</h1>
        {this.state.reservations.map((reservation, index) => (
          <ReservationsCard
            key={index}
            firstname={reservation.firstname}
            lastname={reservation.lastname}
            partysize={reservation.partysize}
            time={reservation.time}
          />
        ))}
      </div>
    );
  }
}

export default ReservationsList;
