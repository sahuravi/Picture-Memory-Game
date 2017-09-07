package com.ravi.crud.dao;

import com.ravi.user.model.UserRegisterModel;

public interface UserRegisterDao {
	public void addUser(UserRegisterModel userModel);
	public UserRegisterModel getLoginCredentials(String userName);
}
