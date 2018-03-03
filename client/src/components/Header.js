import React, { Component } from 'react';
import { FilterArea } from '.';
import { connect } from 'react-redux';
import * as actions from '../actions'
import $ from 'jquery';

class _Header extends Component {

  // Remove filters
  clearFilters(e) {
    e.stopPropagation();
    this.props.clearFilters();
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="row">
            <div className="col-sm-9">
              <h1 className="company-title">
                {this.props.company}
              </h1>
            </div>
            <div className="col-md-offset-1 col-md-2 col-sm-3">
              <div className="filter-btn">
                <a className="btn btn-primary full-width" onClick={() => $('.filter-area').slideToggle()}>Filter</a>
                <a className="clear-filters-btn btn-red" onClick={(e) => this.clearFilters(e)}><i className="fa fa-close"></i></a>
              </div>
            </div>
          </div>
        </div>
        <FilterArea/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export const Header = connect(mapStateToProps, actions)(_Header);
