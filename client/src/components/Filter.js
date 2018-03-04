import React, { Component } from 'react';

export class Filter extends Component {

  generateOptions() {
    return this.props.options.map((option, index) => {
      return(<option key={index} value={option}>{option}</option>);
    });
  }

  render() {
    return (
      <div className="col-lg-3 col-sm-4">
        <div className="row">
          <div className="col-sm-12">
            <h4>{this.props.title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <select value={this.props.value} onChange={this.props.handleChange} className="select-options">
              <option value="">None</option>
              {this.generateOptions()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
