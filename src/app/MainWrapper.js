import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'
addLocaleData([...en, ...ru])

class MainWrapper extends PureComponent {
  render() {
    const theme = this.props.theme.className;
    const {locale, messages} = this.props.intl;
    return (
      <IntlProvider locale={locale} messages={messages}>
          <div className={theme}>
            <div className={this.props.sidebar.collapse ? 'wrapper wrapper--full-width' : 'wrapper'}>
              {this.props.children}
            </div>
          </div>
      </IntlProvider>
    )
  }
}

export default connect(state => {
    return {
        theme: state.theme,
        sidebar: state.sidebar,
        intl: state.intl
    }
})(MainWrapper);