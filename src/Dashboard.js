import React, { useState, useEffect } from "react";
import Add from "./Add";
import { Table } from "react-bootstrap";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Find from './Find'


function Dashboard(props) {
  const [ads, cAds] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)

  const refreshList = () => {
    props.client.getAds().then((response) => cAds(response.data));
  };

  const removeAdvert = (id) => {
    props.client.removeAd(id).then(() => refreshList());
  };

  const updateAdvert = (ad) => {
    cCurrent(ad);
  };
  const clearFunction = () => {
    updateAdvert(undefined)
  }
  const refreshListFind = (location) => {
    props.client.getLocation(location).then((response) => cAds(response.data))
  }

  const querySearch = (searchParams) => {
    props.client.queryResult(searchParams).then((response) => cAds(response.data))
  }

  useEffect(() => {
    refreshList();
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('en-GB', options)
  }
  const buildrows = () => {
    return ads.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.event}</td>
          <td>{current.location}</td>
          <td>{current.summary}</td>
          <td>{formatDate(current.date)}</td>
          <td>{current.time}</td>
          <td>
            <button className="buttonUpdate" onClick={() => updateAdvert(current)}> update</button>
            <button className="buttonRemove" onClick={() => removeAdvert(current._id)}> remove</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
    <main>
      <Container className="mx-auto text-center mt-2 contentContainer">
        <Row className="headerRow">
          <Col>
          <h1 className="header-title">Eventful App Dashboard</h1>
          <h5 className="header-body">To add an event just click the 'Add a post' button or to find events click 'Find Event'</h5>
          </Col>
        </Row>
      <br />
        <Row className="bodyRow">
          <Col xs={6}>
          { show? 
          <>
        <Add
            client={props.client}
            refreshList={() => {
            refreshList();
            cCurrent(undefined);
            }}
            currentAd={current}
          />
          <a class="see-less-btn" onClick={() => setShow(!show)}>See less</a>
          </>
        :<a class="buttonShowAdd" onClick={() => setShow(!show)}>Add a post</a>}
        </Col>
        <Col xs={6}>
        { show2? 
          <>
        <Find
            client={props.client}
            refreshListFind = {refreshListFind}
            querySearch = {querySearch}
            currentAd={current}
          />
          <a class="see-less-btn" onClick={() => setShow2(!show2)}>See less</a>
          <a class="see-less-btn" onClick={() => refreshList()}>Clear Filtered List</a>
          </>
        :<a class="buttonShowAdd2" onClick={() => setShow2(!show2)}>Find Event</a> }
        </Col>
        </Row>
        <Row className="tableRow">
          <Table bordered className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Location</th>
                <th>Summary</th>
                <th>Date</th>
                <th>Time</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>{buildrows()}</tbody>
          </Table>
        </Row>
      <br />
      <br />
      </Container>
    </main>
    </>
  );
}

export default Dashboard;
