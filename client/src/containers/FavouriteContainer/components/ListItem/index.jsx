import React from 'react';
import {List} from 'antd';
import PropTypes from 'prop-types';

import './style.scss';

const ListItem = ({name, onClick, onEdit, onRemove}) => {

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit();
    }

    const handleRemove = (e) => {
        e.stopPropagation();
        onRemove();
    }

    return (
        <List.Item className="list-item" onClick={onClick}>
            <div className="list-item__name">{name}</div>
            <div className="list-item__actions">
                <span className="list-item__action list-item__action-edit" onClick={handleEdit}>
                    Изменить
                </span>
                <span className="list-item__action list-item__action-remove" onClick={handleRemove}>
                    Удалить
                </span>
            </div>
        </List.Item>
    )
}

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default ListItem;