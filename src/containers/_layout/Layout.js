import React, {Component} from 'react';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Topbar/>
        <Sidebar/>
      </div>
    )
  }
}
