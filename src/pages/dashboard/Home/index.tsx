import React from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";

export const Home: React.FC = () => {
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

