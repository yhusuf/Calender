import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone"; // For managing time zones

function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [timeZone, setTimeZone] = useState(moment.tz.guess()); // Default to user's current time zone

  const handleDateClick = (selectedDate) => {
    const dateString = selectedDate.toDateString();
    const eventDescription = prompt(
      "Enter event description:",
      events[dateString] || ""
    );
    if (eventDescription) {
      setEvents({ ...events, [dateString]: eventDescription });
    }
  };

  const handleTimeZoneChange = (e) => {
    setTimeZone(e.target.value);
  };

  const timeZones = moment.tz.names(); // List of all time zones

  const formatDateInTimeZone = (date, timeZone) => {
    return moment(date).tz(timeZone).format("YYYY-MM-DD HH:mm:ss z");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>React Calendar App</h1>
      <Calendar onChange={setDate} value={date} onClickDay={handleDateClick} />
      <h2>Selected Date: {date.toDateString()}</h2>
      {events[date.toDateString()] && (
        <p>
          <strong>Event:</strong> {events[date.toDateString()]}
        </p>
      )}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="timeZoneSelect">Select Time Zone:</label>
        <select
          id="timeZoneSelect"
          value={timeZone}
          onChange={handleTimeZoneChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
      <footer style={{ marginTop: "20px", fontSize: "14px", color: "gray" }}>
        <p>
          Current Time in <strong>{timeZone}</strong>:{" "}
          {formatDateInTimeZone(new Date(), timeZone)}
        </p>
      </footer>
    </div>
  );
}

export default App;
