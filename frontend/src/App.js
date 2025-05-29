import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventPage, { loaderHandler } from "./pages/EventPage";
import EventDetail from "./pages/EventDetail";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import {
  loaderHandler as loaderFromEventDetail,
  actionHandler as deleteEventActionHandler,
} from "./pages/EventDetail";
import { actionHandler as manipulateEventActionHandler } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: loaderHandler,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: loaderFromEventDetail,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventActionHandler,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventActionHandler,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventActionHandler,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
