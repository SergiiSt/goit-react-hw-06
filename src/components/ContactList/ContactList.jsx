import Contact from "../Contact/Contact";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactList.module.css";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filter.name);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul className={css.list}>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact
              contact={contact}
              onDelete={() => handleDelete(contact.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
