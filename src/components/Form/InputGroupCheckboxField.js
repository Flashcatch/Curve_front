import React,  {Component}  from 'react';
import { FormGroup, Label } from 'reactstrap';
// import {Field} from 'redux-form';
// import InputBooleanField  from './InputBooleanField';
import Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';

export default class extends Component {
    onChange = (event, flag) => {
        const {id} = event.target;
        const oldVal = _.cloneDeep(this.props.input.value);
        if (flag) {
            this.props.input.onChange((oldVal.length===0) ? `${id}` : `${oldVal},${id}` );
        } else {
            const newVal = [];
            _.forEach(oldVal.split(','), (old_id, key) => {
                if (old_id!==id) newVal.push(old_id);
            });
            this.props.input.onChange(newVal.join(','));
        }

    };
    render() {
        const props = this.props;
        const {options, input} = this.props;
         return (
             <div style={{marginTop: '20px'}}>
            <FormGroup>
                <Label style={{color: 'rgba(0, 0, 0, 0.3)', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', bottom: '12px'}}>
                    {props.label || ''}
                </Label>
                {_.map(options, (val, key) => {
                    const flag = input.value.search(val.id) !== -1 ? true : false;
                    return (
                        <div key = {key}>
                        <MuiThemeProvider>
                            <Checkbox
                                id = {val.id}
                                label={val.name}
                                checked={flag}
                                onCheck={::this.onChange}
                            />
                        </MuiThemeProvider>
                        </div>)
                })}
            </FormGroup>
             </div>
        )
    }
}