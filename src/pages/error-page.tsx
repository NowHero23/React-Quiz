import React from "react";
import { NavLink as Link, useRouteError } from "react-router-dom";
import Header from "../components/layout/Header";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Header />
      <div
        id="error-page"
        className="container flex flex-col items-center justify-center h-full px-5"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>

        <Link to={"/React-Quiz/"} className="mt-4 btn btn-primary">
          Go Home page
        </Link>
      </div>
    </main>
  );
}
