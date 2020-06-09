import React, { forwardRef, useState } from "react";
import { useUsers } from "../hooks/useUsers";

export const User = forwardRef((props, ref) => {
  // const { updateUser } = useUsers();

  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(props.user.name);

  const handleEdit = () => {
    setEdit(true);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    // updateUser(1, { name });
  };

  return (
    <div ref={ref} className="box">
      <p>{props.user.id}</p>
      {isEdit ? (
        <input type="text" value={name} onChange={handleChange} />
      ) : (
        <p>{props.user.name}</p>
      )}

      <img src={props.user.avatar} alt="avatar" />
      <button onClick={handleEdit}>Edit Name</button>
      <button onClick={handleSubmit}>Sunmit</button>
    </div>
  );
});
