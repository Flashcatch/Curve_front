import React,  {PureComponent}  from 'react';
import DatePicker from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment'

export default class extends PureComponent {
    constructor(props) {
        super(props);
        const current = _.get(props.input, 'value', null);
        this.state = {
            startDate: (current) ? moment(current) : null
        };
    };

    handleChange(date) {
        this.setState({
            startDate: date
        });
        const newDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
        this.props.input.onChange(newDate);
        return false;
    }

    render() {
        const props = this.props;
        const isTime = _.get(props, 'isTime', false);
        return (
            <div style={{marginTop: '15px'}}>
            <FormGroup>
                <Label style={{
                    color: 'rgba(0, 0, 0, 0.3)',
                    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    bottom: '12px'
                }}>
                    {props.label || ''}
                </Label>
                {(isTime) ?
                    <DatePicker
                        timeFormat='HH:mm'
                        className='form__form-group-datepicker'
                        selected={this.state.startDate}
                        onChange={::this.handleChange}
                        timeIntervals={10}
                        showTimeSelect
                        dateFormat="LLL"
                    />
                    :
                    <DatePicker
                        className='form__form-group-datepicker'
                        selected={this.state.startDate}
                        onChange={::this.handleChange}
                        showTimeSelect={false}
                        dateFormat="LL"
                    />
                }
            </FormGroup>
            </div>
        )
    }
}