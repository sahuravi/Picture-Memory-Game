package com.ravi.user.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.ravi.user.model.LoginModel;
import com.ravi.user.model.UserRegisterModel;
import com.ravi.user.service.PasswordHash;
import com.ravi.user.service.UserRegisterService;

@Controller
public class UserController {
	
	@Autowired UserRegisterService userService;
	
	@RequestMapping("/login")
	public String loginPage(Map<String, Object> map) {
		LoginModel loginModel = new LoginModel();
		map.put("loginmodel", loginModel);
		return "user/login";
	}
	
	@RequestMapping(value="/dashboard.do", method=RequestMethod.POST)
	public String validateUser(@ModelAttribute("loginmodel") UserRegisterModel loginmodel, BindingResult result, @RequestParam String password) {
		
		UserRegisterModel logincredentials = userService.getLoginCredentials(loginmodel.getUserName());
		String salt = logincredentials.getSalt();
		String correctHash = logincredentials.getHashedPassword();
		Boolean validUser = false;
		try {
			validUser = PasswordHash.validatePassword(password, correctHash, salt);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		
		if(validUser) {
			return "user/loginSuccess";
		}
		return "user/loginFails";
	}
	
	@RequestMapping("/userRegistrationPage")
	public String registrationPage(Map<String, Object> map) {
		UserRegisterModel userRegister = new UserRegisterModel();
		map.put("userRegisterModel", userRegister);
		return "user/userRegister";
	}
	
	@RequestMapping("/registerUser")
	public String submitUserDetails(@ModelAttribute("userRegisterModel") UserRegisterModel registerUser, BindingResult result, @RequestParam Map<String, String> params, Map<String, Object> map) {
		
		String password = params.get("password");
		try {
			String []saltHash = PasswordHash.createHash(password).split(":");
			String salt = saltHash[0];
			String hashCode = saltHash[1];
			registerUser.setSalt(salt);
			registerUser.setHashedPassword(hashCode);
			
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		userService.addUser(registerUser);
		LoginModel loginModel = new LoginModel();
		map.put("loginmodel", loginModel);
		return "/user/login";
	}
}
