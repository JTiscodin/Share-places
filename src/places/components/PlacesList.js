import React from "react";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one ?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((each) => {
        return (
          <PlaceItem
            key={each._id}
            id={each._id}
            image={each.image}
            title={each.title}
            description={each.description}
            address={each.address}
            creatorId={each.creator}
            coordinates={each.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
};

export default PlacesList;
