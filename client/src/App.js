import React from "react";
import "./App.css";
import ReservationsList from "./components/reservations/ReservationsList";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <ReservationsList />
      </div>
    </div>
  );
}

export default App;
