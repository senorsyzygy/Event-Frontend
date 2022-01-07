import React, { useState } from "react";
import { Container } from "react-bootstrap";
import './App.css';

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentAd) {
      result = props.client.updateAd(
        props.currentAd._id,
        e.target.event.value,
        e.target.adLocation.value,
        e.target.summary.value,
        e.target.date.value,
        e.target.time.value
      );
    } else {
      result = props.client.addAd(e.target.event.value, e.target.adLocation.value, e.target.summary.value, e.target.date.value, e.target.time.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        return props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };
  const makeDate = (date) => {
    return date && new Date(date).toISOString().substr(0,16)
  }  
  return (
    <>
      {props.currentAd ? "Update" : "Add"}
      <br />

      <form className="form" onSubmit={(e) => submitHandler(e)} id="addForm">
        Event: <br />
        <input
          type="text"
          defaultValue={props.currentAd?.event || ""}
          name="event"
          disabled={disabled}
          placeholder="Event name"
          required
        />
        <br />
        Location: <br />
        <input
          type="text"
          defaultValue={props.currentAd?.location || ""}
          name="adLocation"
          disabled={disabled}
          placeholder="Event location"
          required
        />
        <br />
        Summary:
        <br />
        <textarea
          type="text"
          defaultValue={props.currentAd?.summary || ""}
          name="summary"
          disabled={disabled}
          rows={4}
          placeholder="A brief description of the event"
          required
        />
        <br />
        Date:
        <br />
        <input
          type="date"
          defaultValue = {makeDate(props.currentAd?.date)}
          name="date"
          disabled={disabled}
          required
        />
        <br />
        Time:
        <br />
        <input
          type="time"
          defaultValue = {props.currentAd?.time || ""}
          name="time"
          disabled={disabled}
          required
        />
        <br />
        <br />
        <br />
        <button className="buttonSubmit" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
