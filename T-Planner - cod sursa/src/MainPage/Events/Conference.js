import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from './Conference.module.scss';
import { Button } from '@material-ui/core';
class Conference extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
              <div className={styles.content}>
                  <h2>Conference - 23 FEBRUARIE 2019</h2>
                  <p>FII Practic Conference este primul din cele două evenimente conexe ale proiectului FII Practic.
                     Acesta cuprinde mai multe prezentări susținute de reprezentanți ai companiilor partenere, prezentări ce vor avea loc sâmbătă, 23 februarie.
                    <br/>
                    Atât elevii și studenții, cât și cei pasionați de informatică sunt invitați să descopere noi lucruri ce țin de domeniul IT sau de ariile adiacente acestuia,
                    precum cea de soft-skills.
                  </p>
                  <Link to='/conference' ><Button>Afla mai multe</Button></Link>
                  
              </div>
            </div>
        )
    }
};

export default Conference;
