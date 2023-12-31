import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";
const UsersList = (props) => {
  if (props.items.length === 0) {
    return(
    <div className="center">
      <Card>
        <h2> No Users found.</h2>
      </Card>
    </div>
    )
  }
  return (
    <ul className="users-list">
      {props.items.map((each) => {
        return (
          <UserItem
            key={each.id}
            id={each.id}
            image={each.image}
            name={each.name}
            placeCount={each.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
