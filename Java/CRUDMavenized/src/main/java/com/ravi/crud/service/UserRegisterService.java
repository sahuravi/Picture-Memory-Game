package com.ravi.crud.service;

import com.ravi.user.model.UserRegisterModel;

public interface UserRegisterService {
	
	public void addUser(UserRegisterModel userModel);
	public UserRegisterModel getLoginCredentials(String userName);

}
