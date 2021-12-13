const employeeModel=require('../model/employee-model');

exports.postEmployee=async(req,res)=>{
    try{
        const regemp=await employeeModel.create(
            {
                EmployeeId: "EMPID-"+((await employeeModel.countDocuments({})+1)+'').padStart(4,'0'),
                EmployeeName:req.body.EmployeeName,
                EmployeeEmail:req.body.EmployeeEmail,
                PhoneNumber:req.body.PhoneNumber,
                Designation:req.body.Designation,
                Status:req.body.Status
            }
        );
        res.status(201).json({
            message:`${regemp.EmployeeName}'s record created successfully with EMPID:${regemp.EmployeeId}`
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        });
    }
}

exports.getEmployees=async(req,res)=>{
    try{
        const emp=await employeeModel.find({},{_id:0,EmployeeId:1,EmployeeName:1,EmployeeEmail:1,PhoneNumber:1,Designation:1,Status:1});
        console.log(emp);
        if(emp.length>0){
            res.json({
                emp
            });
        }else{
            res.json({
                success:true,
                data:"No records"
            })
        }
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}
exports.updateEmployee = async (req,res) => {
    try{
        const data=await employeeModel.findOneAndUpdate(
            {EmployeeId:req.params.EmployeeId},
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        res.status(200).json({
            success:true
        });
    }catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        });
    }
}