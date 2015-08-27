<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="<c:url value="/resources/css/login.css" />" rel="stylesheet" type="text/css"/>
<title>Login</title>
</head>
<body>
	<div class="container">
		<section id="content"> 
			<form:form action="dashboard.do" method="POST" modelAttribute="loginmodel">
				<h1>Login Form</h1>
				<div>
					<!-- <input type="text" placeholder="Username" required="" id="username" /> -->
					<form:input path="userName" id="username" />
				</div>
				<div>
					<!-- <input type="password" placeholder="Password" required="" id="password" /> -->
					<input type="password" name="password" id="password" />
				</div>
				<div>
					<input type="submit" value="Log in" /> <a href="#">Lost your password?</a> <a href="userRegistrationPage">Register</a>
				</div>
			</form:form>
			<!-- <div class="button">
				<a href="#">Download source file</a>
			</div> -->
		</section>
	</div>
</body>
</html>