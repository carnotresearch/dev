import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get("${backendUrl}/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`${backendUrl}/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item._id !== id)))
      .catch((error) => console.error("Error deleting item: ", error));
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  const updateItem = (event) => {
    event.preventDefault();
    const { name, time } = event.target.elements;
    axios
      .put(`${backendUrl}/api/items/${editingItem._id}`, {
        name: name.value,
        time: parseInt(time.value),
      })
      .then(() => {
        setEditingItem(null);
        axios
          .get("${backendUrl}/api/items")
          .then((response) => setItems(response.data))
          .catch((error) => console.error("Error fetching data: ", error));
      })
      .catch((error) => console.error("Error updating item: ", error));
  };

  return (
    <div>
      <h1>Item List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Estimated Time (minutes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.time}</td>
              <td>
                <Button variant="warning" onClick={() => editItem(item)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteItem(item._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editingItem && (
        <div>
          <h2>Edit Item</h2>
          <Form onSubmit={updateItem}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editingItem.name}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estimated Time (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="time"
                defaultValue={editingItem.time}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ItemList;
