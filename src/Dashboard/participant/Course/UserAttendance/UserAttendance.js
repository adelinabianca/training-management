import React, { Component } from 'react';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
import { TextField, Dialog, DialogContent } from '@material-ui/core';
import QrReader from "react-qr-reader";
import { inject, observer } from 'mobx-react';

import styles from './UserAttendance.module.scss';

@inject('sessionStore')
@observer
class UserAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            scan: false,
            errorCode: false
        }
    }

    handleInputChange = ({ target }) => {
        const { value } = target;
        this.setState({ code: value, errorCode: false });
    }

    handleScan = (data) => {
        if(data) {
            const { handleAttendance, activeSession, sessionStore: { authUser } } = this.props;
            if (activeSession.uniqueCode === data) {
                handleAttendance(authUser);
            } else {
                
            console.log('user not from hereeeeeeeeee')
            }
            this.setState({ scan: false });
        }
    }

    attendSession = () => {
        const { code } = this.state;
        const { handleAttendance, activeSession, sessionStore: { authUser } } = this.props;
        if (activeSession.uniqueCode === code) {
            handleAttendance(authUser);
        } else {
            this.setState({ errorCode: true, code: '' })
        }
    }

    scanQrCode = () => {
        this.setState({ scan: true });
    }

    handleError(err) {
        console.error(err);
    } 

    render() {
        const { code, scan, errorCode } = this.state;
        const { activeSession, sessionStore: { authUser } } = this.props;

        if (!activeSession) {
            return <div>Nu este nicio sesiune activa! Incearca mai tarziu.</div>
        }

        if(activeSession.attendees && activeSession.attendees.map(user => user.uid).includes(authUser.uid)) {
            return <div>Sunteti deja trecut ca prezent la aceasta sesiune</div>
        }

        return (
            <div className={styles.wrapper}>
                <div className={styles.instructions}>
                    Pentru a fi trecut ca <i>prezent</i> la aceasta sesiune, scanati QRcode-ul dat de trainer la curs SAU
                    introduceti codul unic al sesiunii (comunicat de catre trainer).
                </div>
                <div className={styles.actions}>
                    <CustomButton onClick={this.scanQrCode}>Scan QRCode</CustomButton>
                    <Dialog open={scan} fullWidth onClose={() => this.setState({scan: false})}>
                        <DialogContent>
                            <QrReader
                                delay={300}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: "80%", margin: '0 auto' }}
                            />
                        </DialogContent>

                    </Dialog>
                    <div>SAU</div>
                    <br/>
                    <div>Introdu codul unic al sesiunii</div>
                    <TextField 
                    name="code"
                    value={code}
                    onChange={this.handleInputChange}
                    variant="outlined"
                    className={styles.input} />
                    <CustomButton onClick={this.attendSession}>Submit</CustomButton>
                    {errorCode && <div>Codul este gresit. Incearca din nou.</div>}
                </div>
            </div>
        )
    }
}

export default UserAttendance;