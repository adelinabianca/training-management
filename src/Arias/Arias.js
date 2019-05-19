import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// import { arias } from '../core/mocks/ariasMocks';
import { Card, CardActionArea, CardMedia, CardActions, Button, Typography, CardContent } from '@material-ui/core';
import styles from './Arias.module.scss';
import image from '../assets/images/2llamas.jpg';
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
        history.push(`/aria/${index}`);
    }
    render() {
        const { ariasStore: { allArias } } = this.props;
        return (
            <div className={styles.mainWrapper}>
                {allArias.map((aria, index) => (
                    <Card key={aria.name} className={styles.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={styles.media}
                                height="140"
                                image={image}
                                title={aria.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {aria.name}
                                </Typography>
                                <Typography component="p">
                                    {aria.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => this.handleClick(aria, index)} size="small" color="primary">
                                See details and apply
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        )
    }
};

export default Arias;