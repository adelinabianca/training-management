import React from 'react';

import styles from './PresentationalHackathon.module.scss';
import Footer from '../Footer/Footer';

const PresentationalHackathon = (props) => {
    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.title}><h2>Hackathon</h2></div>
            <div className={styles.description}>
                <p>La fel ca în edițiile anterioare, Hackathonul va încheia evenimentul FII Practic, participanții putând pune
                   în aplicare, în cadrul acestuia, cunoștințele dobândite la traingurile proiectului. Evenimentul este o 
                   competiție în care, pe parcursul a 24 de ore, cei înscriși vor da ce au mai bun și se vor folosi de 
                   cunoștințele în domeniul web și mobile pentru a rezolva problema dată.
                </p>
                <p>
                    Ca mod de desfășurare, vor exista maximum 10 echipe participante, formate din 2-4 membri. 
                    Aceste echipe vor primi drept sarcină realizarea unei aplicații menite să rezolve o nevoie
                    sau o problemă a comunității.
                </p>
                <p>
                    Locurile pentru participare vor fi limitate, așa că vă încurajăm urmăriți startul înscrierilor! 
                    Vă așteptăm în număr cât mai mare!
                </p>

                <i>Inscrierile inca nu au inceput. Urmareste pagina pentru a fi la curent cu toate detaliile.</i>
            </div>
        </div>
        <Footer />
        </>
    )

};

export default PresentationalHackathon;