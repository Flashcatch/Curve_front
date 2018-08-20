import React, {PureComponent} from 'react';
import BaseGrid from './BaseGrid';
import FormatterTypeFiled from './Formatter/FormatterTypeFiled'
import _ from 'lodash';

export default class GridAppointments extends PureComponent {

    constructor(props) {
        super(props);
        this.heads = [
            {
                key: 'id',
                name: '#',
                width: 80
            },
            {
                key: 'startTime',
                name: 'Start time',
                formatter: <FormatterTypeFiled
                    fieldType='date'
                    name='startTime'
                    format='DD.MM.YYYY HH:mm'
                />,
                getRowMetaData: (row) => row
            },
            {
                key: 'duration',
                name: 'Duration'
            },
            {
                key: 'patient',
                name: 'Patient',
                formatter: (row) =>  {
                    return (<div>{_.get(row.value,'lastName','')} {_.get(row.value,'firstName','')}</div>)
                },
                getRowMetaData: (row) => row
            },
            {
                key: 'blockBooking',
                name: 'Block booking',
                formatter: (row) =>  {
                    return (<div>{_.get(row.value,'description','')}</div>)
                },
                getRowMetaData: (row) => row
            },
        ];
    }

    render() {
        return (
            <BaseGrid
                entity={this.props.entity}
                heads={this.heads}
                hideCrud = {true}
            />
        )
    }
}