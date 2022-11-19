//package com.example.springboot.controller;
//
//package com.atguigu.msmservice.controller;
//
//import com.atguigu.commonutils.R;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.mail.MailException;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.web.bind.annotation.*;
//
//import javax.annotation.Resource;
//
//import java.util.Random;
//import java.util.concurrent.TimeUnit;
//
//@RestController
//@RequestMapping("/messervice/email")
//@CrossOrigin
//public class EmailController {
//    @Autowired
////    private RedisTemplate<String,String> redisTemplate;
//    @Resource
//    private JavaMailSender javaMailSender;
//
//    //读取yml文件中username的值并赋值给form
//    @Value("${spring.mail.username}")
//    private String from;
//
//    @GetMapping("/sendEmail/{emailReceiver}")
//    public R sendSimpleMail(@PathVariable String emailReceiver) {
//        // 构建一个邮件对象
//        SimpleMailMessage message = new SimpleMailMessage();
//        // 设置邮件发送者
//        message.setFrom(from);
//        // 设置邮件接收者
//        message.setTo(emailReceiver);
//        // 设置邮件的主题
//        message.setSubject("登录验证码");
//        // 设置邮件的正文
//        Random random = new Random();
//        StringBuilder code = new StringBuilder();
//        for (int i = 0; i < 6; i++) {
//            int r = random.nextInt(10);
//            code.append(r);
//        }
//        String text = "您的验证码为：" + code + ",请勿泄露给他人。";
//        message.setText(text);
//
//        // 发送邮件
//        try {
//            javaMailSender.send(message);
//            //将验证码保存到redis缓存中，设置有效时间为5分钟
//            redisTemplate.opsForValue().set(emailReceiver, String.valueOf(code),5, TimeUnit.MINUTES);
//            return R.ok();
//        } catch (MailException e) {
//            e.printStackTrace();
//        }
//        return R.error().message("发送失败");
//    }
//}