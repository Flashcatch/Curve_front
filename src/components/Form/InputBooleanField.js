import React from 'react';
import Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const InputBooleanField = ({ input, label }) => (
    <MuiThemeProvider>
        <Checkbox
            label={label}
            checked={input.value ? true : false}
            onCheck={input.onChange}
        />
    </MuiThemeProvider>
);

export default InputBooleanField;