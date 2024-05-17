import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import AdTemplate from "../../components/AdTemplate/AdTemplate";
import s from './SearchPage.module.scss';

// images
import { SearchIcon } from "../../images/SearchIcon";
import NoSearchImg from "../../images/no-search-result.webp";
import { CloseFilledIcon } from "../../images/CloseFilledIcon";

// operations
import { searchAds, fetchFavouritesAds } from "../../redux/ads/ads-operations";

// selectors
import { getUserID } from '../../redux/auth/auth-selectors';
import { getFavouritesAds, getFetchAds } from "../../redux/ads/ads-selectors";


export default function SearchPage() {
    const [search, setSearch] = useState('');
    const [previousSearch, setPreviousSearch] = useState('');
    const fetchAds = useSelector(getFetchAds);
    const userID = useSelector(getUserID);
    const dispatch = useDispatch();


    const reset = useCallback(() => {
        setSearch('');
    }, []);

    const handleChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const onSearchAds = useCallback((e) => {
        e.preventDefault();
        if (!search.trim()) {
            return;
        }

        if (previousSearch === search) {
            return;
        }

        dispatch(searchAds(search));
        setPreviousSearch(search);
        reset();
    }, [dispatch, search, reset, previousSearch]);

    useEffect(() => {
        dispatch(fetchFavouritesAds(userID))
    }, [dispatch])

    return (

        <div className={s.SearchPage}>
            <form className={s.InputField} onSubmit={onSearchAds}>
                <SearchIcon className={s.SearchIcon} />
                {search.length >= 1
                    ? <motion.button
                        initial={{ opacity: 0, scale: 0.7, translateY: "-50%" }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.5 }}
                        type='button'
                        className={s.CloseFilledIcon} ><CloseFilledIcon onClick={reset} /></motion.button>
                    : null
                }

                <input
                    className={s.Input}
                    type='text'
                    name="search"
                    value={search}
                    placeholder="Type for search.."
                    onChange={handleChange}
                />
            </form>

            <div className={s.SearchResultField}>

                {fetchAds.length === 0
                    ? <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={s.NotFoundField}
                    >
                        <img className={s.NotFoundImg} src={NoSearchImg} alt="No search results" width={400} height={300} />
                        <span className={s.NotFoundFirstSpan}>Oh no...</span>
                        <span className={s.NotFoundSecondSpan}>ads not found</span>
                    </motion.div>
                    : <AdTemplate
                        fetchAds={fetchAds}
                    />

                }

            </div>
        </div>

    )
}