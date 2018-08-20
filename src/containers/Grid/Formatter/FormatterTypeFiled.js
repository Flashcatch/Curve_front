import React from 'react';
import _ from 'lodash'
import moment from 'moment'

class FormatterTypeFiled extends React.Component {
    render() {
        const weekday = {
            '1': "Monday",
            '2': "Tuesday",
            '3': "Wednesday",
            '4': "Thursday",
            '5': "Friday",
            '6': "Saturday",
            '7': "Sunday"
        };
        const value = _.get(this.props.dependentValues,this.props.name,null);
        const fieldType = _.get(this.props, 'fieldType', null);
        let body = '';
        let val = null;
        switch( fieldType ) {
            case 'array':
                val = '';
                _.forEach(value.split(','), (id, key) => {
                    val = val + weekday[id] + ','
                });
                body = (
                    <div>
                        {val.slice(0, -1)}
                    </div>
                );
                break;
            case 'bool':
                val = (value) ? '+' : '-';
                body = (
                    <div>
                        {val}
                    </div>
                );
                break;
            case 'date':
                const format = _.get(this.props,'format',null);
                val = (value) ? moment(value).format(format) : '';
                body = (
                    <div>
                        {val}
                    </div>
                );
                break;
            case 'file':
                val = (value) ? Math.round(value/1024)+' Кб' : '';
                body = (
                    <div>
                        {val}
                    </div>
                );
                break;
            case 'button':
                break;
            default:
                body = (
                    <div>
                        {value}
                    </div>
                );
                break;
        }
        return (
            <div>
                {body}
            </div>
        )
    }
}

export default FormatterTypeFiled;