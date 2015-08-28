package com.ravi.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ravi.user.dao.UserRegisterDao;
import com.ravi.user.model.UserRegisterModel;
import com.ravi.user.service.UserRegisterService;

@Service
public class UserRegisterServiceImpl implements UserRegisterService {
	
	@Autowired
	private UserRegisterDao userDao;

	@Transactional
	public void addUser(UserRegisterModel userModel) {
		userDao.addUser(userModel);
	}

	@Transactional
	public UserRegisterModel getLoginCredentials(String userName) {
		return userDao.getLoginCredentials(userName);
	}

}
