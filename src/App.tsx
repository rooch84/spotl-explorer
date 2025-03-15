import "./App.css";

import { ResponsiveChoropleth } from "@nivo/geo";
import { artists } from "./data";
import countryCodes from "./assets/country_codes.json";
import { groupBy } from "lodash";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import viteLogo from "/vite.svg";
import worldCountries from "./assets/world_countries.json";

function App() {
  const [count, setCount] = useState(0);

  const groupByCountries = groupBy(artists, (artist) => artist.country);

  const countryCount = Object.entries(groupByCountries).map(
    ([country, artists]) => ({
      id: countryCodes.find(
        (code) => code.let2.toLocaleLowerCase() === country.toLocaleLowerCase()
      )?.let3,
      value: artists.length,
    })
  );

  console.log(groupByCountries);
  console.log(countryCodes);
  console.log(countryCount);

  return (
    <>
      <div style={{ width: "800px", height: "400px" }}>
        <ResponsiveChoropleth
          data={countryCount}
          features={worldCountries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[0, 600]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          // defs={[
          //   {
          //     id: "dots",
          //     type: "patternDots",
          //     background: "inherit",
          //     color: "#38bcb2",
          //     size: 4,
          //     padding: 1,
          //     stagger: true,
          //   },
          //   {
          //     id: "lines",
          //     type: "patternLines",
          //     background: "inherit",
          //     color: "#eed312",
          //     rotation: -45,
          //     lineWidth: 6,
          //     spacing: 10,
          //   },
          //   {
          //     id: "gradient",
          //     type: "linearGradient",
          //     colors: [
          //       {
          //         offset: 0,
          //         color: "#000",
          //       },
          //       {
          //         offset: 100,
          //         color: "inherit",
          //       },
          //     ],
          //   },
          // ]}
          fill={[
            {
              match: {
                id: "CAN",
              },
              id: "dots",
            },
            {
              match: {
                id: "CHN",
              },
              id: "lines",
            },
            {
              match: {
                id: "ATA",
              },
              id: "gradient",
            },
          ]}
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "#444444",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
