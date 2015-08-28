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
	<form:form action="employee.do" method="POST" commandName="employee">
		<table>
			<tr>
				<td>Employee Id</td>
				<td colspan='3'><form:input path="employeeId"/></td>
			</tr>
			<tr>
				<td>First Name</td>
				<td colspan='3'><form:input path="firstName"/></td>
			</tr>
			<tr>
				<td>Last Name</td>
				<td colspan='3'><form:input path="lastName"/></td>
			</tr>
			<tr>
				<td>Company</td>
				<td colspan='3'><form:input path="company"/></td>
			</tr>
			<tr><td></td></tr>
			<tr>
				<td>
					<input type="submit" name="action" value="Add" />
				</td>
				<td>
					<input type="submit" name="action" value="Edit" />
				</td>
				<td>
					<input type="submit" name="action" value="Delete" />
				</td>
				<td>
					<input type="submit" name="action" value="Search" />
				</td>
			</tr>
		</table>
	</form:form>
	<br />
	<br />
	<table border="1">
		<thead>
			<th>ID</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Company</th>
		</thead>
		<tbody>
			<c:forEach items="${employeeList}" var="employee">
				<tr>
					<td>${employee.employeeId}</td>
					<td>${employee.firstName}</td>
					<td>${employee.lastName}</td>
					<td>${employee.company}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>