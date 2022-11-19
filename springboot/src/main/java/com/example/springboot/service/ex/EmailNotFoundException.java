package com.example.springboot.service.ex;


/**
 * 邮箱没有被找到的异常
 */
public class EmailNotFoundException extends ServiceException{
    public EmailNotFoundException() {
        super();
    }

    public EmailNotFoundException(String message) {
        super(message);
    }

    public EmailNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmailNotFoundException(Throwable cause) {
        super(cause);
    }

    protected EmailNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
