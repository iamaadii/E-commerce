import multer from "multer";

//diskStorage is a storage engine provided by the Multer , allows you to save uploaded files directly to the server's disk.
//memoryStorage, which keeps files in the server's RAM as Buffer objects.Files saved with diskStorage persist on the server until they are manually deleted.
const storage = multer.diskStorage({ 
    //cb stands for callback & null represents no error
    filename: function (req, file, cb) { 
      cb(null, file.originalname)
    }
  })
  
//creates a Multer middleware instance configured with the previously defined diskStorage settings.
export const upload = multer({storage})