import "./App.css";

import { ResponsiveChoropleth } from "@nivo/geo";
import { artists } from "./data";
import countryCodes from "./assets/country_codes.json";
import { groupBy } from "lodash";
import worldCountries from "./assets/world_countries.json";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { ResponsiveBar } from "@nivo/bar";

function App() {

  artists.forEach(artist => artist.decade = Math.floor(artist.debut_album_year / 10) * 10)
  console.log(artists);
  const groupByCountries = groupBy(artists, (artist) => artist.country);
  const groupByGenre = groupBy(artists, (artist) => artist.genre);
  const groupByDecade = groupBy(artists, (artist) => artist.decade);


  const decadeAndYear = Object.entries(groupByDecade).map(([decade, artists]) => {
    const groupByYear = groupBy(artists, (artist) => artist.debut_album_year);
    const yearCount = Object.entries(groupByYear).map(
      ([year, artists]) => [
        year,
         artists.length,
      ]
    );
    return { decade, ...yearCount }
  })

  console.log(decadeAndYear)
  const countryCount = Object.entries(groupByCountries).map(
    ([country, artists]) => ({
      id: countryCodes.find(
        (code) => code.let2.toLocaleLowerCase() === country.toLocaleLowerCase()
      )?.let3,
      value: artists.length,
    })
  );

  const genreCount = Object.entries(groupByGenre).map(
    ([genre, artists]) => ({
      name: genre,
      count: artists.length,
    })
  );

  console.log(groupByGenre);
  console.log(genreCount);

  return (
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
      <ResponsiveTreeMap
        data={{
          "name": "Genre",
          "color": "hsl(103, 70%, 50%)",
          "children": genreCount
        }}
        identity="name"
        value="count"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        label={e => e.id + " (" + e.formattedValue + ")"}
        labelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.2
            ]
          ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.1
            ]
          ]
        }}
      />
      <ResponsiveBar
        data={decadeAndYear}
        keys={[]}
        indexBy="decade"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'fries'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'sandwich'
            },
            id: 'lines'
          }
        ]}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
      />
    </div>
  );
}

export default App;
