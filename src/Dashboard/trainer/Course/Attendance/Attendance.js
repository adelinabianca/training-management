import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';
import QRCode from 'qrcode.react';
// var QRCode = require('qrcode.react');
import AddIcon from '@material-ui/icons/Add';

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
            openQR: false,
            newSessionName: '',
            newLimit: '',
            selectedSession: null
        }
    }

    async componentDidMount() {
        await this.init()
    }

    async componentDidUpdate(prevProps) {
        const { course } = this.props;
        if (JSON.stringify(course.attendance) !== JSON.stringify(prevProps.course.attendance) 
            || course.courseId !== prevProps.course.courseId) {
            await this.init();
        }
    }

    init = async() => {
        const { course: { attendance } } = this.props;
        let allMembers = [];
        // if (members && members.length) {
        //     members.forEach(async userUID => {
        //         await getUser(userUID).then(response => {
        //             const member = response.data;
        //             allMembers = [...allMembers, member];
        //             this.setState({ members: allMembers });
        //         })
        //     });
        // }
        
        this.setState({ members: allMembers });
    }

    handleInputChange = (e) => {
        const { target: { value, name } } = e;
        this.setState({ [name]: value });
    }

    generateQrCode = () => {
        const { uniqueCode } = this.state;
        console.log(uniqueCode)
        this.setState({ openQR: true })
    }

    handleCloseDialog = () => {
        this.setState({ openQR: false });
    }

    submitNewSession = async() => {
        const { course, createNewSession } = this.props;
        const { uniqueCode, newSessionName, newLimit } = this.state;
        console.log( course );
        const currentSession = { uniqueCode, date: newSessionName, limit: newLimit, active: true };
        this.setState({ selectedSession: currentSession })
        await createNewSession(currentSession);
    }

    selectSession = (session) => {
        this.setState({ selectedSession: session });
    }

    addSession = () => {
        this.setState({ selectedSession: null, uniqueCode: '', newLimit: '', newSessionName: ''});
    }


    render() {
        const { members, uniqueCode, openQR, newSessionName, newLimit, selectedSession } = this.state;
        const { course: { attendance } } = this.props;
        return (
            <div className={styles.wrapper}>
                <div className={styles.sessions}>
                    {attendance && attendance.map(session => (
                        <Button 
                            className={selectedSession && selectedSession.date === session.date ? styles.selectedSession : ''}
                            onClick={() => this.selectSession(session)}
                        >
                            {session.date}
                        </Button>
                    ))}
                    <Button 
                        className={!selectedSession ? styles.selectedSession : ''}
                        onClick={this.addSession}>
                            <AddIcon />
                    </Button>
                </div>
                <div className={styles.content}>
                    {!selectedSession && (
                    <div>
                        <h3>Adauga o sesiune noua</h3>
                        <div>Nume</div>
                        <TextField
                            name="newSessionName"
                            value={newSessionName}
                            onChange={this.handleInputChange}
                            margin="dense"
                            variant="outlined"
                        />
                        <div>Nr max membri</div>
                        <TextField
                            name="newLimit"
                            value={newLimit}
                            onChange={this.handleInputChange}
                            margin="dense"
                            variant="outlined"
                            //   type="password" 
                        />
                        <div>Cod unic al sesiunii</div>
                        <TextField 
                            name="uniqueCode"
                            value={uniqueCode}
                            onChange={this.handleInputChange}
                            margin="dense"
                            variant="outlined"
                            //   type="password" 
                        />
                        <CustomButton onClick={this.submitNewSession}>Submit</CustomButton>
                    </div>
                    )}
                    {selectedSession && (
                        <div>
                            <div>Name: {selectedSession.date}</div>
                            <CustomButton onClick={this.generateQrCode}>Afiseaza Qr code</CustomButton>
                            {/* <div>
                                <QRCode 
                                    value={selectedSession.uniqueCode} />
                            </div> */}
                            <Dialog open={openQR} onClose={this.handleCloseDialog}>
                                <DialogContent>
                                <QRCode 
                                    value={uniqueCode}
                                    size={500} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </div>
            // <div className={styles.wrapper}>
            //     <div>Adauga un cod unic pentru aceasta sesiune:</div>
                // <TextField 
                //   name="uniqueCode"
                //   value={uniqueCode}
                //   onChange={this.handleInputChange}
                //   margin="dense"
                //   variant="outlined"
                // //   type="password" 
                //   />
                // <CustomButton onClick={this.generateQrCode}>Save and generate QR code</CustomButton>
                // <div>
                //     <QRCode 
                //         value={uniqueCode} />
                // </div>
                // <Dialog open={openQR} onClose={this.handleCloseDialog}>
                //     <DialogContent>
                //     <QRCode 
                //         value={uniqueCode}
                //         size={500} />
                //     </DialogContent>
                // </Dialog>
            // </div>
        )
    }
}

export default Attendance;