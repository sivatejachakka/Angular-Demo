const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/employeeDetails',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => console.log('DB connection successful!') );

const validateEmail=(email)=>{
    digit=false;
    len=false;
    let s=email;
    s=s.replace(/\D/g, '').length;
    if(s==1 || s==2){
        digit=true;
    }
    let l=email.length;
    if(l>=10 && l<=40){
        len=true;
    }
    let exp=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (exp.test(email) && digit && len);
};

const employeeSchema=mongoose.Schema(
    {
        EmployeeId:{
            type:String,
            unique:true
        },
        EmployeeName:{
            type:String,
            required:true
        },
        EmployeeEmail:{
            type:String,
            required:true,
            unique:[true,'This email Already Exists, Please choose another'],
            validate:[validateEmail,'Email should be a valid one']
        },
        PhoneNumber:{
            type:Number,
            required:true,
            unique:true,
            validate:{validator:(num)=>{return (num>1000000000 && num<9999999999)},message:'Phone Number should have 10 digits'}
        },
        Designation:{
            type:String,
            required:true,
        },
        Status:{
            type:String,
            required:true,
            enum:{
                values:['Active','Inactive'],
                message:'Status should be either Active or Inactive'
            }
        }
    },
    {
        timestamps:{
            createdAt: true,
            updatedAt: true
        }
    }
);

const employeeModel=mongoose.model('employee',employeeSchema);
module.exports=employeeModel;