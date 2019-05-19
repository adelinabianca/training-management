import React, { Component } from 'react';
import { Card, Button, CardContent, CardActions } from '@material-ui/core';

import styles from './EditArias.module.scss';

const arias = [{
        name: 'Frontend1',
        description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend2',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend3',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend4',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend5',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend6',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    },
    {
        name: 'Frontend7',
       description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable'
    }
]

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