import React, {PureComponent} from 'react';
import {Row, Col} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import InputTextField from '../../components/Form/InputTextField'
import InputDateTimeField from '../../components/Form/InputDateTimeField'
import validate from '../Form/Validate'
import {connect} from 'react-redux';
import _ from 'lodash';
import FormButton from './FormButton'

class FormPatients extends PureComponent {

   render() {
        const {saveForm, valid, submitting, typeForm, color} = this.props;
        return (
            <Row>
                <Col md={12}>
                    <form className='material-form'>
                        <Row>
                            <Col md={12}>
                            <Field
                                name='firstName'
                                component={InputTextField}
                                label="First name"
                            />
                            </Col>
                            <Col md={12}>
                                <Field
                                    name='lastName'
                                    component={InputTextField}
                                    label="Last name"
                                />
                            </Col>
                            <Col md={12}>
                                <Field
                                    name='birthdate'
                                    component={InputDateTimeField}
                                    label="Date of birth"
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
        formValues: _.get(state.form['patients'],'values', {}),
        initialValues: state.content['patients'].current
    }
}

export default connect(mapStateToProps)(reduxForm({form: 'patients', enableReinitialize: true, validate})(FormPatients))