import React, { useState } from "react";
import { Container } from "react-bootstrap";
import './App.css';

function Find(props) {
    const [disabled, cDisabled] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
            const searchParams = { 
                sEvent: e.target.sEvent.value,
                sLocation: e.target.sLocation.value,
                dateMin:  e.target.dateMin.value,
                dateMax: e.target.dateMax.value
            }
            props.querySearch(searchParams)
    };
    return (
    <>
    <Container className="mx-auto formContainer">
        <h5 className="findHeader">Searching for...</h5>
        <br />
        <form className="form2" onSubmit={(e) => submitHandler(e)} id="findForm">
        Event: <br />
        <input
            type="text"
            defaultValue={props.currentAd?.sEvent}
            name="sEvent"
            disabled={disabled}
            placeholder="Event name"
        />
        <br />
        Location: <br />
        <input
            type="text"
            defaultValue={props.currentAd?.sLocation}
            name="sLocation"
            disabled={disabled}
            placeholder="Event location"
        />
        <br />
        First Date:
        <br />
        <input
            type="date"
            defaultValue={props.currentAd?.date}
            name="dateMin"
            disabled={disabled}
        />
        <br />
        Last Date:
        <br />
        <input
            type="date"
            defaultValue={props.currentAd?.date}
            name="dateMax"
            disabled={disabled}
        />
        <br />
        <button className="buttonSubmit" type="submit" disabled={disabled}>
            {" "}
            Search{" "}
        </button>
    </form>
    </Container>
    </>
);
}

export default Find