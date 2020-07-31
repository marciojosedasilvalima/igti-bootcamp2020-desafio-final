import React, { useState } from 'react';

const TransactionInput = ({ filter, openModal }) => {
    const [filtroInput, setFitroInput] = useState('');

    return (
        <div className="row valign-wrapper" style={{ marginTop: '15px' }}>
            <div className="col s3">
                <button
                    className="waves-effect waves-light btn"
                    style={{
                        textTransform: 'uppercase',
                        zIndex: '0 !important',
                    }}
                    onClick={openModal}
                >
                    <span>+ Novo Lançamento</span>
                </button>
            </div>

            <div className="input-field col s9">
                <input
                    id="filtroInput"
                    type="text"
                    value={filtroInput}
                    className="validate"
                    onChange={(event) => {
                        const input = event.target.value;
                        setFitroInput(input);
                        filter(input);
                    }}
                />
            </div>
        </div>
    );

    /*
    return (
        <div style={style.transactionsView}>
            <div class="row valign-wrapper">
                <div className="col s3">
                    <button
                        className="waves-effect waves-light btn"
                        style={{ textTransform: 'uppercase' }}
                    >
                        <span>+ Novo Lançamento</span>
                    </button>
                </div>

                <div class="col s9">
                    <input
                        value={filtroInput}
                        onChange={(event) => {
                            const input = event.target.value;
                            setFitroInput(input);
                            filter(input);
                        }}
                    />
                </div>
            </div>
        </div>
    );
    
// Parte do código que não funcionou
   <label for="filtroInput">
   Filtrar Lançamentos por descrição
</label> 
*/
};

export default TransactionInput;
