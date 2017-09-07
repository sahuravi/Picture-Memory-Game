package com.ravi.crud.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ravi.crud.dao.EmployeeDao;
import com.ravi.crud.model.Employee;

@Repository
public class EmployeeDaoImpl implements EmployeeDao {
	@Autowired
	private SessionFactory session;
		
	@Override
	public void add(Employee emp) {
		session.getCurrentSession().save(emp);
	}

	@Override
	public void edit(Employee emp) {
		session.getCurrentSession().update(emp);
	}

	@Override
	public void delete(int empId) {
		session.getCurrentSession().delete(getEmployee(empId));
	}

	@Override
	public Employee getEmployee(int empId) {
		return (Employee)session.getCurrentSession().get(Employee.class, empId);
	}

	
	@Override
	public List<Employee> getAllEmployee() {
		return session.getCurrentSession().createQuery("from Employee").list();
	}

}
