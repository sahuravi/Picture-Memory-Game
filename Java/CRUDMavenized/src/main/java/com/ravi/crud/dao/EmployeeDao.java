package com.ravi.crud.dao;

import java.util.List;

import com.ravi.crud.model.Employee;

public interface EmployeeDao {
	
	public void add(Employee emp);
	public void edit(Employee emp);
	public void delete(int empId);
	public Employee getEmployee(int empId);
	public List getAllEmployee();

}
