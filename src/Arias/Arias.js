import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// import { arias } from '../core/mocks/ariasMocks';
import { Card, CardActionArea, CardMedia, CardActions, Button, Typography, CardContent } from '@material-ui/core';
import styles from './Arias.module.scss';
import image from '../assets/images/2llamas.jpg';
import { getArias } from '../core/api/arias';
import CustomButton from '../core/components/CustomButton/CustomButton';
import ariaImage from '../assets/images/aria1.jpg';

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
                                See details and apply
                            </Button>
                        </div>

                    </div>
                    // <article key={aria.ariaId} className={styles.ariaWrapper}>
                    //     <span className={styles.image}>
                    //         <img src={ariaImage} alt=""/>
                    //     </span>
                    //     <a href={`/aria/${aria.ariaId}`} className={styles.link} onClick={() => this.handleClick(aria, index)}>
                    //         <h2>{aria.name}</h2>
                    //         <div className={styles.content}>
                    //             <p>{aria.name}</p>
                    //         </div>
                    //     </a>
                    // </article>
                ))}
            </div>
        )
    }
};

export default Arias;