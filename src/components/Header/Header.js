import s from './Header.module.scss';
import { UserAuth } from '../../api-functions/api-functions';

export default function Header() {
    return (
        <div className={s.HeaderField}>
            <h1 className={s.Title}>ex-b<span className={s.JumpLetter}>o</span>ok change</h1>
        </div>
    )
}