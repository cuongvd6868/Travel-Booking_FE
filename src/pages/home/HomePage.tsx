import React from "react";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss';
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import LocationList from "~/components/Location/LocationList";


const cx = classNames.bind(styles);

const HomePage : React.FC = () => {
    return(
        <div className={cx('wrapper')}>
            <div className={cx('home')}>
                <LocationList/>
            </div>
        </div>
    )
}

export default HomePage;