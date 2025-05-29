# EventWebApp

## loader

A `loader` is a function used in React Router to fetch data before rendering a route. It allows you to load data on the server or client before the component mounts.

**Example:**
```js
// In your route definition
{
    path: "/events/:eventId",
    element: <EventDetail />,
    loader: async ({ params }) => {
        const response = await fetch(`/api/events/${params.eventId}`);
        return response.json();
    }
}
```

---

## action

An `action` is a function in React Router that handles data mutations (like form submissions) for a route. It runs when a user submits a form or triggers a navigation with a POST, PUT, PATCH, or DELETE method.

**Example:**
```js
// In your route definition
{
    path: "/events/new",
    element: <NewEventForm />,
    action: async ({ request }) => {
        const formData = await request.formData();
        await fetch('/api/events', {
            method: 'POST',
            body: formData,
        });
        return redirect('/events');
    }
}
```

---

## Redirect

`Redirect` is used to navigate the user to a different route programmatically, often after an action or loader completes.

**Example:**
```js
import { redirect } from "react-router-dom";

export async function action() {
    // ...some logic
    return redirect("/events");
}
```

---

## useNavigate

`useNavigate` is a React Router hook that lets you navigate programmatically from your components.

**Example:**
```js
import { useNavigate } from "react-router-dom";

function MyComponent() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/events");
    };

    return <button onClick={handleClick}>Go to Events</button>;
}
```

---

## useNavigation

`useNavigation` is a React Router hook that provides information about the current navigation state, useful for showing loading indicators during navigation.

**Example:**
```js
import { useNavigation } from "react-router-dom";

function MyComponent() {
    const navigation = useNavigation();

    return (
        <div>
            {navigation.state === "loading" ? "Loading..." : "Content"}
        </div>
    );
}
```

---

## useRouteLoaderData()

`useRouteLoaderData` is a hook that lets you access the data returned by a route's loader function.

**Example:**
```js
import { useRouteLoaderData } from "react-router-dom";

function EventDetail() {
    const event = useRouteLoaderData();

    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
        </div>
    );
}
```

---

## Nested Routes

Nested routes allow you to render child routes inside parent routes, enabling layouts and shared UI.

**Example:**
```js
// Route definition
{
    path: "/events",
    element: <EventsLayout />,
    children: [
        { path: "", element: <EventsList /> },
        { path: ":eventId", element: <EventDetail /> }
    ]
}
```
```jsx
// In EventsLayout.jsx
import { Outlet } from "react-router-dom";

function EventsLayout() {
    return (
        <div>
            <h1>Events</h1>
            <Outlet /> {/* Renders child routes here */}
        </div>
    );
}
```

---

## Outlet

`Outlet` is a component that renders the matched child route element in nested routes.

**Example:**
```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <nav>/* navigation */</nav>
            <Outlet /> {/* Child routes render here */}
        </div>
    );
}
```

---

## useParams

`useParams` is a hook that returns an object of key/value pairs of the dynamic params from the current URL.

**Example:**
```jsx
import { useParams } from "react-router-dom";

function EventDetail() {
    const { eventId } = useParams();
    // Use eventId to fetch event details
}
```

---

## useLocation

`useLocation` returns the current location object, useful for accessing pathname, search, and state.

**Example:**
```jsx
import { useLocation } from "react-router-dom";

function ShowLocation() {
    const location = useLocation();
    return <div>Current path: {location.pathname}</div>;
}
```

---

## useMatch

`useMatch` checks if the current URL matches a given pattern and returns match details.

**Example:**
```jsx
import { useMatch } from "react-router-dom";

function HighlightIfActive() {
    const match = useMatch("/events/:eventId");
    return <div>{match ? "Viewing an event" : "Not viewing an event"}</div>;
}
```

---

## Link and NavLink

`Link` is used for navigation without reloading the page. `NavLink` is similar but adds styling for active links.

**Example:**
```jsx
import { Link, NavLink } from "react-router-dom";

<Link to="/events">Events</Link>

<NavLink to="/events" activeClassName="active">
    Events
</NavLink>
```

---

## Error Boundaries and errorElement

You can define an `errorElement` in your route to handle errors thrown by loaders, actions, or components.

**Example:**
```js
{
    path: "/events/:eventId",
    element: <EventDetail />,
    loader: eventLoader,
    errorElement: <ErrorPage />
}
```
```jsx
function ErrorPage({ error }) {
    return <div>Error: {error.message}</div>;
}
```

---

## useFetcher

`useFetcher` lets you interact with loaders and actions without navigating, useful for forms and background data loading.

**Example:**
```jsx
import { useFetcher } from "react-router-dom";

function SubscribeForm() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post" action="/subscribe">
            <input name="email" type="email" />
            <button type="submit">Subscribe</button>
            {fetcher.state === "submitting" && "Submitting..."}
        </fetcher.Form>
    );
}
```

---

## Deferred Data (defer)

`defer` allows you to return data from a loader that can be loaded in parallel, improving performance for slow resources.

**Example:**
```js
import { defer } from "react-router-dom";

export async function loader() {
    return defer({
        event: fetchEvent(),
        attendees: fetchAttendees() // can resolve later
    });
}
```
```jsx
import { Await, useLoaderData } from "react-router-dom";

function EventPage() {
    const { event, attendees } = useLoaderData();
    return (
        <div>
            <Await resolve={event}>
                {(event) => <h2>{event.title}</h2>}
            </Await>
            <Await resolve={attendees}>
                {(attendees) => <ul>{attendees.map(a => <li key={a.id}>{a.name}</li>)}</ul>}
            </Await>
        </div>
    );
}
```

---

## Route Object Syntax

React Router supports route definitions as objects, allowing for advanced configuration.

**Example:**
```js
const routes = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "events", element: <EventsList /> },
            { path: "about", element: <AboutPage /> }
        ]
    }
];
```

---

## Index Routes

An index route renders when the parent route matches exactly, useful for default child content.

**Example:**
```js
{
    path: "/events",
    element: <EventsLayout />,
    children: [
        { index: true, element: <EventsList /> },
        { path: ":eventId", element: <EventDetail /> }
    ]
}
```

---

## Protected Routes

Protected routes restrict access based on authentication or other logic.

**Example:**
```jsx
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
```
```js
{
    path: "/dashboard",
    element: <ProtectedRoute isAuthenticated={userLoggedIn} />,
    children: [
        { path: "", element: <Dashboard /> }
    ]
}
```
