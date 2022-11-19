package com.example.springboot.bean.po;

import com.example.springboot.bean.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;


@Component
//利用lombok注解
@Data
//所有有参构造
@AllArgsConstructor
//所有无参构造
@NoArgsConstructor
public class User extends BaseEntity implements Serializable {
    private Long uid;
    private String username;
    private String email;
    private String password;
    private Integer phone;
    private String salt; //盐值
    private String birthday;
    private String gender;
    private String image;
    private String introduce;
    private int types;  //类型，0用户，1管理员
    private int state; //状态，0普通用户，1vip ，2被封号， 3账号已注销
}
