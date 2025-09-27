import React from "react";
import classNames from "classnames/bind";
import styles from './LocationItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

interface data {
    id?: number,
    name?: string,
    address?: string,
    onSelect?: (locationName: string) => void;
}


const LocationItem: React.FC<data> = ({id, name, address, onSelect}) => {

    const handleClick = () => {
        onSelect?.(name || '')
        console.log(name)
    }

    return (
        <div className={cx('wrapper')} onClick={handleClick}>
            <div className={cx('location_icon')}>
                <FontAwesomeIcon icon={faLocationDot} className={cx('location_dot')}/>
            </div>
            <div className={'location_detail'}>
                <p className={cx('name')}>{name}</p>
                <p className={cx('address')}>{address}</p>
            </div>
        </div>
    )
}

export default LocationItem;