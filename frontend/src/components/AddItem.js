import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AddItem = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("${backendUrl}/api/items", { name, time: parseInt(time) })
      .then(() => {
        setName("");
        setTime("");
        window.location.reload(); // Refresh the list
      })
      .catch((error) => console.error("Error adding item: ", error));
  };

  return (
    <div>
      <h1>Add Item</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Estimated Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time in minutes"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
