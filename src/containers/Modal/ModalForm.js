import React, {PureComponent} from 'react';

import PropTypes from 'prop-types';
import {Modal} from 'reactstrap';

import {connect} from 'react-redux';
import _ from 'lodash';
import {hideModal} from "../../redux/actions/modalActions";

import FormPatients from '../../containers/Form/FormPatients';
import FormBlockBookings from '../../containers/Form/FormBlockBookings';
import FormAppointments from '../../containers/Form/FormAppointments';

class ModalForm extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        color: PropTypes.string.isRequired,
        colored: PropTypes.bool,
        header: PropTypes.bool,
        btn: PropTypes.string.isRequired
    };

    toggle = () => {
        this.props.dispatch(hideModal({name: 'modal_form'}));
    };

    renderForm = (name_form, saveForm, typeForm, color) => {
        switch( name_form ) {
            case 'patients':
                return <FormPatients saveForm = {saveForm} typeForm = {typeForm} color={color}/>
            case 'blockbookings':
                return <FormBlockBookings saveForm = {saveForm} typeForm = {typeForm} color={color}/>
            case 'appointments':
                return <FormAppointments saveForm = {saveForm} typeForm = {typeForm} color={color}/>
            default:
                return <div />
        }
    };

    render() {
        const data = _.get(this.props.modal['modal_form'], 'data', {});
        const show = _.get(this.props.modal['modal_form'], 'show', false);
        const name_form = _.get(data, 'name_form', '');
        const saveForm = _.get(data, 'saveForm', ()=>null);
        const typeForm = _.get(data, 'typeForm', null);
        const color = _.get(data, 'color', null);
        const title = _.get(data, 'title', null);

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
                <Modal style={{width: '800px', maxWidth: '800px'}} size='lg' isOpen={show} toggle={this.toggle}
                       className={`modal-dialog--${color} ${this.props.colored ? 'modal-dialog--colored' : ''} ${this.props.header ? 'modal-dialog--header' : ''}`}>
                    <div className='modal__header'>
                        <span className='lnr lnr-cross modal__close-btn' onClick={this.toggle}/>
                        {this.props.header ? '' : Icon}
                        <h4 className='bold-text  modal__title'>{title}</h4>
                    </div>
                    <div className='modal__body'>
                        {this.renderForm(name_form, saveForm, typeForm, color)}
                    </div>
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

export default connect(mapStateToProps)(ModalForm)