import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Online, Offline } from "react-detect-offline";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about/About";
import ConfPageThree from "./components/confpagethree/ConfPageThree";
import ConfTwo from "./components/conftwo/ConfTwo";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Invoice from "./components/invoice/Invoice";
import OfflinePage from "./components/offlinePage/OfflinePage";
import Welcome from "./components/Welcome";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import VehicleScreen from "./screens/VehicleScreen";

function App() {
  return (
    <>
      {/* <Online> */}
      <Router>
        <Header />

        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/home" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/vehicle/:id" component={VehicleScreen} exact />
          <Route path="/about" component={About} exact />
          <Route path="/conf" component={ConfTwo} exact />
          <Route path="/confthree" component={ConfPageThree} exact />
          <Route path="/invoice" component={Invoice} exact />
        </Switch>

        <Footer />
      </Router>
      {/* </Online>
      <Offline>
        <OfflinePage />
      </Offline> */}
    </>
  );
}

export default App;
