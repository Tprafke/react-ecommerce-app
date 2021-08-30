import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import NavBar from "./components/navbar/navbar.component";
import SignInAndRegister from "./pages/sign-in-and-register/sign-in-and-register.component";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndRegister} />
      </Switch>
    </div>
  );
}

export default App;
