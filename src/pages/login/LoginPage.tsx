import React from "react";
import classNames from "classnames/bind";
import styles from './LoginPage.module.scss';


const cx = classNames.bind(styles);

const LoginPage : React.FC = () => {
    return(
        <div className={cx('wrapper')}>
            <h1>Navbar</h1>
        </div>
    )
}

export default LoginPage;