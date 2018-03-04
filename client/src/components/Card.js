import React, { Component } from 'react';

export class Card extends Component {

  constructor(props) {
    super(props);

    this.style = {
      "backgroundColor": props.color,
      "color": props.iconColor
    };
  }

  render() {
    return (
      <div className="card full-width flex-child-1" style={this.style}>
        <div className="col-sm-6">
          <div className="col-sm-12">
            <h2 className="count-title">{this.props.count}</h2>
          </div>
          <div className="col-sm-12">
            <h3 className="card-title">{this.props.text}</h3>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
