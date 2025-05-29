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
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

/**
 * Defines the application's route configuration using React Router's `createBrowserRouter`.
 *
 * Route Structure:
 * - "/" (Root)
 *   - Renders: <RootLayout />
 *   - Error: <ErrorPage />
 *   - Children:
 *     - Index route: <HomePage />
 *     - "events" (Events Section)
 *       - Renders: <EventsRoot />
 *       - Children:
 *         - Index route: <EventPage /> (with loaderHandler)
 *         - ":eventId" (Event Detail)
 *           - Loader: loaderFromEventDetail
 *           - Children:
 *             - Index route: <EventDetail /> (with deleteEventActionHandler)
 *             - "edit": <EditEventPage /> (with manipulateEventActionHandler)
 *         - "new": <NewEventPage /> (with manipulateEventActionHandler)
 *     - "newsletter": <NewsletterPage /> (with newsletterAction)
 *
 * Each route can specify:
 * - `element`: The React component to render.
 * - `loader`: Data loading function for the route.
 * - `action`: Function to handle form submissions or mutations.
 * - `errorElement`: Component to render on error.
 *
 * @type {import('react-router-dom').RouteObject[]}
 */
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
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
