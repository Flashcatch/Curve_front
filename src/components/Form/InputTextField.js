import React from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const InputTextField = ({
                            input,
                            label,
                            disabled,
                            meta: {touched, error},
                            ...custom
                        }) => (
    <MuiThemeProvider>
        <TextField
            fullWidth={true}
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            disabled={disabled || false}
            {...input}
            {...custom}
        />
    </MuiThemeProvider>
);

export default InputTextField;