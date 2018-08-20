import React,  {PureComponent}  from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import {searchSelect} from "../../redux/modules/requestAxios";
import { FormGroup, Label } from 'reactstrap';
import _ from 'lodash';

export default class extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: {},
            getOptions: props.input.value
        }
    };

   onCallback = (values) => {
        this.setState({getOptions: values});
    };

    render() {
        const props = this.props;
        const isAsync = _.get(props, 'async', false);
        const fieldLabel = _.get(props, 'fieldLabel', 'name')
        const getLabel = (options) => options[fieldLabel];
        const getValue = (options) => options.id;
        const value = props.input.value;
        const onChange = (newVal, actionMeta) => {
            // В будущем выбрать формат подходящий для сохранения
            // let keys = null;
            // if (props.isMulti) {
            //     keys = [];
            //     _.forEach(newVal, (val, key) => keys.push(val.id))
            // } else {
            //     keys = _.get(newVal, 'id', null);
            // }
            // props.input.onChange(keys);
            props.input.onChange(newVal);
        };
        const searchOptions = (input) => {
            return searchSelect({url: props.urlAsync, key: props.urlAsync, fieldLabel: fieldLabel, options: []}, input, ::this.onCallback);
        };
        return (
            <FormGroup>
                <Label style={{color: 'rgba(0, 0, 0, 0.3)', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', bottom: '12px'}}>
                    {props.label || ''}
                </Label>
                {(isAsync) ?
                    <AsyncSelect
                        {...props}
                        value={value}
                        getOptionLabel= {getLabel}
                        getOptionValue= {getValue}
                        defaultOptions = {this.state.getOptions}
                        loadOptions={searchOptions}
                        onChange = {onChange}
                    />
                    :
                    <Select
                        {...props}
                        value={value}
                        getOptionLabel= {getLabel}
                        getOptionValue= {getValue}
                        onChange = {onChange}
                        options={props.options}
                    />
                }
            </FormGroup>
        )
    }
}