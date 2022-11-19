package com.example.springboot.service.ex;

/**
 * 用户已被封号的异常
 */
public class AccountException extends ServiceException{
    public AccountException() {
        super();
    }

    public AccountException(String message) {
        super(message);
    }

    public AccountException(String message, Throwable cause) {
        super(message, cause);
    }

    public AccountException(Throwable cause) {
        super(cause);
    }

    protected AccountException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
