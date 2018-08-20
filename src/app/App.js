import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/app.scss';
import 'font-awesome/css/font-awesome.min.css';
import NotificationsSystem from 'reapop';
// import theme from 'reapop-theme-wybo';
import theme from 'reapop-theme-bootstrap';

import Router from './Router';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false
    }
  }
  
  componentDidMount() {

    // window.addEventListener('load', () => {
    //   this.setState({loading: false});
    //   setTimeout(() => this.setState({loaded: true}), 100);
    // });
  }
  
  render() {
    // const loaded = this.state.loaded;
    return (
      <div>
        {/*{!loaded && <div className={`load${loaded ? '' : ' loaded'}`}>*/}
          {/*<div className='load__icon-wrap'>*/}
            {/*<svg className='load__icon'>*/}
              {/*<path fill='#4ce1b6' d='M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z'/>*/}
            {/*</svg>*/}
          {/*</div>*/}
        {/*</div>}*/}
        <div>
          <NotificationsSystem theme={theme}/>
          <Router/>
        </div>
      </div>
    )
  }
}

export default App;
