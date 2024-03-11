import "./App.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Analytics } from "@vercel/analytics/react";

function Form() {
  const [numberCharacters, setNumberCharacters] = useState(5);
  const [finalURL, setFinalURL] = useState(null);
  const [formData, setFormData] = useState({
    shortURL: nanoid(5),
    longURL: "",
    expireAfterSeconds: null,
  });

  const onChangeData = (e) => {
    if (e.target.name === "shortURL")
      setNumberCharacters(e.target.value.length);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    document.querySelector(".final_url").style.visibility = "hidden";
  };

  const onScrub = (e) => {
    setNumberCharacters(e.target.value);
    setFormData({
      ...formData,
      shortURL: nanoid(numberCharacters),
    });
    document.querySelector(".final_url").style.visibility = "hidden";
  };

  const copyUrl = () => {
    alert("URL Copied! ", finalURL);
    navigator.clipboard.writeText(finalURL);
  };

  const SelectInput = () => {
    return (
      <>
        <select
          name="expireAfterSeconds"
          onChange={onChangeData}
          value={formData.expireAfterSeconds || ""}
        >
          <option value="null" default>
            Never Expire
          </option>
          <option value="60">Expire After 1 Minute</option>
          <option value="600">Expire After 10 Minutes</option>
          <option value="3600">Expire After 1 Hour</option>
          <option value="86400">Expire After 1 Day</option>
          <option value="604800">Expire After 1 Week</option>
          <option value="2629800">Expire After 1 Month</option>
        </select>
      </>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("response is", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        setFinalURL("https://links.aryanranderiya.com/l/" + formData.shortURL);
        document.querySelector(".final_url").style.visibility = "visible";
      }
    } catch (error) {
      console.error("Error: ", error);
      alert(error.message || "Server Error Occured!");
    }
  };

  function calculateTime() {
    if (formData.expireAfterSeconds !== null)
      return (
        "Expires at " +
        new Date(
          new Date().getTime() + formData.expireAfterSeconds * 1000
        ).toString()
      );
    else return "Never Expires";
  }

  return (
    <>
      <a href="https://links.aryanranderiya.com" className="bannerimage">
        <img src="banner.png" alt="Project Banner" width="35%"></img>
      </a>

      <form className="form" onSubmit={onSubmit}>
        <input
          key="longURL"
          type="url"
          placeholder="Enter long URL to shorten:"
          value={formData.longURL}
          name="longURL"
          onChange={onChangeData}
          required
          size="30"
        ></input>

        <input
          key="shortURL"
          type="text"
          placeholder="Enter short URL:"
          value={formData.shortURL}
          name="shortURL"
          onChange={onChangeData}
          required
          size="20"
        ></input>

        <br />

        <label htmlFor="scrubber">
          Number of Characters: {numberCharacters}
        </label>
        <input
          type="range"
          min="5"
          max="20"
          step="1"
          id="scrubber"
          list="markers"
          value={numberCharacters}
          onChange={onScrub}
        ></input>

        <SelectInput />

        <input type="submit" className="submit_btn" value="Shorten URL"></input>
      </form>

      <h3 className="final_url" onClick={copyUrl}>
        Your URL is: &nbsp; {finalURL}
        <img src="clipboard.svg" width="30px" alt="copy text"></img>
        {calculateTime()}
      </h3>
      <h4 className="subtitle">
        Made with 💙 by&nbsp;
        <a href="https://aryanranderiya.com" className="subtitle_color">
          Aryan Randeriya
        </a>
      </h4>

      <Analytics />
    </>
  );
}

function App() {
  return <Form />;
}

export default App;
