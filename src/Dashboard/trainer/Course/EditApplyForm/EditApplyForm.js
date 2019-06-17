import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

import styles from './EditApplyForm.module.scss';
import { TextField, Tooltip, InputLabel } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';

class EditApplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: ['']
        }
    }

    componentDidMount() {
        const { questions } = this.props;
        if (questions.length) {
            this.setState({ questions });
        }
    }

    componentDidUpdate(prevProps) {
        const { questions } = this.props;
        if (JSON.stringify(questions) !== JSON.stringify(prevProps.questions)) {
            this.setState({ questions });
        }
    }

    addNewQuestion = () => {
        const { questions } = this.state;
        this.setState({ questions: [...questions, '']})
    }

    handleInputChange = (e, index) => {
        const { target: { value } } = e;
        const { questions } = this.state;
        questions[index] = value;
        this.setState({ questions: [...questions] });
    }
    handleSave = () => {
        const { questions } = this.state;
        const { handleFormSave } = this.props;
        handleFormSave(questions);
    }

    render() {
        const { questions } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.instructions}>Adauga intrebarile pentru formularul de aplicare. Cand ai terminat salveaza modificarile. Poti modifica intrebarile mai tarziu.</div>
                {questions.map((question, index) => (
                    <div key={index} className={styles.questionWrapper}>
                        <InputLabel>Intrebare</InputLabel>
                        <TextField
                            name="question"
                            margin="dense"
                            variant="outlined"
                            value={question.length ? question : ''}
                            placeholder="Adauga o noua intrebare..."
                            onChange={(e) => this.handleInputChange(e, index)}
                            className={styles.inputContainer} />
                    </div>
                ))}
                <div className={styles.buttonsContainer}>
                    <Tooltip title="Adauga o noua intrebare" placement="bottom">
                        <CustomButton onClick={this.addNewQuestion}><Add />Adauga intrebare</CustomButton>
                    </Tooltip>
                    <CustomButton onClick={this.handleSave}>Salveaza</CustomButton>
                </div>
            </div>
        )
    }
}

export default EditApplyForm;