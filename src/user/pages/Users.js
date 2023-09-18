import React from "react";
import UsersList from "../components/UsersList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Jatin",
      placeCount: 3,
      image: "https://picsum.photos/seed/picsum/200/300",
    }
  ];
  return <UsersList item={USERS} />;
}

export default Users;
