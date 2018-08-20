import React, {PureComponent} from 'react';
import {Row, Col} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import InputTextField from '../../components/Form/InputTextField'
import InputDateTimeField from '../../components/Form/InputDateTimeField'
import validate from '../Form/Validate'
import {connect} from 'react-redux';
import _ from 'lodash';
import FormButton from './FormButton'

class FormAppointments extends PureComponent {

    render() {
        const {saveForm, valid, submitting, typeForm, color, formValues} = this.props;
        const patient = _.get(formValues, 'patient', {});
        const {firstName, lastName} = patient;
        return (
            <Row>
                <Col md={12}>
                    <form className='material-form'>
                        <h3> Record for {`${firstName} ${lastName}`} </h3>
                        <Row>
                            <Col md={8}>
                                <Field
                                    name='startTime'
                                    component={InputDateTimeField}
                                    label="Start time"
                                    isTime={true}
                                />
                            </Col>
                            <Col md={4}>
                                <Field
                                    name='duration'
                                    component={InputTextField}
                                    label="Duration"
                                />
                            </Col>
                        </Row>
                        <FormButton
                            isDisabled={!valid || submitting}
                            color={color}
                            typeForm={typeForm}
                            saveForm={() => saveForm(this.props.formValues)}
                        />
                    </form>
                </Col>
            </Row>
        )
    }
}


function mapStateToProps (state) {
    return {
        formValues: _.get(state.form['appointments'],'values', {}),
        initialValues: state.content['appointments'].current
    }
}

export default connect(mapStateToProps)(reduxForm({form: 'appointments', enableReinitialize: true, validate})(FormAppointments))