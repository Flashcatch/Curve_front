import React, {PureComponent} from 'react';
import {Row, Col} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import InputTextField from '../../components/Form/InputTextField'
import InputDateTimeField from '../../components/Form/InputDateTimeField'
import validate from '../Form/Validate'
import {connect} from 'react-redux';
import _ from 'lodash';
import FormButton from './FormButton'
import InputGroupCheckboxField from '../../components/Form/InputGroupCheckboxField';

class FormBlockBookings extends PureComponent {

   render() {
        const {saveForm, valid, submitting, typeForm, color} = this.props;
        const options = [
            {id: 1, name: "Monday"},
            {id: 2, name: "Tuesday"},
            {id: 3, name: "Wednesday"},
            {id: 4, name: "Thursday"},
            {id: 5, name: "Friday"},
            {id: 6, name: "Saturday"},
            {id: 7, name: "Sunday"}
        ];
        return (
            <Row>
                <Col md={12}>
                    <form className='material-form'>
                        <Row>
                            <Col md={12}>
                            <Field
                                name='description'
                                component={InputTextField}
                                label="Description"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Field
                                    name='startTime'
                                    component={InputDateTimeField}
                                    label="Start time"
                                    isTime = {true}
                                />
                            </Col>
                            <Col md={6}>
                                <Field
                                    name='duration'
                                    component={InputTextField}
                                    label="Duration"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                            <Field
                                name='finishTime'
                                component={InputDateTimeField}
                                label="Finish time"
                            />
                            </Col>
                            <Col md={6}>
                                <Field
                                    name='recurType'
                                    options = {options}
                                    component={InputGroupCheckboxField}
                                    label='Select the day of the week'
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
        formValues: _.get(state.form['blockbookings'],'values', {}),
        initialValues: state.content['blockbookings'].current
    }
}

export default connect(mapStateToProps)(reduxForm({form: 'blockbookings', enableReinitialize: true, validate})(FormBlockBookings))