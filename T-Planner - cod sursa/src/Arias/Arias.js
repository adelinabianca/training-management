import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Typography } from '@material-ui/core';

import styles from './Arias.module.scss';
import { getArias } from '../core/api/arias';

@inject('ariasStore')
@observer
class Arias extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         arias: []
    //     }
    // }

    componentDidMount() {
        const { ariasStore: { setAllArias } } = this.props;
        getArias().then(response => {
            setAllArias(response.data);
        })
    }

    handleClick = (aria, index) => {
        const { history, ariasStore: { setSelectedAria } } = this.props;
        setSelectedAria(aria)
        history.push(`/aria/${aria.ariaId}`);
    }
    render() {
        const { ariasStore: { allArias } } = this.props;
        return (
            <div className={styles.mainWrapper}>
                {allArias.map((aria, index) => (
                    <div key={aria.ariaId} className={styles.card}>
                        <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                            <h3>
                                {aria.name}
                            </h3>
                        </div>
                        <div className={styles.cardBody}>
                            <Typography component="p">
                                {aria.description}
                            </Typography>
                            <Button onClick={() => this.handleClick(aria, index)}>
                                Vezi detalii si aplica
                            </Button>
                        </div>

                    </div>
                ))}
            </div>
        )
    }
};

export default Arias;