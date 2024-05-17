import s from './StyledContainer.module.scss';
export default function StyledContainer({ children }) {
    return (
        <div className={s.StyledContainer}>{children}</div>
    )
}