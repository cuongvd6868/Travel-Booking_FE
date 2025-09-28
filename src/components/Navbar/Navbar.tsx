import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './Navbar.module.scss';
import DatePicker from '../DatePicker/DatePicker';
import { Link } from "react-router-dom";
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from "../Popper/Popper";
import LocationItem from "../Location/LocationItem/LocationItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { LocationTV } from "~/types/Location";
import { getLocationsByName } from "~/services/LocationService";
import GuestAndRoomPicker from "../GuestAndRoomPicker/GuestAndRoomPicker";

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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    displayText: getInitialDateRange()
  });
  //select location
  const [searchLocationResult, setSearchLocationResult] = useState<LocationTV[]>([]);
  const [showLocationResult, setShowLocationResult] = useState(true);
  const [inputLocationValue, setInputLocationValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
    
    // --- 3. State cho Guest/Room Picker ---
  const [isGuestsPickerOpen, setIsGuestsPickerOpen] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });

    // Helper để tạo chuỗi hiển thị Guest/Room
    const getGuestDisplayText = (): string => {
        const { adults, children, rooms } = guestDetails;
        return `${adults} người lớn - ${children} trẻ em - ${rooms} phòng`;
    };

    // Hàm xử lý chọn Guest/Room từ Modal
    const handleGuestSelect = (adults: number, children: number, rooms: number) => {
        setGuestDetails({ adults, children, rooms });
    };


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

  const handleHideResult = () => {
    setShowLocationResult(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInputLocationValue(e.target.value);
      // 2. BẬT hiển thị kết quả (chỉ bật nếu có giá trị)
      if (e.target.value.trim() !== '') {
          setShowLocationResult(true);
      } else {
          // Tùy chọn: Ẩn nếu xóa hết ký tự
          setShowLocationResult(false);
      }
  }

  const handleLocationSelect = (selectedName: string) => {
    setInputLocationValue(selectedName)
    setShowLocationResult(false)
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiResponse = await getLocationsByName(inputLocationValue); //await sẽ dừng lại cho đến khi lời hứa hoàn thành.
        const safeResults = apiResponse ?? []; 
        setSearchLocationResult(safeResults);
      } catch (error) {
        console.log('lỗi không lấy được dữ liệu:', error);
        setError('Lỗi không lấy được dữ liệu, vui lòng thử lại sau')
      } finally {
        setLoading(false)
      }
    }
    fetchLocations()
  }, [inputLocationValue])


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
            <HeadlessTippy
                interactive={true}
                visible={showLocationResult && searchLocationResult.length >= 1}
                placement="bottom-start"
                render={attrs => (
                    <div className={cx('search-result')}>
                        <Popper>
                          {searchLocationResult.map((location) => (
                            <LocationItem key={location.id} name={location.name} address={location.address} onSelect={handleLocationSelect}/>
                          ))}
                        </Popper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
              <div className={cx('search-box')}>
                <div className={cx('search-input', 'location')}>

                  <label className={cx('search-box_lable')}>Địa điểm</label>
                  <input type="text" placeholder="Nhập điểm đến của bạn..." className={cx('search-box-input')} 
                    value={inputLocationValue}
                    onChange={handleInputChange}/>
                  
                </div>
                
                <div className={cx('search-input', 'date')} onClick={() => setIsDatePickerOpen(true)}>
                  <label className={cx('search-box_lable')}>Ngày</label>
                  <input  type="text"  readOnly  value={selectedDates.displayText} placeholder="Chọn ngày"  className={cx('search-box-input')}/>
                </div>
                
                {/* <div className={cx('search-input', 'guests')}>
                  <label className={cx('search-box_lable')}>Khách</label>
                  <input type="text" placeholder="2 người lớn - 0 trẻ em - 1 phòng" className={cx('search-box-input')}/>
                </div> */}
                <div className={cx('search-input', 'guests')} onClick={() => setIsGuestsPickerOpen(true)}>
{/*                     <label className={cx('search-box_lable')}>Khách & Phòng</label> */}

                    <input 
                        type="text" 
                        readOnly 
                        value={getGuestDisplayText()} 
                        className={cx('search-box-input')}
                    />
                </div>

                <button className={cx('search-button')}>Tìm kiếm</button>
              </div>
            </HeadlessTippy>
          </div>
        </div>
      </header>

      {/* Date Picker */}
      <DatePicker 
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateSelect={handleDateSelect}
      />

            {/* Guest & Room Picker Modal */}
      <GuestAndRoomPicker
          isOpen={isGuestsPickerOpen}
          onClose={() => setIsGuestsPickerOpen(false)}
          onSelect={handleGuestSelect}
          initialAdults={guestDetails.adults}
          initialChildren={guestDetails.children}
          initialRooms={guestDetails.rooms}
      />
    </>
  );
};

export default Navbar;