import React from "react";
import classNames from "classnames/bind";
import styles from './HomePage.module.scss';


const cx = classNames.bind(styles);

const HomePage : React.FC = () => {
    return(
        <div className={cx('wrapper')}>
            <h1>HomePage</h1>
        </div>
    )
}

export default HomePage;