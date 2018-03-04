import React, { Component } from 'react';
import { Card } from '.';

export class Cardstack extends Component {

  render() {
    return (
      <div className="card-stack flex-column-parent flex-child-1">
        <Card text="Employees" count={this.props.employees} color='#5BCBFF' iconColor='#86D9FF'>
          <i className="fa fa-user card-icon"></i>
        </Card>
        <Card text="Overall Sentiment" count={this.props.sentiment} color='#24B8FD' iconColor="#63CDFF">
          <i className="fa fa-thumbs-up card-icon"></i>
        </Card>
        <Card text="Diversity Rating" count={this.props.diversity} color='#0092D6' iconColor="#2FAAE3">
          <i className="fa fa-users card-icon"></i>
        </Card>
      </div>
    );
  }
}
