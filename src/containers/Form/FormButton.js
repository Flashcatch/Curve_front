import React, {PureComponent} from 'react';
import {Row, Col, Button, ButtonToolbar} from 'reactstrap';
import {connect} from 'react-redux';
import {hideModal} from "../../redux/actions/modalActions";
import {FormattedMessage} from 'react-intl'

class FormButton extends PureComponent {

    render() {
        const {saveForm, isDisabled, typeForm, color} = this.props;
        return (
            <Row>
                <Col md={12}>
                    <ButtonToolbar className='form__button-toolbar'>
                        <Button color={color} onClick={saveForm}
                                disabled={isDisabled}>
                            {(typeForm === 'create') ? <FormattedMessage id="button.save"/> : <FormattedMessage id="button.update"/>}
                        </Button>
                        <Button type='button' onClick={() => this.props.dispatch(hideModal({name: 'modal_form'}))}>
                            <FormattedMessage id="button.cancel"/>
                        </Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        )
    }
}

export default connect()(FormButton)