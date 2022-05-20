import { useParams } from "react-router-dom";
import SelectedContact from "./SelectedContact";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ContactDetails = () => {
  const params = useParams();
  const [contact, setContact] = useState({});
  const rerender = useSelector((state) => state.contacts.rerender);
  const history = useHistory();

  useEffect(() => {
    fetch(
      `https://adresar-ea8a7-default-rtdb.firebaseio.com/contacts/${params.kontaktId}/contact.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setContact({...data, id: params.kontaktId});
        if(!data){
          history.replace('/adresar');
        }
      });
  }, [params.kontaktId, rerender, history]);

  return (
    <SelectedContact
      contact={contact}
    />
  );
};

export default ContactDetails;