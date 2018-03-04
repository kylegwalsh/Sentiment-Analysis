import React, { Component } from 'react';
import { Card } from '.';

export class Cardstack extends Component {

  render() {
    return (
      <div>
        <Card text="Employees" count={this.props.employees} color='#5BCBFF'>
          <i className="fa fa-user"></i>
        </Card>
        <Card text="Overall Sentiment" count={this.props.sentiment} color='#24B8FD'>
          <i className="fa fa-smile"></i>
        </Card>
        <Card text="Diversity Rating" count={this.props.diversity} color='#0092D6'>
          <i className="fa fa-users"></i>
        </Card>
      </div>
    );
  }
}
