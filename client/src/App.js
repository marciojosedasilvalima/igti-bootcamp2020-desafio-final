import React from 'react';
import style from './style/main';
import TransactionsView from './components/TransactionsView';

export default function App() {
    return (
        <div className="container center">
            <h4 style={style.title}>Bootcamp Full Stack - Desafio Final</h4>
            <h6 style={style.subtitle}>controle Financeiro Pessoal</h6>

            <TransactionsView />
        </div>
    );
}
