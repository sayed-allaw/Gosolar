import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { initEmailJS } from "./utils/emailjs";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/x-icon",
  },
  {
    rel: "shortcut icon",
    href: "/favicon.png",
    type: "image/x-icon",
  },
  {
    rel: "manifest",
    href: "/manifest.json",
  },
  {
    rel: "apple-touch-icon",
    href: "/icons/icon-192x192.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initEmailJS();
    // Set default title
    document.title = "GoSolar";
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="GoSolar" />
        <meta name="theme-color" content="#298204" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GoSolar" />
        <meta property="og:image" content="/images/gosolar-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>GoSolar</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
