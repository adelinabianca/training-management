import React, { Component } from 'react';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
import { TextField } from '@material-ui/core';
import QrReader from "react-qr-reader";
import { inject, observer } from 'mobx-react';

@inject('sessionStore')
@observer
class UserAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            scan: false,
            activeSession: null
        }
    }

    // componentDidMount() {
    //     // this.init()
    // }

    // init = () => {
    //     const { course: { attendance } } = this.props;
    //     if (attendance) {
    //         const activeSession = attendance.find(session => session.active);
    //         this.setState({ activeSession })
    //     }
    // }

    handleInputChange = ({ target }) => {
        const { value } = target;
        this.setState({ code: value });
    }

    handleScan = (data) => {
        if(data) {
            const { activeSession } = this.props;
            const { handleAttendance, sessionStore: { authUser } } = this.props;
            console.log(data)
            if (activeSession.uniqueCode === data) {
                handleAttendance(authUser);
            }
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
        const { activeSession, sessionStore: { authUser } } = this.props;

        if (!activeSession) {
            return <div>Nu este nicio sesiune activa! Revino mai tarziu.</div>
        }

        if(activeSession.attendees && activeSession.attendees.includes(authUser.uid)) {
            return <div>Sunteti deja trecut ca prezent la aceasta sesiune</div>
        }

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