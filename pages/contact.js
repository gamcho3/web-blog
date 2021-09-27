import React, { Fragment } from "react";
import ContactForm from "../component/contact/contact-form";
import Head from "next/head";
const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="send me your message"></meta>
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
