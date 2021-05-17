import React from 'react'
import TextField from '@material-ui/core/TextField'

function LoginInputContainer(props) {
    const {
        inputProps,
        inputClass,
        textInputContainerClass
    } = props.inputStyles

    const {
        emailTextFieldRef,
        emailRef,
        passwordRef,
        nameRef,
        currModal
    } = props.inputRefs

    return (
        <div className={textInputContainerClass}>
            {
                currModal.current === 'register' &&
                <TextField
                    onKeyPress={props.onKeyPress}
                    inputProps={inputProps}
                    className={inputClass}
                    label="Full Name"
                    variant="outlined"
                    placeholder="Janet Yellen"
                    inputRef={nameRef}
                />
            }

            <TextField
                onKeyPress={props.onKeyPress}
                ref={emailTextFieldRef}
                inputProps={inputProps}
                className={inputClass}
                label="Email"
                variant="outlined"
                placeholder="ms.robot@mondorobot.com"
                inputRef={emailRef}
            />
            
            <TextField
                onKeyPress={props.onKeyPress}
                inputProps={inputProps}
                type="password"                    
                label="Password"
                variant="outlined"
                placeholder="Password Here"
                inputRef={passwordRef}
            />
        </div>
    )
}

export default LoginInputContainer
