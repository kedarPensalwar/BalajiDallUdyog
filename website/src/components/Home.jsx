/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import PopupComponent from "./PopupComponent";
import { Cards } from "./Cards";
import axios from "axios";

export const Home = () => {
  const responseURL = "http://localhost:8080";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(responseURL + "/getLinks");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Balaji Dall Udyog</h1>

      <Container>
        <Grid
          container
          spacing={2}
        >
          {data.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Cards
                id={item.id}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <PopupComponent />
    </>
  );
};
