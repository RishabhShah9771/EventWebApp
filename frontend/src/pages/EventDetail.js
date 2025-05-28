import { useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
const EventDetail = () => {
  const data = useLoaderData();
  // The useLoaderData hook retrieves data loaded by the loader function in the route configuration.
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetail;

export const loaderHandler = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return JSON.stringify(
      { message: "Could not fetch deatails for selected events" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
};
