package com.example.springboot.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginFormDTO {
    private Long uid;
    private String username;
    private String image;
    private String email;
    private String password;
    private boolean ifExist = true; //默认用户存在
    private boolean ifIllegal = true; //默认邮箱密码正确
}
