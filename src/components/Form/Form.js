import React, { useCallback, useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../images/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../images/EyeSlashFilledIcon";
import s from './Form.module.scss';
import PropTypes from 'prop-types';


export default function Form({ title, text, route, linkTitle, inputName = false, btnTitle, onSubmit }) {
    const [nicknameValue, setNicknameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const minPasswordLength = 8;

    const validateEmail = (emailValue) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const isPasswordInvalid = useMemo(() => {
        return passwordValue !== "" && passwordValue.length < minPasswordLength ? true : false;
    }, [passwordValue]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const apiFunction = useCallback((inputName) => {
        if (inputName) {
            onSubmit(emailValue, passwordValue, nicknameValue);

        } else {
            onSubmit(emailValue, passwordValue);
        }

    }, [emailValue, passwordValue, nicknameValue, onSubmit, inputName])
    return (
        <>
            <h1 className={s.Title}>{title}</h1>
            <div className={s.LogInRoute}>
                <p>{text}</p>
                <a href={route}>{linkTitle}</a>
            </div>

            {inputName ? <Input type="name" variant="underlined" label="Nickname" value={nicknameValue} onValueChange={setNicknameValue} /> : null}
            <Input
                type="email"
                variant="underlined"
                label="Email"
                value={emailValue}
                isInvalid={isInvalidEmail}
                errorMessage={isInvalidEmail && "Please enter a valid email"}
                onValueChange={setEmailValue} />
            <Input
                type={isVisible ? "text" : "password"}
                label="Password"
                variant="underlined"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                value={passwordValue}
                isInvalid={isPasswordInvalid}
                errorMessage={isPasswordInvalid && "Please use 8 or more symbols for your password"}
                onValueChange={setPasswordValue}
            />
            <div><button className={s.SubmitButton} type="submit" onClick={apiFunction}>{btnTitle}</button></div>

        </>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.string,
    route: PropTypes.string,
    linkTitle: PropTypes.string,
    inputName: PropTypes.bool,
    btnTitle: PropTypes.string,
}