import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
const EventDetail = () => {
  const data = useRouteLoaderData("event-detail");
  // To access the higher level data, we can use the useRouteLoaderData hook and need to pass id to it so we can access the data from loader function.
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
export const actionHandler = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    {
      method: request.method,
    }
  );
  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Could not delete event" },
        {
          status: 500,
        }
      )
    );
  }
  return redirect("/events");
};
