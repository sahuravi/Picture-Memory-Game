package com.ravi.user.dao;

import java.util.List;

import com.ravi.user.model.UserRegisterModel;

public interface UserRegisterDao {
	public void addUser(UserRegisterModel userModel);
	public UserRegisterModel getLoginCredentials(String userName);
}
