import React from 'react';
// 
import '../../assets/css/TextAnimation.css';

export default function TextHome(props) {
    return (
            <div className="content">
                <div className="content__container">
                    <p className="content__container__text">
                        Hello
                    </p>
                    <ul className="content__container__list">
                        <li className="content__container__list__item">Everybody !</li>
                        <li className="content__container__list__item">WelCome + </li>
                        <li className="content__container__list__item">To +</li>
                        <li className="content__container__list__item">My Site !!!</li>
                    </ul>
                </div>
            </div>
    )
}