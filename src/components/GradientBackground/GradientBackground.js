import s from './GradientBackground.module.scss';

export default function GradientBackground() {
    return (
        <div className={s.Gradient}>
            <span className={s.CircleUp}></span>
            <span className={s.CircleDown}></span>
            <span className={s.CircleLeft}></span>
            <span className={s.CircleRight}></span>
        </div>
    )
}