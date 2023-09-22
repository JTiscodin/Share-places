import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
const dummy_places = [
  {
    id: "p1",
    title: "Manipal University Jaipur",
    descripton: "A University in Jaipur Rajasthan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/I_love_manipal.jpg",
    address:
      "Manipal University Jaipur Dehmi Kalan,Off Jaipur-Ajmer Expressway,Jaipur, (Raj.) Rajasthan 303007.",
    locaton: {
      lat: 26.84386,
      lng: 75.5626594,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Manipal University",
    descripton: "A University in Jaipur Rajasthan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/I_love_manipal.jpg",
    address:
      "Manipal University Jaipur Dehmi Kalan,Off Jaipur-Ajmer Expressway,Jaipur, (Raj.) Rajasthan 303007.",
    locaton: {
      lat: 26.84386,
      lng: 75.5626594,
    },
    creator: "u1",
  },
];

const UpdatePlace = (props) => {
  const [loading, setLoding] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const identifiedPlace = dummy_places.find((each) => {
    return each.id === placeId;
  });
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.descripton,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          },
        },
        true
      );
    }
    setLoding(false);
  }, [setFormData, identifiedPlace]);
  const updatePlaceHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a place!</h2>
        </Card>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="center">
        <h2>Loading ...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={updatePlaceHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        isValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        isValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
