package com.example.springboot.service.ex;

/**
 * 验证码未发送的异常
 */
public class CodeNotSendException extends ServiceException{
    public CodeNotSendException() {
        super();
    }

    public CodeNotSendException(String message) {
        super(message);
    }

    public CodeNotSendException(String message, Throwable cause) {
        super(message, cause);
    }

    public CodeNotSendException(Throwable cause) {
        super(cause);
    }

    protected CodeNotSendException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
