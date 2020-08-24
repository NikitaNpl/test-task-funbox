import React, { useState, useEffect } from 'react';

import './index.scss';
import catPng from '../../assets/img/cat.png'

const Card = ( {data} ) => {
    const [dataCards, setDataCards] = useState(data);

    let clicked = false;

    const updateDataAndMarkAnElement = (element, id) => {
        const listener = () => {
            element.classList.toggle('selected');
            const newData = dataCards.map(card => {
                if (card.id === id) {
                    card.selected = !card.selected;
                }
                return card;
            });
            setDataCards([...newData])
        }
        return listener;
    }

    const onMouseLeaveHandler = (element, id) => {
        clicked = false;
        element.addEventListener('mouseleave', updateDataAndMarkAnElement(element, id), {once: true});
    }

    const onClickCardHandler = (element, id) => {
        if (element.classList.contains('disabled')) {
            return;
        }
        clicked = !clicked;
        if (!clicked) {
            return;
        }
        onMouseLeaveHandler(element, id);
    }

    const onClickTextHandler = (element, id) => {
        updateDataAndMarkAnElement(element, id)();
    }


    return (
        <div className="main-block">
            { dataCards.map(card =>
            <div key={card.id} className="main-block__item">
                <div onClick={(e) => onClickCardHandler(e.currentTarget, card.id)} className={card.disabled ? "item__info disabled" : "item__info"}>
                    <div className="item__info-title">
                    <div className="corner"></div>
                    <div className="rectangle">
                        <span>Сказачное заморское яство</span>
                    </div>
                    </div>
                    <div className="item__info-subtext">
                    <h2>Нямушка <span>{card.title}</span></h2>
                    {card.subtitles.map((title, index) =>
                        <span key={index}>{title}</span>
                    )}
                    <div className="item__info-subtext-img">
                        <img src={catPng} alt="cat png"></img>
                    </div>
                    <div className="item__info-subtext-weight">
                        <span>{card.weight}</span>
                        <span>кг</span>
                    </div>
                    </div>
                </div>
                <div className="item__subtext">
                    {card.selected ? (
                        <span className="selected">{card.subtext}</span>
                    ) : (
                        card.disabled ? 
                            <span className="disabled">Печалька, {card.title} закончился</span>
                        : 
                            <span>Чего сидишь? Порадуй котэ, <span className="item__subtext-buy" onClick={(e) => onClickTextHandler(e.target.parentNode.parentNode.previousElementSibling, card.id)}>купи</span></span>
                        )
                    }
                </div>
            </div>
            )}
        </div>
    );
}

export default Card;