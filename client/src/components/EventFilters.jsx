import React from "react";

export default function EventFilters({ events, setFilteredEvents }) {
  const filterEvents = (e) => {
    setFilteredEvents(
      e.target.value === "all"
        ? events
        : events.filter((event) => event.location === parseInt(e.target.value))
    );
  };

  const showAllEvents = () => {
    setFilteredEvents(events);
  };

  return (
    <div className="event-filters">
      <select name="" id="" onChange={filterEvents}>
        <option name="See events at ..." value="all">
          See events at ...
        </option>
        
      </select>
      <button onClick={showAllEvents}>Show All Events</button>
    </div>
  );
}
