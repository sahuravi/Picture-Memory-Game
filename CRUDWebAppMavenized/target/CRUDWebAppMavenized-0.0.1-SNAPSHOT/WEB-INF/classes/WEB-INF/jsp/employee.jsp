<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Employee Management</title>
</head>
<body>
	<h1>Employee Data</h1>
	<form:form action="employee.do" method="POST">
		<table>
			<tr>
				<td>Employee Id</td>
				<td><form:input path="employeeId"/></td>
			</tr>
			<tr>
				<td>First name</td>
				<td><form:input path="firstName"/></td>
			</tr>
			<tr>
				<td>Last Name</td>
				<td><form:input path="lastLame"/></td>
			</tr>
			<tr>
				<td>Year</td>
				<td><form:input path="company"/></td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="submit" name="action" value="Add" />
					<input type="submit" name="action" value="Edit" />
					<input type="submit" name="action" value="Delete" />
					<input type="submit" name="action" value="Search" />
				</td>
			</tr>
		</table>
	</form:form>
	
	<table border="1">
		<thead>
			<th>ID</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Company</th>
		</thead>
		<tbody>
			<c:forEach items="${employeeList}" var="employee">
				<tr>${employee.employeeId}</tr>
				<tr>${employee.fistName}</tr>
				<tr>${employee.lastName}</tr>
				<tr>${employee.company}</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>