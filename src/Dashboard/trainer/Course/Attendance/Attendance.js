import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';
import QRCode from 'qrcode.react';
// var QRCode = require('qrcode.react');

import styles from './Attendance.module.scss';
import { getUser, updateUser } from '../../../../core/api/users';
import { Grid, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
import { getCourse, updateCourse } from '../../../../core/api/courses';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
// import { TextField, Button, Tooltip } from '@material-ui/core';
// import { Add } from '@material-ui/icons';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            uniqueCode: '',
            openQR: false
        }
    }

    async componentDidMount() {
        await this.init()
    }

    async componentDidUpdate(prevProps) {
        const { members, courseId } = this.props;
        if (JSON.stringify(members) !== JSON.stringify(prevProps.members) 
            || courseId !== prevProps.courseId) {
            await this.init();
        }
    }

    init = async() => {
        const { members } = this.props;
        let allMembers = [];
        if (members.length) {
            members.forEach(async userUID => {
                await getUser(userUID).then(response => {
                    const member = response.data;
                    allMembers = [...allMembers, member];
                    this.setState({ members: allMembers });
                })
            });
        }
        
        this.setState({ members: allMembers });
    }

    handleInputChange = (e) => {
        const { target: { value } } = e;
        this.setState({ uniqueCode: value });
    }

    generateQrCode = () => {
        const { uniqueCode } = this.state;
        console.log(uniqueCode)
        this.setState({ openQR: true })
    }

    handleCloseDialog = () => {
        this.setState({ openQR: false });
    }


    render() {
        const { members, uniqueCode, openQR } = this.state;
        return (
            <div className={styles.wrapper}>
                <div>Adauga un cod unic pentru aceasta sesiune:</div>
                <TextField 
                  name="uniqueCode"
                  value={uniqueCode}
                  onChange={this.handleInputChange}
                  margin="dense"
                  variant="outlined" />
                <CustomButton onClick={this.generateQrCode}>Save and generate QR code</CustomButton>
                <div>
                    <QRCode 
                        value={uniqueCode} />
                </div>
                <Dialog open={openQR} onClose={this.handleCloseDialog}>
                    <DialogContent>
                    <QRCode 
                        value={uniqueCode}
                        size={450} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default Attendance;