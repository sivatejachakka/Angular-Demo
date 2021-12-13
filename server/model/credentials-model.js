const mongoose=require('mongoose');

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

const credentialSchema=mongoose.Schema(
    {
        EmployeeId:{
            type:String,
            unique:true
        },
        EmployeeEmail:{
            type:String,
            required:true,                                                                                                                                                                                                                  
            unique:[true,'This email Already Exists, Please choose another'],
            validate:[validateEmail,'Email should be a valid one']
        },
        Password:{
            type:String,
            required:true
        }
    }
);

const credentialModel=mongoose.model('credentials',credentialSchema);
module.exports=credentialModel;