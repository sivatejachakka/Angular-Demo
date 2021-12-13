const express=require('express');
const routing=express.Router();
const employeeService=require('../controller/employee-service');
const credentialService=require('../controller/credentials-service');
//const projectService=require('../controller/project-service');

routing.post('/employees',employeeService.postEmployee);
routing.get('/employees',employeeService.getEmployees);
routing.put('/employees/:EmployeeId',employeeService.updateEmployee);
//routing.get('/employees/:EmployeeId',employeeService.getEmployee);

routing.post('/register',credentialService.postCredentials);
routing.post('/authenticate',credentialService.authenticateEmp);

routing.all('**',(req,res)=>{
    res.status(404).json({
        success:false,
        message:'Invalid path'
    });
});

module.exports=routing;