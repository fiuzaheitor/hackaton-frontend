import React from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";

export const Home: React.FC = () => {
    return (
        <section className="container__home">
            <div className="home__content">
                <Calendar />
            </div>
        </section>
    )
}

