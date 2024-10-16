import React from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";

export const Home: React.FC = () => {
    const auth = JSON.parse(getCookie('_bu_l') as string)

    return (
        <section className="container__home">
            <Header />
            <div className="home__side">
                
                <Calendar />
                <div className="">
                    
                </div>
            </div>
            <div className="home__content">
                
            </div>
        </section>
    )
}

