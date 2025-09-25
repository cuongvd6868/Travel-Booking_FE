import React, { useEffect, useState, useRef, useCallback } from "react";
import classNames from "classnames/bind";
import styles from './LocationList.module.scss';
import { getAllLocations } from "~/services/LocationService";
import { LocationTV } from "~/types/Location";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";




const cx = classNames.bind(styles);

interface LocationCardProps {
    location: LocationTV;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => (
    <div className={cx('location-card')}>
        {/* Card tinh tế sẽ không có overlay cầu kỳ */}
        
        <div className={cx('image-container')}>
            <img 
                src={location.imageUrl} 
                alt={location.name} 
                className={cx('location-image')} 
            />
        </div>
        
        <div className={cx('info')}>
            <h3 className={cx('name')}>{location.name}</h3>
        </div>
    </div>
);


const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<LocationTV[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                setError(null);
                const apiResponse = await getAllLocations();
                setLocations(apiResponse);
            } catch (error) {
                console.log('lỗi khi lấy dữ liệu:', error);
                setError('Không tải được dữ liệu, vui lòng thử lại sau');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    const scroll = useCallback((direction: 'left' | 'right') => {
        if (listRef.current) {
            const scrollAmount = listRef.current.offsetWidth / 5; 
            
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount * 1.1 : scrollAmount * 1.1,
                behavior: 'smooth',
            });
        }
    }, []);

    // --- Conditional Rendering for State ---
    if (loading) {
        return (
            <><LoadingSpinner/></>
        );
    }

    if (error) {
        return (
            <div className={cx('wrapper', 'error-state')}>
                <h1 className={cx('title')}>Featured Locations</h1>
                <p className={cx('error-message')}>❌ {error}</p>
            </div>
        );
    }



    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Khám Phá Việt Nam</h1>
            
            <div className={cx('carousel-container')}>
                <button 
                    className={cx('nav-button', 'left')} 
                    onClick={() => scroll('left')}
                    aria-label="Cuộn sang trái"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className={cx('location-list')} ref={listRef}>
                    {locations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                    ))}
                </div>

                <button 
                    className={cx('nav-button', 'right')} 
                    onClick={() => scroll('right')}
                    aria-label="Cuộn sang phải"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default LocationList;