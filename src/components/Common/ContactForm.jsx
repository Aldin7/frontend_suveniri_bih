import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error occurred while sending.");
    }
  };

  return (
    <div className="contact-form" style={{ height: '80vh', padding: '20px' }}>
      <fieldset style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <form onSubmit={handleSubmit}>
        <legend><b>Contact Us</b></legend>
        <br></br>
        <label style={{ display: 'flex', marginBottom: '10px' }}>
          Name:

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-100 mx-4 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            required
          />
        </label>
        <br></br>

        <label style={{ display: 'flex', marginBottom: '10px'}}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-100 mx-4 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            required
          />
        </label>
        <br></br>

        <label style={{ display: 'flex', marginBottom: '10px' }}>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-100 mx-4 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            required
          />
        </label>
        <br></br>

        <button type="submit" className="bg-black text-white px-6 py-4">Send</button>
      </form>
      </fieldset>
      <p>{status}</p>
    </div>
  );
};

export default ContactForm;
