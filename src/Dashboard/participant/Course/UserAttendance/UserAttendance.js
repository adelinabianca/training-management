import React, { Component } from 'react';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
import { TextField } from '@material-ui/core';
import QrReader from "react-qr-reader";

class UserAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            scan: false
        }
    }

    handleInputChange = ({ target }) => {
        const { value } = target;
        this.setState({ code: value });
    }

    handleScan = (data) => {
        if(data) {
            console.log(data)
            this.setState({ scan: false });
        }
    }

    scanQrCode = () => {
        this.setState({ scan: true });
    }

    handleError(err) {
        console.error(err);
    } 

    render() {
        const { code, scan } = this.state;
        return (
            <div>
                <CustomButton onClick={this.scanQrCode}>Scan QRCode</CustomButton>
                {scan && (<QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "50%" }}
                     />)}
                <div>OR</div>
                <div>Add unique code for session</div>
                <TextField 
                  name="code"
                  value={code}
                  onChange={this.handleInputChange}
                  variant="outlined" />
                <CustomButton>Attend session</CustomButton>
            </div>
        )
    }
}

export default UserAttendance;