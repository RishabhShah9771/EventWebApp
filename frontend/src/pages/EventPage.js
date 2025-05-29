import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventsPage = () => {
  const { events } = useLoaderData();

  // Assuming the loader returns an object with an 'events' property.
  // The use LoaderData hook retrieves data loaded by the loader function in the route configuration.
  // we can use useLoaderData() in the elements that assigned to a route and in all components that might be used inside that element.
  // We can not use the useLoader to the higher level components that we are fetching the data.
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
};

// this loader code is excuted in the browser, not in the server.
// Any default brower feature can be used in this loader  but not the react hooks.
export const loaderHandler = async () => {
  return { events: loadEvents() };
};
