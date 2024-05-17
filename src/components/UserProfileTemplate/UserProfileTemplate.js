import { Link } from "@nextui-org/react";
import PropTypes from 'prop-types';

import s from './UserProfileTemplate.module.scss';

export default function UserProfileTemplate({ imageURL, name, nickname, description, location }) {
    return (
        <>
            <div className={s.ProfileField} >
                {imageURL === ""
                    ? <img className={s.ProfileAvatar} src='https://firebasestorage.googleapis.com/v0/b/bookshop-app-26c08.appspot.com/o/profileImages%2Favatar-15.png?alt=media&token=46022054-1340-41e0-852e-df0c15271c82' alt='User default avatar' />
                    : <img className={s.ProfileAvatar} src={imageURL} alt="User avatar icon" />
                }

                {name === ""
                    ? null
                    : <p className={s.UserName}>{name} </p>}
                <Link href="#" color="foreground" size='lg'>@{nickname}</Link>

                <div className={s.ProfileDiscription}>
                    {description === ""
                        ? <p className={s.UserDescription}>Write few words about yourself </p>
                        : <p className={s.UserDescription}>{description} </p>}

                    <p className={s.LocationField}>{location}</p>
                </div>

            </div>

        </>
    )
}


UserProfileTemplate.propTypes = {
    imageURL: PropTypes.string,
    name: PropTypes.string,
    nickname: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
}