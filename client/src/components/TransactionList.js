import React from 'react';
import style, { colors } from '../style/main';

const TransactionList = ({ transactions, edit, remove }) => {
    return (
        <div style={style.list}>
            {transactions &&
                transactions.map((trns, index) => (
                    <div
                        key={index}
                        style={{
                            ...style.listItem,
                            backgroundColor:
                                trns.type === '-'
                                    ? colors.lightRed
                                    : colors.lightGreen,
                        }}
                    >
                        <div className="row list-item valign-wrapper">
                            <div className="col valign-wrapper">
                                <strong>{trns.day}</strong>
                            </div>
                            <div className="col s9">
                                <div className="row list-item">
                                    <div className="col">
                                        <strong>{trns.category}</strong>
                                    </div>
                                </div>
                                <div className="row list-item">
                                    <div className="col">
                                        {trns.description}
                                    </div>
                                </div>
                            </div>
                            <div className="col s2 valign-wrapper">{`R$ ${trns.value.toFixed(
                                2
                            )}`}</div>
                            <div className="col s2 valign-wrapper">
                                <i
                                    className="small material-icons"
                                    style={{
                                        marginRight: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => edit(trns)}
                                >
                                    create
                                </i>

                                <i
                                    className="small material-icons"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => remove(trns._id)}
                                >
                                    clear
                                </i>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TransactionList;
