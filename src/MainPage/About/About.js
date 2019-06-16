import React, { Component } from 'react';

import styles from './About.module.scss';
import Footer from '../../core/components/Footer/Footer';

class About extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
              <div className={styles.content}>
                  <p>
                    Am început să fim practici din anul 2012, când Ștefan Coroș a venit cu ideea unui proiect care să aducă mai aproape mediul universitar, 
                    cel preuniversitar și cel profesionist. Lui i s-au alăturat Andrei Stoleru, Adrian Trefaș și Andrei Diaconu. 
                    Sprijiniți de Asociația Studenților Informaticieni Ieșeni și Facultatea de Informatică Iași, cei patru au pus la cale câte un training 
                    pentru fiecare dintre ariile: design grafic, dezvoltarea aplicațiilor Android, project management și aplicații Web.
                  </p>
                  <p>
                    FII Practic a crescut de la an la an, nu numai prin numărul aplicanților și participanților, cât și prin numărul ariilor propuse.
                    În fiecare an alegem ariile în funcție de cerințele comunității IT din Iași, pentru că ne dorim ca ce învățați aici să fie 
                    relevant pentru viitoarea voastră carieră. Aplicanții trebuie sa completeze un formular online pentru fiecare dintre ariile 
                    la care își doresc să participe. Cu toate că unele arii îți cer anumite cunoștințe precedente, pentru cele mai multe domenii 
                    este importantă atitudinea și dorința de te dezvolta.
                  </p>
                  <ul>
                      <li>Frontend</li>
                      <li>Backend</li>
                      <li>AR/VR</li>
                      <li>Design</li>
                      <li>SoftSkills</li>
                      <li>GameDev</li>
                      <li>3D Modelling</li>
                      <li>Testing</li>
                  </ul>
                  <p>
                    Cele 4 săptămâni de traininguri de la Iaşi se vor desfășura în weekend-urile din perioada 9 martie 2019 – 31 martie 2019 în incinta
                    Facultăţii de Informatică (Corpul C al Universitaţii „Alexandru Ioan Cuza”).
                  </p>
                  <p>
                    O parte importantă a experienței voastre la FII Practic este proiectul pe care il veti dezvolta pe parcursul proiectului, o primă reușită în domeniul ales. 
                    Totodată, proiectul este un bun moment pentru a vă crește vizibilitatea în comunitate. Fiecare participant va primi o diplomă, iar creatorii celor mai bune proiecte se vor bucura și de alte surprize.
                  </p>
                  <p>
                    De asemenea, vor avea loc şi două evenimente conexe: FII Practic Conference şi FII Practic Hackathon, care se vor concentra tot pe dezvoltarea in domeniul IT.
                  </p>
                  <p>
                    FII Practic Conference constă în 5 sesiuni de prezentări, pe parcursul unei singure zile, dar cel mai important este ca veti avea ocazia sa interactionati cu cei care vor pregati trainingurile la care veti participa.
                  </p>
                  <p>
                    FII Practic Hackathon, aflat la a 5-a ediţie, se va desfășura pe parcursul a 24 de ore, unde participanții vor putea lucra în echipe, pentru a realiza aplicații care să rezolve o nevoie sau o problemă a comunității.
                  </p>
                  <p>
                    Calitatea traingurilor pe care le desfășurăm nu ar fi la fel de înaltă dacă nu am încuraja un mediu amical de învățare și 
                    dezvoltare pe parcursul trainingurilor, cât și după terminarea acestora. Scopul proiectului este să dezvolte, nu să evalueze și,
                    cu toate că veți întâlni oameni cu cariere importante în IT, atitudinea mentorilor va fi una prietenoasă.
                  </p>
              </div>
              <Footer />
            </div>
        )
    }
};

export default About;
