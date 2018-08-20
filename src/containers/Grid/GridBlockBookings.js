import React, {PureComponent} from 'react';
import BaseGrid from './BaseGrid';
import FormatterTypeFiled from './Formatter/FormatterTypeFiled'

export default class GridBlockBookings extends PureComponent {

    constructor(props) {
        super(props);
        this.heads = [
            {
                key: 'id',
                name: '#',
                width: 80
            },
            {
                key: 'description',
                name: 'Description'
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
                key: 'recurType',
                name: 'Recurrence',
                formatter: <FormatterTypeFiled
                    fieldType='array'
                    name='recurType'
                />,
                getRowMetaData: (row) => row
            },
            {
                key: 'finishTime',
                name: 'Finish time',
                formatter: <FormatterTypeFiled
                    fieldType='date'
                    name='finishTime'
                    format='DD.MM.YYYY HH:mm'
                />,
                getRowMetaData: (row) => row
            }
        ];
    }

    render() {
        return (
            <BaseGrid
                entity={this.props.entity}
                heads={this.heads}
            />
        )
    }
}