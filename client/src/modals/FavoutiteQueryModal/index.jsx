import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import Button from '../../components/Button';
import CustomSlider from '../../components/CustomSlider';

import './style.scss';

const orderTypes = {
    date: 'Дате',
    rating: 'Рейтингу',
    relevance: 'Релевантности',
    title: 'Алфавиту',
    videoCount: 'Количеству видео на канале',
    viewCount: 'Количеству просмотров'
};

const FavouriteQueryModal = (props) => {

    const {
        isSave,
        isOpen,
        onToggle,
        handleSubmit
    } = props;

    return (
        <Modal className="favourite-query-modal" isOpen={isOpen} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>
                <span className="favourite-query-modal__title">{isSave ? 'Сохранить запрос' : 'Изменить запрос'}</span>
            </ModalHeader>
            <ModalBody>
                <form className="favourite-query-modal__form" onSubmit={handleSubmit}>
                    <div className="favourite-query-modal__form-item">
                        <label className="favourite-query-modal__label">Запрос</label>
                        <Field name="query" type="text" component={CustomInput} disabled={isSave} />
                    </div>

                    <div className="favourite-query-modal__form-item">
                        <label className="favourite-query-modal__label">Название</label>
                        <Field name="name" type="text" component={CustomInput} />
                    </div>

                    <div className="favourite-query-modal__form-item">
                        <label className="favourite-query-modal__label">Сортировать по</label>
                        <Field name="order" component={CustomSelect} options={orderTypes} defaultValue="relevance" />
                    </div>

                    <div className="favourite-query-modal__form-item">
                        <label className="favourite-query-modal__label">Максимальное количество</label>
                        <Field name="maxResults" component={CustomSlider} min={0} max={50} />
                    </div>
                    <div className="favourite-query-modal__form-item favourite-query-modal__footer">
                        <Button className="favourite-query-modal__button" type="button" outline onClick={onToggle}>
                            {isSave ? 'Не сохранять' : 'Не изменять'}
                            </Button>
                        <Button className="favourite-query-modal__button" type="submit">
                            {isSave ? 'Сохранить' : 'Изменить'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
}

export default reduxForm({
    form: 'FavouriteForm'
})(FavouriteQueryModal);