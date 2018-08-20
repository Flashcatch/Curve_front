import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {postOne, fetchOne, deleteOne, patchOne} from "../../redux/modules/requestAxios";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {Col, Row, Button} from 'reactstrap';

class PanelDate extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            startDate: moment()
        };
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
        this.props.callback({startDate: moment(date).format('YYYY-MM-DDTHH:mm:ss')});
    }

    onChangeDate = (day) => {
        const newDate = this.state.startDate.add(day, 'days');
      this.setState({startDate: newDate});
      this.props.callback({startDate: moment(newDate).format('YYYY-MM-DDTHH:mm:ss')});
    };

    render() {
        return (
            <Row>
                <Col md={12} style={{display: 'flex'}}>
                    <Button size='sm' onClick={() => this.onChangeDate(-1)}>
                                <span>
                                    <i className="fa fa-angle-left"> </i>
                                </span>
                    </Button>
                        <DatePicker
                            className='example-custom-input'
                            selected={this.state.startDate}
                            onChange={::this.handleChange}
                            showTimeSelect={false}
                            dateFormat="LL"
                        />
                    <Button size='sm' onClick={() => this.onChangeDate(+1)}>
                                <span>
                                    <i className="fa fa-angle-right"> </i>
                                </span>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default connect()(PanelDate)
