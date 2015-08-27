package com.ravi.user.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ravi.user.dao.UserRegisterDao;
import com.ravi.user.model.UserRegisterModel;

@Repository
public class UserRegisterDaoImpl implements UserRegisterDao {
	
	@Autowired
	private SessionFactory session;

	@Override
	public void addUser(UserRegisterModel userModel) {
		session.getCurrentSession().save(userModel);

	}

	@Override
	public UserRegisterModel getLoginCredentials(String userName) {
		return (UserRegisterModel) session.getCurrentSession().createQuery("from UserRegisterModel WHERE email='" + userName +"'").list().get(0);
	}

}
