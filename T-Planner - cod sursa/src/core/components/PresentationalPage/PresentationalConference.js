import React from 'react';

import styles from './PresentationalConference.module.scss';
import Footer from '../Footer/Footer';

const PresentationalConference = (props) => {
    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.title}><h2>CONFERENCE</h2></div>
            <div className={styles.description}>
                <p>Ajuns la ediția a 8-a, proiectul FII Practic va începe și anul acesta cu evenimentul FII Practic Conference.</p>
                <p>
                În ce constă acesta? Într-o zi dedicată sesiunilor de speech-uri ce vizează domeniul IT. Elevii, studenții și 
                alți pasionați de mediul IT se întâlnesc pentru a învăța lucruri noi, pentru a discuta cu oameni specializați 
                în domeniu și pentru a înțelege mai bine valorile și așteptările proiectului FII Practic.
                </p>
                <p>
                Conferința FII Practic reprezintă șansa de intra în contact atât cu oameni avizați în IT, cât și reprezentanți 
                ai partenerilor, dar cel mai important: oameni pozitivi, dornici să împărtășească secretul succesului lor, insuflând 
                și celor din jur măcar puțin din pasiunea pentru informatică.
                </p>

                <i>Orarul inca nu este disponibil. Urmareste pagina pentru a fi la curent cu toate detaliile.</i>
            </div>
        </div>
        <Footer />
        </>
    )

};

export default PresentationalConference;