import React from "react";
import classNames from "classnames/bind";
import styles from './Navbar.module.scss';


const cx = classNames.bind(styles);

const Navbar : React.FC = () => {
    return(
        <div className={cx('wrapper')}>
            <h1>Navbar</h1>
        </div>
    )
}

export default Navbar;