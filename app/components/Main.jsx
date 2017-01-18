import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import * as Redux from 'react-redux';
var discogsAPI = require('discogsAPI');
import {connect} from 'react-redux';
import Shelf from 'Shelf';
var $ = require('jquery');

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import moment from 'moment';

import * as actions from 'actions';

export class Main extends React.Component {

  constructor (props) {
    super(props);
    // this.onLogin = this.onLogin.bind(this);
  }



  handleAddShelf (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var newPage = {
      editable: false,
      number: moment().unix(),
      name: "New Shelf",
      records: []
    }
    dispatch(actions.addPage(newPage));
  }

  onLogin() {
    var {dispatch} = this.props;
    this.refs.btn.setAttribute("disabled", "disabled");
    dispatch(actions.startLogin());
  }

  componentDidMount() {
    var that = this;

    var x = 1;

    setInterval(function() {

    if (x <= 3) {
      discogsAPI.getPage(x).then(function (data) {
        var {dispatch} = that.props;
        dispatch(actions.addPage(data.page))
        dispatch(actions.nowLoaded())
      }, function (e) {
        });
      }
      else return;
      x++;
    }, 2000);

    var {dispatch} = this.props;
  }

  render() {
    var {pages, isLoaded} = this.props

    var renderButton = () => {
      if (isLoaded) {
        return (
          <button className="add-page" onClick={this.handleAddShelf.bind(this)}>Add a New Shelf!</button>
        )
      }
    }

    var renderShelves = () => {
      if (isLoaded){
        if (pages.length > 1) {
          pages.sort((a, b) => {
            if(a.number > b.number) {
              return -1;
            } else if (a.number < b.number) {
              return 1;
            } else {
              return 0
            }
          });
          return pages.map((shelf) => {
            return (
              <Shelf key={shelf.number} {...shelf}/>
            )
          });
        } else {
          return pages.map((shelf) => {
            return (
              <Shelf key={shelf.number} {...shelf}/>
            )
          })
        }
      } else {
        return (
          <p>Loading........</p>
        )
      }

    }
    return (
      <div>
        <p></p>
        {renderButton()}
        {renderShelves()}
      </div>
    );
  }
};

Main = DragDropContext(HTML5Backend)(Main);
export default connect(
  (state) => {
    return state;
  }
)(Main);
