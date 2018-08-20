import React, {PureComponent} from 'react';
import BaseGrid from './BaseGrid';
import FormatterTypeFiled from './Formatter/FormatterTypeFiled'

export default class GridPatients extends PureComponent {

    constructor(props) {
        super(props);
        this.heads = [
            {
                key: 'id',
                name: '#',
                width: 80
            },
            {
                key: 'birthdate',
                name: 'Date of birth',
                formatter: <FormatterTypeFiled
                    fieldType='date'
                    name='birthdate'
                    format='DD.MM.YYYY'
                />,
                getRowMetaData: (row) => row
            },
            {
                key: 'firstName',
                name: 'First name'
            },
            {
                key: 'lastName',
                name: 'Last name'
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