import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";

const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const Field = ({ title, type, required, placeholder, formData, setField }) => {
  switch (type) {
    case "paragraph": {
      return (
        <textarea
          className={styles.formInput}
          name={title}
          placeholder={placeholder}
          required={required}
          value={formData[title]}
          onChange={(event) => setField(title, event.target.value)}
        />
      );
    }
    default: {
      return (
        <input
          className={styles.formInput}
          type={type}
          name={title}
          placeholder={placeholder}
          required={required}
          value={formData[title]}
          onChange={(event) => setField(title, event.target.value)}
        />
      );
    }
  }
};

const Form = ({ name, heading, subtitle, fields }) => {
  const [formData, setFormData] = React.useState({
    "form-name": name,
    ...fields.reduce((a, b) => ((a[b.title] = ""), a), {}),
  });

  const setField = (name, value) => {
    setFormData((prevData) => {
      const dataCopy = { ...prevData };

      dataCopy[name] = value;

      return dataCopy;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("/", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        alert("Successfully submitted form!");
      })
      .catch(() => {
        alert(
          "An error occurred while submitting the form, please try again later!"
        );
      });
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <form
          name={name}
          method="POST"
          netlify-honeypot="bot-field"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value={name} />
          <p className={styles.hiddenField}>
            <label>
              {"Don’t fill this out if you're human: "}
              <input name="bot-field" />
            </label>
          </p>

          {fields.map((field) => (
            <React.Fragment key={field._key}>
              <label>{field.title}</label>
              <Field {...field} formData={formData} setField={setField} />
            </React.Fragment>
          ))}

          <input className={styles.formButton} type="submit" value="Send" />
        </form>
      </div>
    </section>
  );
};

Form.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string,
  subtitle: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Form.defaultProps = {
  heading: null,
  subtitle: null,
};

export default Form;
