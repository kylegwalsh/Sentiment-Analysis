import React, { Component } from 'react';
import { Header, Cardstack } from '../components';

export class Companies extends Component {
  render() {
    return (
      <div>
        <Header company={this.props.match.params.name}/>
        <div className="main">
          <div className="row">

            <div className="col-sm-5 col-md-3">
              <Cardstack employees={10} sentiment={90} diversity={40}/>
            </div>

            <div className="col-sm-7 col-md-9">
              <div className="row">

                <div className="col-md-6">

                </div>

                <div className="col-md-6">

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
