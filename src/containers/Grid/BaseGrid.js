import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {connect} from 'react-redux';
import {postOne, fetchOne, deleteOne, patchOne} from "../../redux/modules/requestAxios";
import {Col, Row, Button} from 'reactstrap';
import _ from 'lodash';
import {hideModal, showModal} from "../../redux/actions/modalActions";
import ModalBase from '../../containers/Modal/ModalBase'
import ModalForm from '../../containers/Modal/ModalForm'
import Loader from '../../components/Loader'
import {receiveContent} from "../../redux/actions/contentActions";
import {FormattedMessage} from 'react-intl'
import PanelDate from './PanelDate'

class BaseGrid extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            rows: [],
            page: 1,
            loading: false,
            currentId: null
        };
    }

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    RefreshGrid(params = null) {
        const {entity} = this.props;
        this.setState({loading: true});
        const callback = (res) => {
            this.setState({rows: res.data, currentId: null});
            setTimeout(() => this.setState({loading: false}), 500);
        };
        this.props.dispatch(fetchOne(
            {
                url: entity,
                key: entity,
                callback: callback,
                errorCallback: callback,
                params: {params}
            }
        ));
    }

    componentDidMount() {
        this.RefreshGrid();
    };

    onChangePage = (page) => {
        if (page) {
            this.setState({page: page});
            this.RefreshGrid(page);
        }
    };

    onRowClick = (rowIdx, row) => {
        if (row) {
            let rows = this.state.rows.slice();
            const prevInd = _.findIndex(rows, {isSelected: true});
            if (prevInd !== -1) rows[prevInd] = Object.assign({}, rows[prevInd], {isSelected: false});
            rows[rowIdx] = Object.assign({}, row, {isSelected: true});
            this.setState({rows, currentId: row.id});
        }
    };

    clickDelete = () => {
        const {currentId} = this.state;
        const {entity} = this.props;
        const deleteForm = () => {
            this.props.dispatch(hideModal({name: 'modal_base', data: {}}));
            const callback = (res) => {
                this.RefreshGrid();
            };
            this.props.dispatch(deleteOne(
                {
                    url: `${entity}/${currentId}`,
                    key: entity,
                    callback: callback,
                    errorCallback: callback,
                    params: {}
                }
            ));
        };
        this.props.dispatch(showModal({
            name: 'modal_base',
            data: {
                title: <FormattedMessage id="title.delete_record"/>,
                message: <FormattedMessage id="message.delete_record"/>,
                callback: deleteForm
            }
        }));
    };

    clickCreate = (changeEntity = null) => {
        const entity = changeEntity || this.props.entity;
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
                    params: values
                }
            ));
        };
        if (!changeEntity) this.props.dispatch(receiveContent({
            isCurrent: true,
            key: entity,
            data: {}
        }));
        this.props.dispatch(showModal({
            name: 'modal_form', data: {
                name_form: entity,
                color: 'success',
                title: <FormattedMessage id="title.create_record"/>,
                typeForm: 'create',
                saveForm: saveForm
            }
        }));
    };

    clickCreateSchedule = () => {
        const entity = 'appointments';
        const row = _.find(this.state.rows, {id: this.state.currentId});
        this.props.dispatch(receiveContent({
            isCurrent: true,
            key: entity,
            data: {"patient": row}
        }));
        this.clickCreate('appointments');
    };

    clickUpdate = () => {
        const {currentId} = this.state;
        const {entity} = this.props;
        const callback = (res) => {
            this.startUpdate();
        };
        this.props.dispatch(fetchOne(
            {
                url: `${entity}/${currentId}`,
                key: entity,
                callback: callback,
                errorCallback: callback,
                params: {current: true}
            }
        ));
    };

    startUpdate = () => {
        const {currentId} = this.state;
        const {entity} = this.props;
        const updateForm = values => {
            const callback = (res) => {
                this.props.dispatch(hideModal({name: 'modal_form', data: {}}));
                this.RefreshGrid();
            };
            this.props.dispatch(patchOne(
                {
                    url: `${entity}/${currentId}`,
                    key: entity,
                    callback: callback,
                    errorCallback: callback,
                    params: values
                }
            ));
        };
        this.props.dispatch(showModal({
            name: 'modal_form', data: {
                name_form: entity,
                color: 'warning',
                title: <FormattedMessage id="title.edit_record"/>,
                typeForm: 'update',
                saveForm: updateForm
            }
        }));
    };

    render() {
        const {rows, currentId, loading} = this.state;
        const {entity} = this.props;
        const hideCrud = _.get(this.props, 'hideCrud', false);
        const isDisabled = (currentId) ? false : true;
        return (
            <div className='table'>
                <Loader show={loading}>
                    {entity==='appointments' &&
                        <div style={{display: 'flex'}}>
                        <PanelDate callback={::this.RefreshGrid} />
                        <Button style={{marginLeft: '10px'}} color='danger' size='sm' disabled={isDisabled}
                                onClick={::this.clickDelete}>
                            {<FormattedMessage id="button.delete"/>}
                        </Button>
                        </div>
                    }
                    <ModalBase color='danger' btn='Danger'/>
                    <ModalForm color='primary' header btn='Default'/>
                    <ReactDataGrid
                        columns={this.props.heads}
                        rowGetter={this.rowGetter}
                        rowsCount={rows.length}
                        rowHeight={44}
                        minHeight={'80vh'}
                        minColumnWidth={100}
                        enableRowSelect={true}
                        rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                                isSelectedKey: 'isSelected'
                            }
                        }}
                        onRowClick={this.onRowClick}
                    />
                    {!hideCrud && <Row className="pagination_grid_record" style={{float: 'right'}}>
                        <Col md={12}>
                            <Button color='success' size='sm'
                                    onClick={() => this.clickCreate(null)}>
                                {<FormattedMessage id="button.create"/>}
                            </Button>
                            {entity!=='blockbookings' && <Button color='warning' size='sm' disabled={isDisabled}
                                    onClick={::this.clickUpdate}>
                                {<FormattedMessage id="button.edit"/>}
                            </Button>}
                            <Button color='danger' size='sm' disabled={isDisabled}
                                    onClick={::this.clickDelete}>
                                {<FormattedMessage id="button.delete"/>}
                            </Button>
                            {entity==='patients' && <Button color='primary' size='sm' disabled={isDisabled}
                                    onClick={::this.clickCreateSchedule}>
                                <span>
                                    <i className="fa fa-plus" style={{marginRight : '5px'}}> </i>
                                </span>
                                {'Add appointment'}
                            </Button>}
                        </Col>
                    </Row>}
                </Loader>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        content: state.content
    }
}

export default connect(mapStateToProps)(BaseGrid)
