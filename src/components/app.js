import { Component } from "preact";
import { useState } from "preact/hooks";
import CombinedRiskPlot from "./CombinedRiskPlot";

import { mortality, score_table, scoreColors } from "./data";

const Results = ({ score }) => {
  return score !== null ? (
    <>
      <p class="centered" style={{ border: `solid 4px ${scoreColors[score]}` }}>
        <span
          style={{
            fontSize: "4em",
          }}
        >
          <b>{score}</b>/21
        </span>{" "}
        <br />
        (higher is worse)
      </p>
      <CombinedRiskPlot score={score} />
    </>
  ) : (
    <p>
      <b>
        Please select a value for every variable to calculate a mortality score.
      </b>
    </p>
  );
};

const Intro = () => (
  <>
    <p>
      The 4C Mortality Score is a risk stratification score that predicts
      in-hospital mortality for hospitalised COVID-19 patients, produced by the{" "}
      <a href="https://isaric4c.net/">ISARIC 4C consortium</a>.{" "}
      <b>It is intended for use by clinicians.</b>
    </p>
    <p>
      It is designed to be easy-to-use, and require only parameters that are
      commonly available at hospital presentation.
    </p>
    <p>
      It is based on a UK cohort of patients, and should not be adopted for
      routine clinical use in other settings until it has been appropriately
      validated.
    </p>
    <p>
      For full details, see
      <a href="https://doi.org/10.1136/bmj.m3339"> the paper</a> introducing the
      score.
    </p>
    <p>
      This page is an infographic that visualises risk, based on observed
      mortality among hospitalised adult COVID19 patients recruited into the
      ISARIC 4C study in the UK.{" "}
    </p>
  </>
);

const round = (num) => Math.round((num + Number.EPSILON) * 10) / 10;
const Explanation = ({ short_names }) => (
  <details style={{ border: "1px solid lightgrey", "border-radius": "5px" }}>
    <summary>How this calculation is done</summary>
    <p>
      The calculation is simple, and can be done without even requiring a
      calculator.
    </p>
    <p>
      The ISARIC4C score is obtained by adding the scores for each individual
      variable (see Table 2 of{" "}
      <a href="https://doi.org/10.1136/bmj.m3339"> the paper</a>). The
      contributions to the total score are:
    </p>

    <div style={{ width: "max-content", margin: "auto" }}>
      {short_names.map((n) => {
        const details = score_table[n];
        return (
          <>
            <table
              style={{
                "padding-bottom": "10px",
                "margin-left": "auto",
                "margin-right": "0",
                "text-align": "right",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      "border-bottom": "1px solid black",
                      "max-width": "180px",
                    }}
                  >
                    {details.name}
                  </th>
                  <th style={{ "border-bottom": "1px solid black" }}>Score</th>
                </tr>
              </thead>
              {Object.keys(details.scores).map((value, i) => (
                <tr
                  style={{
                    background: i % 2 == 0 ? "white" : "#ebebeb",
                  }}
                >
                  <td>{value}</td>
                  <td>+{details.scores[value]}</td>
                </tr>
              ))}
            </table>
          </>
        );
      })}
    </div>
    <p>
      The observed in-hospital mortality for patients with this score in the
      validation cohort is then given by a lookup table (see Figure 2 of{" "}
      <a href="https://doi.org/10.1136/bmj.m3339"> the paper</a>):
    </p>

    <table
      style={{
        "padding-bottom": "10px",
        margin: "auto",
        "text-align": "right",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              "border-bottom": "1px solid black",
            }}
          >
            4C Mortality Score
          </th>
          <th style={{ "border-bottom": "1px solid black" }}>Mortality/%</th>
        </tr>
      </thead>

      {mortality.slice(1).map((val, i) => (
        <tr style={{ background: i % 2 == 0 ? "white" : "#ebebeb" }}>
          <td>{i + 1}</td>
          <td>{round(val)}</td>
        </tr>
      ))}
    </table>
  </details>
);

