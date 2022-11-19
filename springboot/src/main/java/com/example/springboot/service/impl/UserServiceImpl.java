package com.example.springboot.service.impl;

import com.example.springboot.bean.dto.LoginFormDTO;
import com.example.springboot.bean.dto.RegFormDao;
import com.example.springboot.config.RedisConfig;
import com.example.springboot.mapper.UserMapper;
import com.example.springboot.bean.po.User;
import com.example.springboot.service.IUserService;
import com.example.springboot.service.ex.*;
import com.example.springboot.util.MD5;
import com.example.springboot.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 用户模块业务层实现类
 */
@Service //@Service注解:将当前类的对象交给Spring来管理,自动创建对象以及对象的维护
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;
    private RedisTemplate<String,String> redisTemplate;

    @Resource
    private JavaMailSender javaMailSender;

    /**
     * 注册
     */

    @Override
    public void reg(RegFormDao reguser, HttpServletRequest request) {
        String email = reguser.getEmail();
        System.out.println("        王君月"+email);
        User result = userMapper.findByEmail(email);
        if (result != null) {
            throw new EmailDuplicatedException("该邮箱已注册");
        }
        HttpSession session = request.getSession(false);
        String Code = (String) session.getAttribute("code");
        if (session == null) {
            throw new CodeNotSendException("验证码未发送");
        }
        if (!reguser.getCode().equals(Code)) {
            throw new CodeNotMatchException("验证码错误");
        }
        /**   加密处理   */
        String oldpassword = reguser.getPassword();
        //1.随机生成一个盐值(大写的随机字符串)
        String salt = UUID.randomUUID().toString().toUpperCase();
        //2.将密码和盐值作为一个整体进行加密处理
        String md5Password = new MD5().getMD5Password(oldpassword, salt);
        User user = new User();
        //3.将盐值保存到数据库
        user.setSalt(salt);
        //4.将加密之后的密码重新补全设置到user对象当中
        user.setPassword(md5Password);
        user.setEmail(email);
        user.setUsername("用户"+UUID.randomUUID().toString());
        user.setTypes(0);
        user.setCreatedUser(user.getUsername());
        user.setModifiedUser(user.getUsername());
        Date date = new Date();
        user.setCreatedTime(date);
        user.setModifiedTime(date);
        //执行注册业务功能的实现
        Integer rows = userMapper.addUser(user);
        if (rows != 1) {
            throw new InsertException("在用户注册过程中产生了未知的异常");
        }
    }

    /**
     * 登录
     * @return
     */
    @Override
    public LoginFormDTO login(String email, String password) {
        User result = userMapper.findByEmail(email);
        if (result == null) {
            throw new EmailNotFoundException("用户数据不存在");
        }
        String oldPassword = result.getPassword();
        String salt = result.getSalt();
        String newMd5Password = new MD5().getMD5Password(password, salt);
        if (!newMd5Password.equals(oldPassword)) {
            throw new PasswordNotMatchException("用户密码错误");
        }
        if (result.getTypes() == 2) {
            throw new AccountException("用户已被封号");
        }else if (result.getTypes() == 3) {
            throw new EmailNotFoundException("用户数据不存在");
        }
        //返回三个数据uid,username,image为了之后的页面展示
        //这样使层与层之间传输时数据体量变小,后台层与层之间传输时数据量越小性能越高,
        // 前端也是的,数据量小了前端响应速度就变快了
        LoginFormDTO user = new LoginFormDTO();
        user.setUid(result.getUid());
        user.setUsername(result.getUsername());
        user.setImage(result.getImage());
        return user;
    }


    /**
     * 发送验证码
     */
    //读取yml文件中username的值并赋值给form
    @Value("${spring.mail.username}")
    private String from="";
    private String code;
    @Override
    public String sendCode(String to) {
        code = RandomUtil.generateMixStr(6);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject("登录验证码");
        simpleMailMessage.setText("您的验证码为:" + code + ",请勿泄露给他人。");
        try {
            javaMailSender.send(simpleMailMessage);
            // 将生成的验证码保存到Redis中并设置有效期五分钟
            redisTemplate.opsForValue().set(to, code, 5, TimeUnit.MINUTES);
        } catch (MailException e) {
            e.printStackTrace();
        }
        return code;
    }


    /**
     * 根据用户的uid查询用户的数据
     */
    @Override
    public User findByUid(Integer uid) {
        return null;
    }



    /**
     * 根据用户的uid来修改用户密码
     */
    @Override
    public Integer updatePasswordByUid(Integer uid, String password, String modifiedUser, Date modifiedTime) {
        return null;
    }


    /**
     * 根据用户的uid更新用户的信息
     */
    @Override
    public Integer updateInfoByUid(User user) {
        return null;
    }


    /**
     * 上传头像
     */
    @Override
    public void uploadImg(Integer uid, String avatar, String username) {

    }


    /**
     * 根据用户uid修改用户的头像
     */
    @Override
    public Integer updateImgByUid(Integer id, String img, String modifiedUser, Date modifiedTime) {
        return null;
    }

    @Override
    public void logout(HttpServletRequest request) {
        //清除Session
        request.getSession().removeAttribute("user");
    }


}
