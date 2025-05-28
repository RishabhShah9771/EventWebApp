import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventPage, { loaderHandler } from "./pages/EventPage";
import EventDetail from "./pages/EventDetail";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { loaderHandler as loaderFromEventDetail } from "./pages/EventDetail";

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
            children: [
              {
                path: ":eventId",
                element: <EventDetail />,
                loader: loaderFromEventDetail,
              },
              { path: ":eventId/edit", element: <EditEventPage /> },
            ],
          },
          { path: "new", element: <NewEventPage /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
