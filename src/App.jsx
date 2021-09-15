import React, { useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Logo from "./components/Logo/Logo";
import spinner from "./icons/spinner.svg";
import { requestUserWithToken } from "./actions";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";

const Signin = lazy(() => import("./components/SignInForms/Signin"));
const DeckPages = lazy(() => import("./components/DeckPages/DeckPages"));
const DeckEditor = lazy(() => import("./components/DeckEditor/DeckEditor"));
const CreateForm = lazy(() => import("./components/CreateForm/CreateForm"));
const ForgotPassword = lazy(() =>
  import("./components/SignInForms/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./components/SignInForms/ResetPassword")
);
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const AddCards = lazy(() => import("./components/SignInForms/AddCards"));
const HowTo = lazy(() => import("./components/HowTo/HowTo"));
const EditProfile = lazy(() => import("./components/SignInForms/EditProfile"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function App() {
  const { isSignedIn, username } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.getItem("token") && dispatch(requestUserWithToken());
  }, [dispatch]);

  return (
    <Router>
      <Helmet>
        <title>EDH Builder</title>
        <meta
          name="description"
          content="Build Magic the Gathering commander/EDH decks easily"
        />
      </Helmet>
      <div className="main-container">
        <Logo />
        <Sidebar />
        <div className="layout">
          <Suspense
            fallback={
              <img className="spinner" src={spinner} alt="loading spinner" />
            }
          >
            <Switch>
              <Route path="/signin">
                <Helmet>
                  <title>Sign In - EDH Builder</title>
                  <meta
                    name="description"
                    content="Sign in to or register for EDH Builder"
                  />
                </Helmet>
                {isSignedIn ? (
                  !username ? (
                    <Redirect to="/editprofile" />
                  ) : (
                    <Redirect to="/" />
                  )
                ) : (
                  <Signin />
                )}
              </Route>
              <Route path="/yourdecks">
                {isSignedIn ? (
                  <>
                    <Helmet>
                      <title>Your Decks - EDH Builder</title>
                      <meta
                        name="description"
                        content="All the decks you have made on EDH Builder"
                      />
                    </Helmet>
                    <h1 className="deckPagesTitle">Your Decks</h1>
                    <DeckPages source="priv" />
                  </>
                ) : (
                  <Signin />
                )}
              </Route>
              <Route path="/adddeck">
                {isSignedIn ? (
                  <>
                    <Helmet>
                      <title>Add Deck - EDH Builder</title>
                      <meta
                        name="description"
                        content="Create a magic the gathering commander deck in EDH Builder"
                      />
                    </Helmet>
                    <div className="createform-bracket"></div>
                    <CreateForm />
                  </>
                ) : (
                  <Signin />
                )}
              </Route>
              <Route path="/decklist/:deckId">
                <DeckEditor />
              </Route>
              <Route path="/editprofile">
                <Helmet>
                  <title>Profile - EDH Builder</title>
                  <meta
                    name="description"
                    content="Edit your profile information"
                  />
                </Helmet>
                <EditProfile />
              </Route>
              <Route path="/howto">
                <Helmet>
                  <title>How To - EDH Builder</title>
                  <meta
                    name="description"
                    content="Learn how to use EDH Builder to create Magic the Gathering commander/EDH decks easily"
                  />
                </Helmet>
                <HowTo />
              </Route>
              <Route path="/contact">
                <Helmet>
                  <title>Contact Us - EDH Builder</title>
                  <meta
                    name="description"
                    content="Contact us if you have any inquries about the application"
                  />
                </Helmet>
                <Contact />
              </Route>
              <Route path="/forgotyourpassword">
                <ForgotPassword />
              </Route>
              <Route path="/forgotpassword/:resetid">
                <ResetPassword />
              </Route>
              <Route path="/adminaddentrys">
                <AddCards />
              </Route>
              <Route path="/">
                <title>EDH Builder</title>
                <meta
                  name="description"
                  content="Build Magic the Gathering commander/EDH decks easily"
                />
                <Dashboard />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
