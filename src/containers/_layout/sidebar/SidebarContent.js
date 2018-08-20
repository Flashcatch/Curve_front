import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {changeThemeToDark, changeThemeToLight, changeThemeToVovan} from '../../../redux/actions/themeActions';
import {changeSidebarLink} from '../../../redux/actions/sidebarActions';
import {FormattedMessage} from 'react-intl'

class SidebarContent extends PureComponent {
  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
    this.hideSidebar();
  };
  
  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
    this.hideSidebar();
  };

    changeToVovan= () => {
        this.props.dispatch(changeThemeToVovan());
        this.hideSidebar();
    };
  
  hideSidebar = (who) => {
    this.props.dispatch(changeSidebarLink({key: who}));
  };
  
  render() {
    return (
      <div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarCategory title={<FormattedMessage id="menu.theme"/>} icon='layers'>
            <li className='sidebar__link' onClick={this.changeToLight}>
              <p className='sidebar__link-title'>{<FormattedMessage id="menu.theme.light"/>}</p>
            </li>
            <li className='sidebar__link' onClick={this.changeToDark}>
              <p className='sidebar__link-title'>{<FormattedMessage id="menu.theme.dark"/>}</p>
            </li>
            <li className='sidebar__link' onClick={this.changeToVovan}>
              <p className='sidebar__link-title'>{<FormattedMessage id="menu.theme.gray"/>}</p>
            </li>
          </SidebarCategory>
        </ul>
        <ul className='sidebar__block'>
          <SidebarLink title={<FormattedMessage id="menu.schedule"/>} route='/schedule' onClick={this.hideSidebar}/>
          <SidebarLink title={<FormattedMessage id="menu.block_bookings"/>} route='/block_bookings' onClick={this.hideSidebar}/>
          <SidebarLink title={<FormattedMessage id="menu.all_patients"/>} route='/all_patients' icon='users' onClick={this.hideSidebar}/>
        </ul>
      </div>
    )
  }
}

export default connect()(SidebarContent);