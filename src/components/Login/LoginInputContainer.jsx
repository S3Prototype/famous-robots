import React from 'react'
import TextField from '@material-ui/core/TextField'

function LoginInputContainer(props) {
    const {
        inputProps,
        inputClass,
        containerClass,
    } = props.inputStyles

    const {
        emailTextFieldRef,
        emailRef,
        passwordRef,
        nameRef,
        currModal
    } = props.inputRefs

    return (
        <div className={containerClass}>
            {
                currModal.current === 'register' &&
                <TextField
                    inputProps={inputProps}
                    className={inputClass}
                    label="Full Name"
                    variant="outlined"
                    placeholder="Janet Yellen"
                    inputRef={nameRef}
                />
            }

            <TextField
                ref={emailTextFieldRef}
                inputProps={inputProps}
                className={inputClass}
                label="Email"
                variant="outlined"
                placeholder="ms.robot@mondorobot.com"
                inputRef={emailRef}
            />
                <TextField
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
