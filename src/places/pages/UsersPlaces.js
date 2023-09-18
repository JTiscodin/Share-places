import React from 'react'
import {useParams} from "react-router-dom"
import PlacesList from '../components/PlacesList'
const dummy_places = [
    {
        id: "p1",
        title: "Manipal University Jaipur",
        descripton:"A Univeristy in Jaipur Rajasthan",
        imageUrl:"https://upload.wikimedia.org/wikipedia/commons/1/19/I_love_manipal.jpg",
        address: "Manipal University Jaipur Dehmi Kalan,Off Jaipur-Ajmer Expressway,Jaipur, (Raj.) Rajasthan 303007.",
        locaton:{
            lat:26.84386,
            lng:75.5626594 
        },
        creator:"u1"
    },
    {
        id: "p1",
        title: "Manipal University Jaipur",
        descripton:"A Univeristy in Jaipur Rajasthan",
        imageUrl:"https://upload.wikimedia.org/wikipedia/commons/1/19/I_love_manipal.jpg",
        address: "Manipal University Jaipur Dehmi Kalan,Off Jaipur-Ajmer Expressway,Jaipur, (Raj.) Rajasthan 303007.",
        locaton:{
            lat:26.84386,
            lng:75.5626594 
        },
        creator:"u2",
    }
]
const UsersPlaces = (props) => {
    const {userId} = useParams();
    const loadedPlaces = dummy_places.filter((each) => each.creator===userId)
  return (
    <PlacesList items={loadedPlaces} />
  )
}

export default UsersPlaces