import React, {PureComponent} from 'react';
import TopbarSidebarButton from './TopbarSidebarButton';

export default class Topbar extends PureComponent {
  render() {
    return (
      <div className='topbar'>
        <div className='topbar__wrapper'>
          <TopbarSidebarButton/>
        </div>
      </div>
    )
  }
}