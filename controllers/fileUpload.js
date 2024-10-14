const File = require("../models/File");
const cloudinary = require("cloudinary").v2
//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        ///absolute/path/to/current/directory/files/1633023600000.png
        console.log("PATH-> ", path)


        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        
        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("OK")
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Format Not Supported!!!'
            })
        }

        console.log("Uploading to ShivamFile");
        const response = await uploadFileToCloudinary(file,"ShivamFile");
        console.log(response);
        //db me entry save karna hai!!

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded!!!"
    })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong!!",
        });
    }
}

