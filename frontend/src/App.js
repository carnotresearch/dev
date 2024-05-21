import React from "react";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container">
      <AddItem />
      <ItemList />
    </div>
  );
};

export default App;
