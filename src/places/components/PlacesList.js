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
            key={each.id}
            id={each.id}
            image={each.imageUrl}
            title={each.title}
            description={each.description}
            address={each.address}
            creatorId={each.creator}
            coordinates={each.location}
          />
        );
      })}
    </ul>
  );
};

export default PlacesList;
