import React, { useState } from "react";
import Data from "./data.json";
import { Table, Button } from "react-bootstrap";
import "./CRUD.css";

function CRUD() {
  const [data, setData] = useState(Data);
  const [editState, setEditState] = useState(-1);

  return (
    <div className="tableWrap">
      <div>
        <AddMember setData={setData} />
        <form onSubmit={handleUpdate}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>function</th>
              </tr>
            </thead>
            <tbody>
              {data.map((current) =>
                editState === current.id ? (
                  <EditMember current={current} data={data} setData={setData} />
                ) : (
                  <tr>
                    <td>{current.id}</td>
                    <td>{current.name}</td>
                    <td>{current.email}</td>
                    <td>{current.phone}</td>
                    <td>
                      <Button
                        className="edit"
                        onClick={() => handleEdit(current.id)}
                        type="button"
                      >
                        Edit
                      </Button>
                      <Button
                        className="delete"
                        type="button"
                        onClick={() => handleDelete(current.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </form>
      </div>
    </div>
  );
  function handleDelete(id) {
    const updatedData = data.filter((d) => id !== d.id);
    setData(updatedData);
  }
  function handleUpdate(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;
    const updatedData = data.map((d) =>
      d.id === editState ? { ...d, name: name, email: email, phone: phone } : d
    );
    setData(updatedData);

    setEditState(-1);
  }
  function handleEdit(id) {
    setEditState(id);
  }
}

function EditMember({ current, data, setData }) {
  function handleID(event) {
    const id = event.target.value;
    const updatedData = data.map((d) =>
      d.id === current.id ? { ...d, id: id } : d
    );
    setData(updatedData);
  }
  function handleName(event) {
    const name = event.target.value;
    const updatedData = data.map((d) =>
      d.id === current.id ? { ...d, name: name } : d
    );
    setData(updatedData);
  }
  function handleEmail(event) {
    const email = event.target.value;
    const updatedData = data.map((d) =>
      d.id === current.id ? { ...d, email: email } : d
    );
    setData(updatedData);
  }
  function handlePhone(event) {
    const phone = event.target.value;
    const updatedData = data.map((d) =>
      d.id === current.id ? { ...d, phone: phone } : d
    );
    setData(updatedData);
  }
  return (
    <tr>
      <td>
        <input type="text" onChange={handleID} name="id" value={current.id} />
      </td>
      <td>
        <input
          type="text"
          onChange={handleName}
          name="name"
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleEmail}
          name="email"
          value={current.email}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handlePhone}
          name="phone"
          value={current.phone}
        />
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}
function AddMember({ setData }) {
  function handleValues(event) {
    event.preventDefault();
    const id = event.target.elements.id.value;
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;
    const newMember = {
      id,
      name,
      email,
      phone,
    };
    setData((preData) => preData.concat(newMember));
    console.log(setData);
  }
  return (
    <form className="addForm" onSubmit={handleValues}>
      <input type="text" name="id" placeholder="id" />
      <input type="text" name="name" placeholder="name" />
      <input type="text" name="email" placeholder="email" />
      <input type="text" name="phone" placeholder="phone" />

      <button className="add">Add</button>
    </form>
  );
}

export default CRUD;
