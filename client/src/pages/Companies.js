import React, { Component } from 'react';
import { Header, Cardstack } from '../components';
import { Pie, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

class _Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };

    this.blues = [
      "#A3E2FF",
      "#5BCBFF",
      "#24B8FD",
      "#0092D6",
      "#0072A7",
      "#004F74",
      "#003a55"
    ];
  }

  componentWillMount() {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson)
        this.setState({ companies: resJson.companies });
      });

    renderSentimentPie();
    renderGenderPie();
    renderEthnicityPie();
  }

  renderSentimentPie() {
    const today = new Date();
    const month = today.getMonth();
    const {companies} = this.state;
    const {gender, marital} = this.props.filters;

    this.ethnicityData = {
      labels: [
        'Positive',
        'Neutral',
        'Negative',
        'Mixed'
      ],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: [
        '#A3E2FF',
        '#24B8FD',
        '#0072A7',
        '#003a55'
        ],
        hoverBackgroundColor: [
        '#bce7fb',
        '#45b2e6',
        '#0d6b96',
        '#064b6b'
        ]
      }]
    };

    this.state.companies[this.props.match.params.name].data.forEach((row) => {
      if((month === row.time) && (!gender || gender === row.gender) && (!marital || marital === row.marital)) {
        if(row.ethnicity === "American Indian") this.ethnicityData.datasets[0] = this.ethnicity.datasets[0] + row.count;
        else if(row.gender === "Asian") this.genderData.datasets[1] = this.genderData.datasets[1] + row.count;
        else if(row.gender === "Black") this.genderData.datasets[2] = this.genderData.datasets[2] + row.count;
        else if(row.gender === "Hispanic") this.genderData.datasets[3] = this.genderData.datasets[3] + row.count;
        else if(row.gender === "Pacific Islander") this.genderData.datasets[4] = this.genderData.datasets[4] + row.count;
        else if(row.gender === "White") this.genderData.datasets[5] = this.genderData.datasets[5] + row.count;
        else this.genderData.datasets[6] = this.genderData.datasets[6] + row.count;
      }
    });
  }

  renderGenderPie() {
    const today = new Date();
    const month = today.getMonth();
    const {companies} = this.state;
    const {ethnicity, marital} = this.props.filters;

    this.genderData = {
      labels: [
        'Male',
        'Female',
        'Non-binary'
      ],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
        '#5BCBFF',
        '#0092D6',
        '#004F74'
        ],
        hoverBackgroundColor: [
        '#7ccff6',
        '#28a4de',
        '#045c85'
        ]
      }]
    };

    this.state.companies[this.props.match.params.name].data.forEach((row) => {
      if((month === row.time) && (!ethnicity || ethnicity === row.race) && (!marital || marital === row.marital)) {
        if(row.gender === "Male") this.genderData.datasets[0] = this.genderData.datasets[0] + row.count;
        else if(row.gender === "Female") this.genderData.datasets[1] = this.genderData.datasets[1] + row.count;
        else this.genderData.datasets[2] = this.genderData.datasets[2] + row.count;
      }
    });
  }

  renderEthnicityPie() {
    const today = new Date();
    const month = today.getMonth();
    const {companies} = this.state;
    const {gender, marital} = this.props.filters;

    this.ethnicityData = {
      labels: [
        'Positive',
        'Neutral',
        'Negative',
        'Mixed'
      ],
      datasets: [{
        data: [0, 0, 0, 0],
        backgroundColor: [
        '#A3E2FF',
        '#24B8FD',
        '#0072A7',
        '#003a55'
        ],
        hoverBackgroundColor: [
        '#bce7fb',
        '#45b2e6',
        '#0d6b96',
        '#064b6b'
        ]
      }]
    };

    this.state.companies[this.props.match.params.name].data.forEach((row) => {
      if((month === row.time) && (!gender || gender === row.gender) && (!marital || marital === row.marital)) {
        if(row.ethnicity === "American Indian") this.ethnicityData.datasets[0] = this.ethnicity.datasets[0] + row.count;
        else if(row.gender === "Asian") this.genderData.datasets[1] = this.genderData.datasets[1] + row.count;
        else if(row.gender === "Black") this.genderData.datasets[2] = this.genderData.datasets[2] + row.count;
        else if(row.gender === "Hispanic") this.genderData.datasets[3] = this.genderData.datasets[3] + row.count;
        else if(row.gender === "Pacific Islander") this.genderData.datasets[4] = this.genderData.datasets[4] + row.count;
        else if(row.gender === "White") this.genderData.datasets[5] = this.genderData.datasets[5] + row.count;
        else this.genderData.datasets[6] = this.genderData.datasets[6] + row.count;
      }
    });
  }

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
          data: this.calculateSentimentOverTime(),
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
        {!(Object.keys(this.state.companies).length === 0) &&
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
                {!this.props.filters.ethnicity &&
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    <Pie data={ethnicityData}/>
                  </div>
                </div>
                }
                {!this.props.filters.gender &&
                <div className="col-md-6 flex-column-parent flex-child-1" style={{"marginBottom":"20px"}}>
                  <div className="chart-panel flex-child-1">
                    <Pie data={this.genderData}/>
                  </div>
                </div>
                }
              </div>

            </div>
          </div>
        </div>
        }
      </div>
    );
  }

  calculateSentimentOverTime = () => {
    if (Object.keys(this.state.companies).length === 0) return;
    return [1, 2, 3, 4, 5, 6].map((month) => {
      return this.calculateSentiment(month)
    });
  };

  calculateSentiment = (month) => {
    const { companies } = this.state;
    const name = this.props.match.params.name;
    let sentiment = 0;
    console.log(this.props.match.params.name)
    console.log(companies)
    companies[name].data.forEach((row) => {
      const { positive, negative, mixed, neutral, count } = row;
      const sum = (0.5 * parseFloat(neutral)) + parseFloat(positive) * 3 - parseFloat(negative )- 0.1 * parseFloat(mixed);

      if (parseInt(row.time) - 1 === month) {
        sentiment += parseFloat(sum);
      }

    });
    return 100 * (sentiment / companies[name].totalCount);
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export const Companies = connect(mapStateToProps)(_Companies);
