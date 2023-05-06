import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {

  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={Chat} />
    </>
  )
}

export default App
