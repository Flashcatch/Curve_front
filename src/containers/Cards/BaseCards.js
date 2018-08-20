import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'reactstrap';
import {fetchOne, postOne} from "../../redux/modules/requestAxios";
import _ from 'lodash';
import {hideModal, showModal} from "../../redux/actions/modalActions";
import ModalBase from '../../containers/Modal/ModalBase'
import ModalForm from '../../containers/Modal/ModalForm'
import Loader from '../../components/Loader'
// import Panel from '../../components/Panel'
import moment from 'moment'
import {FormattedMessage} from 'react-intl'

class BaseCards extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
        };
    }

    RefreshCards() {
        const {entity} = this.props;
        this.setState({loading: true});
        const callback = (res) => {
            setTimeout(() => this.setState({loading: false}), 500);
        };
        this.props.dispatch(fetchOne(
            {
                url: entity,
                key: entity,
                callback: callback,
                errorCallback: callback,
                params: {}
            }
        ));
    };

    componentDidMount() {
        this.RefreshCards();
    };

    clickCreate = () => {
        const {entity} = this.props;
        const saveForm = values => {
            const callback = (res) => {
                this.props.dispatch(hideModal({name: 'modal_form', data: {}}));
                this.RefreshGrid();
            };
            this.props.dispatch(postOne(
                {
                    url: entity,
                    key: entity,
                    callback: callback,
                    errorCallback: callback,
                    params: {data: values}
                }
            ));
        };
        this.props.dispatch(showModal({
            name: 'modal_form', data: {
                name_form: entity,
                color: 'success',
                title:  <FormattedMessage id="title.create_record"/>,
                typeForm: 'create',
                saveForm: saveForm
            }
        }));
    };

    render() {
        const {loading} = this.state;
        const {entity} = this.props;
        const all = _.get(this.props.content, entity, []);
        return (
            <Loader show={loading}>
                <ModalBase color='danger' btn='Danger'/>
                <ModalForm color='primary' header btn='Default'/>
                <Row>
                    <Col md={12}>
                    <Button color='success' size='sm'
                            onClick={::this.clickCreate}>
                        {<FormattedMessage id="button.create"/>}
                    </Button>
                    </Col>
                </Row>
            <Row>
                {_.map(all, (val, key) => {
                    const {firstName, lastName, birthdate} = val;
                    return (
                        <Col md={4} key={key}>
                            <div className="panel card">
                                <div className="panel__body card-body">
                                    <div className='dashboard__product float-left'>
                                        <h4 className='bold-text dashboard__product-title'>{`${firstName} ${lastName}`}</h4>
                                        <h5>{moment(birthdate).format('DD.MM.YYYY')}</h5>
                                    </div>
                                    <div className="float-right">
                                        <i
                                            className="fa fa-2x fa-file my_fa_class"
                                            style={{color: 'lightblue'}}>
                                        </i>
                                        <i
                                            className="fa fa-2x fa-trash my_fa_class"
                                            style={{color: 'red'}}>
                                        </i>
                                        <i
                                            className="fa fa-2x fa-pencil my_fa_class"
                                            style={{color: 'orange'}}>
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            </Loader>
        );
    }
}

function mapStateToProps (state) {
    return {
        content: state.content
    }
}

export default connect(mapStateToProps)(BaseCards)
