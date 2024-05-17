import { BeatLoader } from "react-spinners";
import s from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={s.LoaderField}>
            <BeatLoader color="#ab35a373" height={4} />
        </div >
    )
}