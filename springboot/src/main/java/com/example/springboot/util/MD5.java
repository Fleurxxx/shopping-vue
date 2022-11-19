package com.example.springboot.util;

import org.springframework.util.DigestUtils;

public class MD5 {
    /**
     * 密码加密处理作用:
     * 1.后端不再能直接看到用户的密码
     * 2.忽略了密码原来的强度,提升了数据安全性
     * 密码加密处理的实现:
     * 串 + password + 串 -> 交给 md5算法连续加密三次
     * 串就是数据库字段中的盐值,是一个随机字符串
     */

    /**
     * 检测用户的密码是否匹配:
     * 1.先获取数据库中加密之后的密码
     * 2.和用户传递过来的密码进行比较
     *  >先获取盐值
     *  >将获取的用户密码按照相同的md5算法加密
     */

    //内部做三次加密操作
    public String getMD5Password(String password, String salt) {
        for (int i = 0; i < 3; i++) {
            password = DigestUtils.md5DigestAsHex((salt + password + salt).getBytes()).toUpperCase();
        }
        return password;
    }

}
