import React, { Component } from 'react';
import { Header, Cardstack } from '../components';
import { Pie, Line } from 'react-chartjs-2';

export class Companies extends Component {
  render() {

    const today = new Date();
    const month = today.getMonth();

    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    const data = {
      labels: [
        MONTHS[month-5 < 0 ? month+7 : month-5],
        MONTHS[month-4 < 0 ? month+8 : month-4],
        MONTHS[month-3 < 0 ? month+9 : month-3],
        MONTHS[month-2 < 0 ? month+10 : month-2],
        MONTHS[month-1 < 0 ? month+11 : month-1],
        MONTHS[month]
      ],
      datasets: [
        {
          label: "Sentiment Over Time",
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ],
          fill: false
        }
      ]
    }

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'label'
      },
      hover: {
        mode: 'dataset'
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Month'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Value'
            },
            ticks: {
              suggestedMin: -10,
              suggestedMax: 250
            }
          }
        ]
      }
    }
    return (
      <div className="full-screen flex-column-parent">
        <Header company={this.props.match.params.name}/>
        <div className="main flex-column-parent flex-child-1">
          <div className="row flex-child-1 flex-tablet">

            <div className="col-sm-5 col-md-3 flex-column-parent flex-child-1">
              <Cardstack employees={10} sentiment={90} diversity={40}/>
            </div>

            <div className="col-sm-7 col-md-9 flex-column-parent chart-area">

              <div className="row flex-child-1 flex-desktop">
                <div className="col-md-6 flex-column-parent flex-child-1">
                  <div className="chart-panel flex-child-1" style={{"marginBottom":"20px"}}>
                    <Line data={data}/>
                  </div>
                </div>
                <div className="col-md-6 flex-column-parent flex-child-1">
                  <div className="chart-panel flex-child-1" style={{"marginBottom":"20px"}}>
                    HI
                  </div>
                </div>
              </div>

              <div className="row flex-child-1 flex-desktop">
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    HI
                  </div>
                </div>
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    HI
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}