const WhatYouShouldDo = () => (
  <div>
    <h2>What you should do</h2>
    <p>
      It is important that <i>everyone</i> follows the Government's advice on{" "}
      <a href="https://www.gov.uk/government/publications/staying-alert-and-safe-social-distancing">
        Staying alert and safe (social distancing)
      </a>
      , and on{" "}
      <a href="https://www.gov.uk/government/publications/covid-19-stay-at-home-guidance">
        self-isolating
      </a>{" "}
      if they or someone in their household has symptoms of COVID-19. This is
      important not only to protect yourself, but also to prevent you from
      accidentally infecting more vulnerable people.
    </p>

    <p>
      People who are defined as extremely vulnerable on medical grounds should
      also follow the government's{" "}
      <a href="https://www.gov.uk/government/publications/guidance-on-shielding-and-protecting-extremely-vulnerable-persons-from-covid-19">
        advice on shielding
      </a>
      .
    </p>

    <p>
      If you think that you might have COVID-19, you should stay at home and
      consult the{" "}
      <a href="https://www.nhs.uk/conditions/coronavirus-covid-19/check-if-you-have-coronavirus-symptoms/">
        NHS Website
      </a>{" "}
      for advice.
    </p>
  </div>
);

const Measurement = ({ short_name, f, selection, handleSelection }) => {
  const [usingAltUnits, setUsingAltUnits] = useState(false);

  const details = (help) =>
    help && (
      <details>
        <summary>Definition</summary>
        {help}
      </details>
    );

  const SwitchButton = () => {
    if (!f.altName) {
      return null;
    }

    return (
      <button
        onClick={() => setUsingAltUnits(!usingAltUnits)}
        class="units-button"
      >
        Use {usingAltUnits ? f.name : f.altName}
      </button>
    );
  };

  const scores = usingAltUnits ? f.altScores : f.scores;
  const values = f.order ? f.order : Object.keys(scores);
  const name = usingAltUnits ? f.altName : f.name;
  const help = f.help;

  return (
    <>
      <label for={short_name}>
        {name}:{details(help)}
      </label>

      <div id={short_name} role="group" class="btn-group">
        {values.map((value) => (
          <button
            class={
              selection[short_name] === value
                ? "btn btn-secondary"
                : "btn btn-outline-secondary"
            }
            onclick={() => handleSelection(value, scores[value])}
          >
            {value}
            <br />
            (+{scores[value]})
          </button>
        ))}
      </div>

      <SwitchButton />
    </>
  );
};

export default class App extends Component {
  render() {
    const [state, setState] = useState({
      selection: {},
      scoreContribution: {},
    });

    const short_names = Object.keys(score_table);
    const scores_array = short_names.map((f) => score_table[f]);

    let score = 0;
    if (Object.keys(state.selection).length < scores_array.length) {
      score = null;
      console.log("Score not set");
    } else {
      score = Object.values(state.scoreContribution).reduce((a, b) => a + b, 0);
    }

    return (
      <div id="app">
        <base target="_parent" />

        <h1>4C Mortality Score</h1>

        <Intro />

        <Explanation short_names={short_names} />

        <div
          style={{
            "max-width": "max-content",
            margin: "auto auto 2em 0",
          }}
        >
          {scores_array.map((f, i) => {
            const short_name = short_names[i];

            const handleSelection = (newValue, scoreContribution) => {
              setState({
                selection: { ...state.selection, [short_name]: newValue },
                scoreContribution: {
                  ...state.scoreContribution,
                  [short_name]: scoreContribution,
                },
              });
            };

            return (
              <div class="measurement">
                <Measurement
                  f={f}
                  short_name={short_name}
                  selection={state.selection}
                  handleSelection={handleSelection}
                />
              </div>
            );
          })}
        </div>

        <Results score={score} />
        <br />
        <WhatYouShouldDo />
      </div>
    );
  }
}
