import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';
import {NavLink, withRouter} from 'react-router-dom';
// import changeSidebarLink from '../../../redux/reducers/sidebarReducer'

class SidebarLink extends PureComponent {
  static propTypes = {
    // title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    new: PropTypes.bool,
    route: PropTypes.string
  };

  onClickLink = (who) => {
    this.props.onClick(who);
  };
  
  render() {
    return (
      <NavLink to={this.props.route ? this.props.route : '/'}
               onClick={() => this.onClickLink(this.props.route)}
               activeClassName='sidebar__link-active'>
        <li className='sidebar__link'>
          {this.props.icon ? <span className={`sidebar__link-icon lnr lnr-${this.props.icon}`}/> : ''}
          <p className='sidebar__link-title'>
            {this.props.title}
            {this.props.new ? <Badge className='sidebar__link-badge'><span>New</span></Badge> : ''}
          </p>
        </li>
      </NavLink>
    )
  }
}

export default withRouter(SidebarLink);