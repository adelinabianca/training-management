import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from './Hackaton.module.scss';
import { Button } from '@material-ui/core';
class Hackaton extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
              <div className={styles.content}>
                  <h2>Hackathon - 13-14 APRILIE 2019</h2>
                  <br></br>
                  <p>Hackathonul reprezintă cel de-al doilea eveniment conex din cadrul proiectului FII Practic. 
                    Conceptul este unul cât se poate de incitant, fiind vorba de o competiție.
                    <br/>
                    Participanții acestui concurs marca FII Practic vor fi organizați în echipe, iar în weekendul 13-14 aprilie
                    ei vor avea la dispoziție 24 de ore în care vor trebui să creeze o aplicație menită să răspundă unor nevoi sau probleme ale 
                    comunității.
                  </p>
                  <Link to='/hackathon'><Button>Afla mai multe</Button></Link>
              </div>
            </div>
        )
    }
};

export default Hackaton;
