import NotPageFoundImg from '../../images/404-page.png';
import s from './NotFound.module.scss';
export default function NotFound() {
    return (
        <div className={s.NotFoundPage}>
            <h3>Oops!</h3>
            <img src={NotPageFoundImg} alt='Page Not Found' width={350} height={300} />
        </div>
    )
}