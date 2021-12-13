const credentialModel=require('../model/credentials-model');
const employeeModel=require('../model/employee-model');
const bcrypt=require('bcrypt');

exports.postCredentials=async(req,res)=>{
    try{
        empid=req.body.EmployeeId,
        email=req.body.EmployeeEmail,
        pwd=req.body.Password
        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(pwd, salt, (err, hash) => {
        //       if (err) throw err
        //       this.pwd = hash
        //     })
        //   })
        if(await employeeModel.countDocuments({EmployeeId:empid,EmployeeEmail:email})){
            const creds=await credentialModel.create({
                EmployeeId:empid,
                EmployeeEmail:email,
                Password:pwd
            });
            res.json({
                status:'success',
                message:'true'
            })
        }else if(!(await employeeModel.countDocuments({EmployeeId:empid}))){
            res.json({
                message:`EmployeeId with Id:${empid} does not exist`
            })
        }else if(!(await employeeModel.countDocuments({EmployeeEmail:email}))){
            res.status(400).json({
                message:`EmployeeEmail with emailId:${email} does not exist`
            })
        }else{
            res.json({
                message:`EmployeeId with Id:${empid} and EmployeeEmail with emailId:${email} does not exist`
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}

exports.authenticateEmp=async(req,res)=>{
    try{
        email=req.body.EmployeeEmail,
        pwd=req.body.Password;
        //const emp=await credentialModel.find({EmployeeEmail:email},{});
        // if(emp.length>0){
        //     const validPassword = await bcrypt.compare(pwd, emp.Password);
        //     if(validPassword){
        //         res.json({
        //             success:true,
        //             EmployeeId:emp.EmployeeId
        //         })
        //     }else{
        //         res.json({
        //             success:false,
        //             message:'Wrong password'
        //         })
        //     }
        // }
        const emp=await credentialModel.findOne({EmployeeEmail:email},{});
        console.log(emp);
        if(emp!=null){
            if(pwd===emp.Password){
                res.json({
                    success:true,
                    EmployeeId:emp.EmployeeId
                })
            }else{
                res.json({
                    success:false,
                    message:'Wrong password'
                })
            }
        }else if(emp==null){
            res.json({
                success:false,
                message:'Wrong email'
            })
        }
    }catch(err){
       throw err;
    }
}

// exports.updateEmployee = async (req,res) => {
//     try{
//         const data=await employeeModel.updateOne(
//             {EmployeeId:req.params.EmployeeId},
//             {$set:{"EmployeeEmail":req.body.EmployeeEmail}}
//         );
//         res.status(200).json({
//             success:true
//         });
//     }catch(err){
//         res.status(404).json({
//             success:false,
//             message:err.message
//         });
//     }
// }