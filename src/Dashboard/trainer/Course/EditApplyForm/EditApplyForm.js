import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

import styles from './EditApplyForm.module.scss';
import { TextField, Button, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

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
                <div>Adauga intrebarile pentru formularul de aplicare. Cand ai terminat salveaza modificarile. Poti modifica intrebarile mai tarziu.</div>
                {questions.map((question, index) => (
                    <div key={index} className={styles.questionWrapper}>
                        <Fab size="small" className={styles.numberIcon}>{index}</Fab>
                        <TextField
                            name="question"
                            margin="dense"
                            variant="outlined"
                            value={question.length ? question : ''}
                            placeholder="Add new question..."
                            onChange={(e) => this.handleInputChange(e, index)}
                            className={styles.inputContainer} />
                        {questions.length === index + 1 && (
                            <Tooltip title="Adauga o noua intrebare">
                                <Fab onClick={this.addNewQuestion}><Add /></Fab>
                            </Tooltip>
                        )}
                    </div>
                ))}
                <Button onClick={this.handleSave}>Salveaza</Button>
            </div>
        )
    }
}

export default EditApplyForm;