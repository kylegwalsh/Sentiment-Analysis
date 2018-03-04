import React, { Component } from 'react';
import { Header, Cardstack } from '../components';
import { Pie, Line } from 'react-chartjs-2';

export class Companies extends Component {
  render() {

    // Time line
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

    const lineData = {
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
          fill: false,
          borderColor: '#0092D6',
          backgroundColor: '#0092D6'
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

    // Gender pie
    const blues = [
      "#A3E2FF",
      "#5BCBFF",
      "#24B8FD",
      "#0092D6",
      "#0072A7",
      "#004F74",
      "#003a55"
    ];

    const genderData = {
    	labels: [
    		'Male',
    		'Female',
    		'Non-binary'
    	],
    	datasets: [{
    		data: [300, 50, 100],
    		backgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		],
    		hoverBackgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    		]
    	}]
    };

    // Ethnicity pie
    const ethnicityData = {
      labels: [
        'Male',
        'Female',
        'Non-binary'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

    // Sentiment pie
    const sentimentData = {
      labels: [
        'Male',
        'Female',
        'Non-binary'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

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
                    <Pie data={sentimentData}/>
                  </div>
                </div>
                <div className="col-md-6 flex-column-parent flex-child-1">
                  <div className="chart-panel flex-child-1" style={{"marginBottom":"20px"}}>
                    <Line data={lineData}/>
                  </div>
                </div>
              </div>

              <div className="row flex-child-1 flex-desktop">
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    <Pie data={ethnicityData}/>
                  </div>
                </div>
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    <Pie data={genderData}/>
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
