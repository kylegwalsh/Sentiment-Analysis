import React, { Component } from 'react';
import { Header, Cardstack } from '../components';
import { Pie, Line } from 'react-chartjs-2';

export class Companies extends Component {
  render() {
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
                    <Pie data={{1:10, 2:5, 3:4}}/>
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