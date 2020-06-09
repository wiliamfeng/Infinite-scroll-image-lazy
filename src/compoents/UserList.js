import React from "react";
import { useUsers } from "../hooks/useUsers";
import { User } from "./User";

export function UserList() {
  const { users } = useUsers();

  return users.get.loading
    ? "loading....."
    : users.get.list.map((user) => <User user={user} />);
}
