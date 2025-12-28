"use client"
import React, { useState, useEffect, useRef } from 'react'
import "./otp.scss"


const page = () => {
    const OTP_LENGTH = 6;
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [time, setTime] = useState(300);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (time === 0) return;
        const interval = setInterval(() => setTime(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [time]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
        if (!/^\d+$/.test(pasted)) return;

        const newOtp = pasted.split("");
        setOtp(newOtp);

        newOtp.forEach((_, i) => {
            inputsRef.current[i].value = newOtp[i];
        });
    };

    const isOtpComplete = otp.every(d => d !== "");

    const formatTime = () => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };
    return (
        <div className='Otp'>
            <div className="container">
                <div className="box">
                    <div className="header">
                        <h1>Visuels .com</h1>
                    </div>
                    <div className="top">
                        <h1>Verification Code</h1>
                    </div>
                    <p>Verification code is sent to <br /> emailId</p>
                    <div className="boxes" onPaste={handlePaste}>
                        {otp.map((value, i) => (
                            <input
                                key={i}
                                ref={el => (inputsRef.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={e => handleChange(e.target.value, i)}
                                onKeyDown={e => handleKeyDown(e, i)}
                                autoFocus={i === 0}
                            />
                        ))}
                    </div>

                    <div className="timer">
                        {time > 0 ? (
                            <span>Code expires in {formatTime()}</span>
                        ) : (
                            <button className="resend" onClick={() => setTime(300)}>
                                Resend OTP
                            </button>
                        )}
                    </div>

                    <div className="btn">
                        <button disabled={!isOtpComplete}>
                            Continue
                        </button>
                    </div>
                    <p className='last'>The code is valid for <br /> five minute</p>

                </div>
            </div>
        </div>
    )
}

export default page
