import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 5rem;
  height: 2rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ticker: "", data: [] };
  }

  makeRequest = async () => {
    await axios
      .get(
        "https://api.intrinio.com/prices?identifier=" +
          this.state.ticker.toUpperCase(),
        {
          auth: {
            username: "871438f1f58cb1b4af847325a8122c27",
            password: "08c5a309857d376942d0ae2cf4c84ed7"
          }
        }
      )
      .then(response => this.setState({ data: response.data }));
  };

  render() {
    // Data Source
    const { data } = this.state.data;

    // Specify Options
    const cols = {
      close: { alias: "Price" },
      date: { alias: "Date" }
    };

    return (
      <AppContainer>
        <InputWrapper>
          <input
            type="text"
            placeholder="Ticker"
            value={this.state.ticker}
            onChange={e => this.setState({ ticker: e.target.value })}
          />
          <Button type="button" onClick={this.makeRequest}>
            Get Chart!
          </Button>
        </InputWrapper>
        <Chart width={1200} height={600} data={data} scale={cols}>
          <Axis name="date" />
          <Axis name="close" />
          <Tooltip />
          <Geom type="line" position="date*close" />
        </Chart>
      </AppContainer>
    );
  }
}

export default App;
