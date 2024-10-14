const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
 
async function uploadFileToCloudinary(file,folder){
    const options = {folder,
        resource_type:'auto'
    };
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.videoUpload = async (req,res) => {
     // Add this line at the beginning of the try block
    try{
        const { name, tags, email } = req.body;
        const file = req.files.videoFile; 
        console.log(file)
        //validation
        const supportedTypes = ["mp4", "avi", "mov", "mkv", "wmv", "flv", "webm", "m4v", "3gp", "dv"];        
        const fileType = file.name.split('.').pop().toLowerCase(); // Ensure this is lowercase
        console.log("OK");
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:`.${file.name.split('.')[1]} This File Format is Not Supported!!!`
            })
        }

        console.log("Uploading to ShivamFile...");
        const response = await uploadFileToCloudinary(file,"ShivamFile");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            VideoUrl:response.secure_url,
        });

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:"Video is Uploaded SuccessFully!!!"
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong!!",
        });
    }
}