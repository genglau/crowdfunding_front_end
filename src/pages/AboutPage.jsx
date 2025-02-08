import React from "react";
import "./global.css";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about">
      <h1>About Little Dreamers</h1>
      <p>
        Welcome to our Little Dreamers, a kids-friendly crowdfunding platform! This is a place where young innovators can share their amazing ideas and bring them to life with the help of supporters. Create, pledge, and watch projects grow!
      </p>
      <h2>Contact Us</h2>
      <form className="contact-form">

      <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" spellCheck="true" required />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            spellCheck="true"
            required
          />

          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            spellCheck="true"
            required
            rows="10"
          ></textarea>


        <button type="submit" className="rainbow-button">Send Message</button>
      </form>
    </div>
  );
}

export default AboutPage;
