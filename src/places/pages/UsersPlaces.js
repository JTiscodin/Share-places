import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UsersPlaces = (props) => {
  const { userId } = useParams();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        await setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const deleteHandler = (placeId) => {
    setLoadedPlaces((prev) => prev.filter((place) => place._id !== placeId));
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlacesList items={loadedPlaces} onDeletePlace={deleteHandler} />
      )}
    </>
  );
};

export default UsersPlaces;
