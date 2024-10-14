const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
//new model

//post middleware

fileSchema.post("save",async function(doc){
    try{
        //shift this configuratuion under config folder
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
    });
    
    let info = await transporter.sendMail({
        from:`ShivamChase`,
        to:doc.email,
        subject:"New File Uploaded on CLoudinary!!",
        html:`<h2> Hello Jee</h2> <p> File Uploaded</p>`
    })

    console.log("INFO",info);
    }catch(error){
        console.log(error);
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;