import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonToolbar, Modal} from 'reactstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import {hideModal} from "../../redux/actions/modalActions";
import {FormattedMessage} from 'react-intl'

class ModalBase extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        btn: PropTypes.string.isRequired
    };

    toggle = () => {
        this.props.dispatch(hideModal({name: 'modal_base'}));
    };

    render() {
        const data = _.get(this.props.modal['modal_base'], 'data', {});
        const show = _.get(this.props.modal['modal_base'], 'show', false);
        const callback = _.get(data, 'callback', () => null);
        const title = _.get(data, 'title', null);
        const message = _.get(data, 'message', null);

        let Icon;

        switch (this.props.color) {
            case 'primary':
                Icon = <span className='lnr lnr-pushpin modal__title-icon'/>;
                break;
            case 'success':
                Icon = <span className='lnr lnr-thumbs-up modal__title-icon'/>;
                break;
            case 'warning':
                Icon = <span className='lnr lnr-flag modal__title-icon'/>;
                break;
            case 'danger':
                Icon = <span className='lnr lnr-cross-circle modal__title-icon'/>;
                break;
            default:
                break;
        }

        return (
            <div>
                <Modal isOpen={show} toggle={this.toggle}
                       className={`modal-dialog--${this.props.color} ${this.props.colored ? 'modal-dialog--colored' : ''} ${this.props.header ? 'modal-dialog--header' : ''}`}>
                    <div className='modal__header'>
                        <span className='lnr lnr-cross modal__close-btn' onClick={this.toggle}/>
                        {this.props.header ? '' : Icon}
                        <h4 className='bold-text  modal__title'>{title}</h4>
                    </div>
                    <div className='modal__body'>
                        {message}
                    </div>
                    <ButtonToolbar className='modal__footer'>
                        <Button outline={this.props.colored} color={this.props.color} onClick={callback}>
                            <FormattedMessage id="button.confirm"/>
                        </Button>
                        <Button onClick={this.toggle}>
                            <FormattedMessage id="button.cancel"/>
                        </Button>
                    </ButtonToolbar>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        modal: state.modal
    }
}

export default connect(mapStateToProps)(ModalBase)