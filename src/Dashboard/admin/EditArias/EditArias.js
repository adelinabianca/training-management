import React, { Component } from 'react';
import { Card, Button, CardContent, CardActions } from '@material-ui/core';

import { arias } from '../../../core/mocks/ariasMocks';
import styles from './EditArias.module.scss';

class EditArias extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                {arias.map(aria => (
                    <Card key={aria.name} className={styles.ariaCard}>
                        <CardContent className={styles.cardContent}>
                            <h2>{aria.name}</h2>
                            <div className={styles.description}>{aria.description}</div>
                        </CardContent>
                        <CardActions className={styles.cardActions}>
                            <Button className={styles.editBtn}>Edit Aria</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        )
    }
}

export default EditArias;