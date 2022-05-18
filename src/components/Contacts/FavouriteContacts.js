import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import "../layout/common.css";
import { useDispatch } from "react-redux";
import { contactsActions } from "../../store/contacts";

const FavouriteContacts = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't load data");
        }
        return res.json();
      })
      .then((data) => {
        const favouriteContacts = [];

        for (const key in data) {
          if (data[key].contact.isFavourite) {
            favouriteContacts.push({
              id: key,
              contact: data[key].contact.contact,
              contactType: data[key].contact.contactType,
              dateOfBirth: data[key].contact.dateOfBirth,
              name: data[key].contact.name,
              lastName: data[key].contact.lastName,
              isFavourite: data[key].contact.isFavourite,
            });
          }
        }
        setFavourites(favouriteContacts);
        dispatch(contactsActions.showIcons(false));
      })
      .catch(() => {
        setError(true);
      });
  }, [dispatch, favourites]);

  if (error) {
    return <p>Couldn't load data!</p>;
  }

  return (
    <div className="contacts-container">
      {favourites.map((favourite) => (
        <ContactItem key={favourite.id} contact={favourite} />
      ))}
    </div>
  );
};

export default FavouriteContacts;
