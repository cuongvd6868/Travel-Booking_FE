import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './Navbar.module.scss';
import DatePicker from '../DatePicker/DatePicker';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

// Helper function to format the date
const getInitialDateRange = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {  
    return `${date.getDate()}, ${date.getMonth() + 1} tháng ${date.getFullYear()}`;
  };

  return `${formatDate(today)} — ${formatDate(tomorrow)}`;
};

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stay");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    // Cập nhật giá trị khởi tạo tại đây
    displayText: getInitialDateRange()
  });

  const handleDateSelect = (checkIn: Date | null, checkOut: Date | null) => {
    if (checkIn && checkOut) {
      const formatDate = (date: Date) => {
        return `${date.getDate()}, ${date.getMonth() + 1} tháng ${date.getFullYear()}`;
      };
      
      setSelectedDates({
        checkIn,
        checkOut,
        displayText: `${formatDate(checkIn)} — ${formatDate(checkOut)}`
      });
    }
  };

  return (
    <>
      <header className={cx('wrapper')}>
        {/* Top navigation bar */}
        <div className={cx('top-nav-bar')}>
          <div className={cx('top-nav-content')}>
            <div className={cx('left-section')}>
                <Link to={'/'}>
                    <div className={cx('logo')}>Booking.com</div>
                </Link>
            </div>
            <div className={cx('right-section')}>
              {/* <div className={cx('dropdown-container')}>
                <button 
                  className={cx('dropdown-toggle')}
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  <span className={cx('icon')}>💰</span>USD
                </button>
                {showCurrencyDropdown && (
                  <div className={cx('dropdown-menu')}>
                    <div className={cx('dropdown-item')}>VND</div>
                    <div className={cx('dropdown-item')}>EUR</div>
                    <div className={cx('dropdown-item')}>GBP</div>
                  </div>
                )}
              </div> */}
              <a href="#" className={cx('top-nav-item')}>Hoạt động</a>
              <Link to={'/login'} className={cx('top-nav-item')}>Đăng nhập</Link>
            </div>
          </div>
        </div>

        {/* Search section */}
        <div className={cx('search-section')}>
          <div className={cx('search-content')}>
            <h1 className={cx('search-title')}>Tìm chỗ nghỉ tiếp theo</h1>
            <p className={cx('search-subtitle')}>Khám phá hàng nghìn ưu đãi hấp dẫn cho khách sạn, căn hộ, resort và nhiều loại hình chỗ nghỉ khác, phù hợp cho mọi chuyến đi của bạn...</p>
            
            {/* Search box */}
            <div className={cx('search-box')}>
              <div className={cx('search-input', 'location')}>
                <label className={cx('search-box_lable')}>Địa điểm</label>
                <input type="text" placeholder="Nhập điểm đến của bạn..." className={cx('search-box-input')}/>
              </div>
              
              <div 
                className={cx('search-input', 'date')}
                onClick={() => setIsDatePickerOpen(true)}
              >
                <label className={cx('search-box_lable')}>Ngày</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedDates.displayText}
                  placeholder="Chọn ngày" 
                  className={cx('search-box-input')}
                />
              </div>
              
              <div className={cx('search-input', 'guests')}>
                <label className={cx('search-box_lable')}>Khách & Phòng</label>
                <input type="text" placeholder="2 người lớn - 0 trẻ em - 1 phòng" className={cx('search-box-input')}/>
              </div>
              
              <button className={cx('search-button')}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Date Picker */}
      <DatePicker 
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </>
  );
};

export default Navbar;