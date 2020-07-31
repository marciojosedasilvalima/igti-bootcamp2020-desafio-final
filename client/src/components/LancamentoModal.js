import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import style from '../style/main';
import { create, update } from '../service/TransactionService';

Modal.setAppElement('#root');

Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

/*
Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
*/

const LancamentoModal = ({ isModalOpen, closeModal, lancamento }) => {
    const [message, setMessage] = useState({
        msg: null,
        type: null,
    });

    const [form, setForm] = useState({
        description: '',
        category: '',
        value: '',
        type: '+',
        yearMonthDay: new Date().toDateInputValue(),
    });

    useEffect(() => {
        if (lancamento !== null) {
            const {
                description,
                category,
                value,
                yearMonthDay,
                type,
            } = lancamento;

            setForm({ description, category, value, yearMonthDay, type });
        }
    }, [lancamento]);

    const salvarLancamento = () => {
        const { description, category, value, yearMonthDay } = form;

        if (
            description === '' ||
            category === '' ||
            value === '' ||
            yearMonthDay === ''
        ) {
            setMessage({ msg: 'Preencher todos os campos.', type: 'error' });
            return;
        }

        const [year, month, day] = yearMonthDay
            .split('-')
            .map((vLu) => parseInt(vLu));
        const yearMonth = yearMonthDay.substring(0, 7);

        let novoLancamento = { ...form, year, month, day, yearMonth };

        if (!lancamento) {
            create(novoLancamento)
                .then((response) => {
                    setMessage({
                        msg: 'Lançamento salvo com sucesso!',
                        type: 'sucess',
                    });
                })
                .catch((error) => {
                    setMessage({
                        msg: 'Erro ao salvar o lançamento.',
                        type: 'error',
                    });
                });
        } else {
            update(lancamento._id, novoLancamento)
                .then((response) => {
                    setMessage({
                        msg: 'Lançamento atualizado com sucesso!',
                        type: 'sucess',
                    });
                })
                .catch((error) => {
                    setMessage({
                        msg: 'Erro ao editar o lançamento.',
                        type: 'error',
                    });
                });
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={style.modal}
            contentLabel="Example Modal"
        >
            <div className="row valign-wrapper">
                <div className="col s11 valign-wrapper">
                    <h5>{`${
                        lancamento ? 'Edição' : 'Inclusão'
                    } de lançamento`}</h5>
                </div>
                <div className="col s2 valign-wrapper">
                    <button
                        className="waves-effect waves-light btn-small red"
                        onClick={() => {
                            setForm({
                                description: '',
                                category: '',
                                value: '',
                                type: '+',
                                yearMonthDay: new Date().toDateInputValue(),
                            });
                            setMessage({
                                msg: null,
                                type: null,
                            });
                            closeModal();
                        }}
                    >
                        <i className="material-icons">close</i>
                    </button>
                </div>
            </div>
            <div style={style.lancamentoForm}>
                <div className="row">
                    <div className="col s3"></div>

                    <label className="col s2">
                        <input
                            type="radio"
                            value="+"
                            checked={form.type === '+'}
                            disabled={lancamento}
                            onChange={(changeEvent) => {
                                setForm({
                                    ...form,
                                    type: changeEvent.target.value,
                                });
                            }}
                        />
                        <span style={{ color: 'green' }}>Receita</span>
                    </label>

                    <div className="col s1"></div>

                    <label className="col s2">
                        <input
                            type="radio"
                            value="-"
                            checked={form.type === '-'}
                            disabled={lancamento}
                            onChange={(changeEvent) => {
                                setForm({
                                    ...form,
                                    type: changeEvent.target.value,
                                });
                            }}
                        />
                        <span style={{ color: 'red' }}>Despesa</span>
                    </label>
                </div>

                <div className="row">
                    <div className="col s12">
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            id="descricao"
                            type="text"
                            value={form.description}
                            className="validate"
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    description: event.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <label htmlFor="categoria">Categoria</label>
                        <input
                            id="categoria"
                            type="text"
                            value={form.category}
                            className="validate"
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    category: event.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col s6">
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            type="text"
                            value={form.value}
                            className="validate"
                            onChange={(event) => {
                                setForm({ ...form, value: event.target.value });
                            }}
                        />
                    </div>

                    <div className="col s6">
                        <label htmlFor="date">Data</label>
                        <input
                            id="date"
                            type="date"
                            value={form.yearMonthDay}
                            className="validate"
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    yearMonthDay: event.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>

            {message && message.msg && (
                <p
                    style={{
                        color: message.type === 'error' ? 'red' : 'green',
                        margin: '5px',
                    }}
                >
                    {message.msg}
                </p>
            )}

            <button
                className="waves-effect waves-light btn-small"
                style={{ marginTop: '15px' }}
                onClick={() => salvarLancamento()}
            >
                SALVAR
            </button>
        </Modal>
    );
};

export default LancamentoModal;
