package com.example.springboot.controller;

import com.example.springboot.service.ex.*;
import com.example.springboot.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpSession;

/**
 * 控制层的积基类
 * 主要做异常的捕获处理
 */
public class BaseController {

    public static final int OK = 200;

    //用于统一处理抛出的异常
    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleException(Throwable e) {
        JsonResult<Void> result = new JsonResult<>(e);
        if (e instanceof EmailDuplicatedException) {  //注册
            result.setState(4000);
            result.setMessage("邮箱已经注册");
        } else if (e instanceof InsertException) {
            result.setState(5000);
            result.setMessage("插入数据时产生未知的异常");
        }  else if (e instanceof CodeNotSendException) { //（发送验证码）
            result.setState(4003);
            result.setMessage("验证码未发送");
        } else if (e instanceof CodeNotMatchException) {
            result.setState(4004);
            result.setMessage("验证码错误");
        }else if (e instanceof EmailNotFoundException){ //登录
            result.setState(4001);
            result.setMessage("用户数据不存在");
        } else if(e instanceof AccountException){
            result.setState(4002);
            result.setMessage("用户已被封号");
        } else if (e instanceof UsernameDuplicatedException){ //修改资料
            result.setState(4005);
            result.setMessage("用户名已被占用");
        }
        return result;
    }

    /**
     * 获取session对象中的uid
     * @param session session对象
     * @return 当前登录的用户uid的值
     */
    public final Integer getUidFromSession(HttpSession session) {
        //getAttribute返回的是Object对象,需要转换为字符串再转换为包装类
        return Integer.valueOf(session.getAttribute("uid").toString());
    }

    public final String getUsernameFromSession(HttpSession session) {
        return session.getAttribute("username").toString();
    }

}
