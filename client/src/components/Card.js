import React, { Component } from 'react';

export class Card extends Component {

  constructor(props) {
    super(props);

    this.style = {
      "background-color": props.color
    };
  }

  render() {
    return (
      <div className="card full-width" style={this.style}>
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              <h2 className="count-title">{this.props.count}</h2>
            </div>
            <div className="row">
              <h3 className="card-title">{this.props.text}</h3>
            </div>
          </div>
          <div className="col-sm-4">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
