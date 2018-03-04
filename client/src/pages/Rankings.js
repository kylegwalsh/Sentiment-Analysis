import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from "react-redux";
import * as actions from "../actions";

class _Rankings extends Component {
  render() {
    return (
      <div>
        <Header noFilter company={'Sentissimo'} />
        <div>

        </div>
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: () => {
                this.props.history.push(`/companies/${rowInfo.original.name}`);
              }
            }
          }}
          data={this.props.companies}
          columns={[
            {
              Header: 'Companies',
              columns: [
                {
                  Header: 'Name',
                  accessor: 'name'
                },
                {
                  Header: 'Sentiment Score',
                  accessor: 'sentiment'
                },
                {
                  Header: 'Diversity Score',
                  accessor: 'diversity'
                }
              ]
            }
          ]}
          defaultPageSize={5}
          className='-striped -highlight'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companies: state.companies.information
  };
};

export const Rankings = connect(mapStateToProps, actions)(_Rankings);
