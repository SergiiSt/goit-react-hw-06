import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required field"),
  number: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required field"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handlerSubmit = (values, actions) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (existingContact) {
      alert(`${values.name} is already in contacts`);
    } else {
      dispatch(addContact(values.name, values.number));
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={handlerSubmit}
    >
      <Form className={css.formWrap}>
        <div className={css.fieldWrap}>
          <label className={css.label}>Name</label>
          <Field className={css.field} type="text" name="name" />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>

        <div className={css.fieldWrap}>
          <label className={css.label}>Number</label>
          <Field className={css.field} type="text" name="number" />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
