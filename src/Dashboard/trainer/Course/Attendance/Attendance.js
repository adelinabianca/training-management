import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import AddIcon from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';

import styles from './Attendance.module.scss';
import {  Button, TextField, Dialog, DialogContent, withMobileDialog, DialogActions } from '@material-ui/core';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
import { withFirebase } from '../../../../Firebase';

class Attendance extends Component {
    attendeesRef;

    constructor(props) {
        super(props);
        this.state = {
            uniqueCode: '',
            openQR: false,
            newSessionName: '',
            newLimit: '',
            selectedSession: null,
            attendees: []
        }
    }

    componentDidMount() {
        const { activeSession } = this.props;
        this.setState({ selectedSession: activeSession });
        this.setAttendees();
    }

    componentDidUpdate(prevProps) {
        const { activeSession } = this.props;

        if (JSON.stringify(activeSession) !== JSON.stringify(prevProps.activeSession)) {
            this.setState({ selectedSession: activeSession });
            this.attendeesRef.off();
            this.setAttendees();
        }
    }

    setAttendees = () => {
        const { firebase, course: { courseId } } = this.props;
        const activeSessionId = this.getActiveSessionIdFromCourse();
        if (activeSessionId != null) {
            this.attendeesRef = firebase.attendees(courseId, activeSessionId);
            this.attendeesRef.on('value', (snapshot) => {
                this.setState({ attendees: snapshot.val() });
            })
        }
    }

    componentWillUnmount() {
        if(this.attendeesRef) this.attendeesRef.off();
    }

    getActiveSessionIdFromCourse = () => {
        const { course: { attendance } } = this.props;
        if (attendance) {
            const activeSessionId = attendance.findIndex(session => session.active);
            return activeSessionId;
        }
        
    }

    handleInputChange = (e) => {
        const { target: { value, name } } = e;
        this.setState({ [name]: value });
    }

    generateQrCode = () => {
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

    closeSession = () => {
        const { closeSession } = this.props;
        const { selectedSession } = this.state;
        closeSession(selectedSession);
    }

    render() {
        const { uniqueCode, openQR, newSessionName, newLimit, selectedSession, attendees } = this.state;
        const { course, fullScreen, activeSession } = this.props;
        return (
            <div className={styles.wrapper}>
                <div className={styles.sessions}>
                    {course.attendance && course.attendance.map(session => (
                        <Button 
                            className={selectedSession && selectedSession.date === session.date ? styles.selectedSession : ''}
                            onClick={() => this.selectSession(session)}
                            key={session.uniqueCode + session.date}
                        >
                            {session.date}
                        </Button>
                    ))}
                    {(!activeSession || !course.attendance || !selectedSession ) && (
                        <Button 
                            className={!selectedSession ? styles.selectedSession : ''}
                            onClick={this.addSession}>
                                <AddIcon />
                        </Button>
                    )}
                </div>
                <div className={styles.content}>
                    {!selectedSession && (
                    <div>
                        <h3>Adauga o sesiune de prezenta noua</h3>
                        <div>Data</div>
                        <form>
                            <TextField
                                name="newSessionName"
                                value={newSessionName}
                                onChange={this.handleInputChange}
                                margin="dense"
                                variant="outlined"
                                type="date"
                            />
                        </form>
                        <div>Numarul maxim de membri</div>
                        <TextField
                            name="newLimit"
                            value={newLimit}
                            onChange={this.handleInputChange}
                            margin="dense"
                            variant="outlined"
                        />
                        <div>Codul unic al sesiunii</div>
                        <TextField 
                            name="uniqueCode"
                            value={uniqueCode}
                            onChange={this.handleInputChange}
                            margin="dense"
                            variant="outlined"
                            type="password" 
                        />
                        <CustomButton onClick={this.submitNewSession}>Submit</CustomButton>
                    </div>
                    )}
                    {selectedSession && (
                        <div className={styles.sessionInfo}>
                            <h2>Data: {selectedSession.date}</h2>
                            <div className={styles.attendance}>
                                {selectedSession.active && (
                                    <QRCode 
                                    value={uniqueCode}
                                    size={fullScreen ? 300 : 500} />
                                )}
                                
                                
                                <div className={styles.members}>
                                    <h3>Membri prezenti: </h3>
                                    {selectedSession === activeSession && attendees && attendees.map((attendee, index) => (
                                        <div key={attendee.uid}>{index+1}. {attendee.username}</div>
                                    ))}
                                    {selectedSession !== activeSession && selectedSession.attendees && selectedSession.attendees.map((attendee, index) => (
                                        <div key={attendee.uid}>{index+1}. {attendee.username}</div>
                                    ))}
                                </div>
                            </div>
                            {selectedSession.active && <CustomButton onClick={this.generateQrCode}>Mareste Qr code</CustomButton>}
                            {selectedSession.active && <div><CustomButton onClick={this.closeSession}>Inchide sesiunea</CustomButton></div>}
                            <Dialog open={openQR} onClose={this.handleCloseDialog} fullScreen>
                                <DialogActions>
                                    <Button onClick={this.handleCloseDialog} color="primary">
                                        <Clear />
                                    </Button>
                                </DialogActions>
                                <DialogContent className={styles.dialogContent}>
                                  <QRCode 
                                    value={uniqueCode}
                                    size={fullScreen ? 300 : 700} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withFirebase(withMobileDialog()(Attendance));