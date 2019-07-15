import React from "react";

export default function ReservationsCard(props) {
  return (
    <div className="reservationCard">
      <div>
        <p>
          For: {props.firstname} {props.lastname}
        </p>
        <p>Party size: {props.partysize}</p>
        <p>@{props.time}</p>
      </div>
    </div>
  );
}
