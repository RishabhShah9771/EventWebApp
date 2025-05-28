import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventsPage = () => {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events; // Assuming the loader returns an object with an 'events' property.
  // The use LoaderData hook retrieves data loaded by the loader function in the route configuration.
  // we can use useLoaderData() in the elements that assigned to a route and in all components that might be used inside that element.
  // We can not use the useLoader to the higher level components that we are fetching the data.
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default EventsPage;

// this loader code is excuted in the browser, not in the server.
// Any default brower feature can be used in this loader  but not the react hooks.
export const loaderHandler = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //...
    // return {
    //   isError: true,
    //   message: "Could not fetch events.",
    // };
    throw new Error("Could not fetch events");
  } else {
    return response;
  }
};
