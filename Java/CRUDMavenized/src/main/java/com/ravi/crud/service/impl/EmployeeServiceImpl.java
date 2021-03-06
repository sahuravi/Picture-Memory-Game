package com.ravi.crud.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ravi.crud.dao.EmployeeDao;
import com.ravi.crud.model.Employee;
import com.ravi.crud.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@Transactional
	public void add(Employee emp) {
		employeeDao.add(emp);
	}

	@Transactional
	public void edit(Employee emp) {
		employeeDao.edit(emp);
	}

	@Transactional
	public void delete(int empId) {
		employeeDao.delete(empId);
	}

	@Transactional
	public Employee getEmployee(int empId) {
		return employeeDao.getEmployee(empId);
	}

	
	@Transactional
	public List<Employee> getAllEmployee() {
		return employeeDao.getAllEmployee();
	}

}
