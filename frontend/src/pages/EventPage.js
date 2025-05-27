import { Link } from "react-router-dom";

const EventPage = () => {
  const EVENTS = [
    { id: "e1", title: "event-1" },
    { id: "e2", title: "event-2" },
    { id: "e3", title: "event-3" },
    { id: "e4", title: "event-4" },
  ];
  return (
    <>
      <h1>EventPage</h1>
      <ul>
        {EVENTS.map((eve) => {
          return (
            <li key={eve.id}>
              <Link to={eve.id}>{eve.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default EventPage;
