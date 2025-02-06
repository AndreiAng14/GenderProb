import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { name } from "ejs";

const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    try {
        res.render("index.ejs")
    } catch (error) {
        console.log(error.message)
    }

});

app.post("/",async(req,res)=>{
    try {
        const result= await axios.get("https://api.genderize.io",{
            params:{
                name:req.body,
            }
        });
       var gender;
       var name;
       var probability;
         result.data.forEach(element => {
             gender=element.gender;     
         });
         result.data.forEach(element => {
            name=element.name[0].toUpperCase()+element.name.slice(1);
         });
         result.data.forEach(element => {
            probability=element.probability;
         });
        res.render("index.ejs",{name:name, photo:chosePhoto(gender),gender:gender, probability:probability });
    } catch (error) {
        console.log(error.message);
        
    };
});


function chosePhoto(input){
    
    const men=['pexels-freestockpro-1172207.jpg','pexels-jeswin-1549004.jpg','pexels-lukas-rychvalsky-670720.jpg','pexels-rfera-432059.jpg','pexels-tome-louro-273270-1666779.jpg'];
    const women=['pexels-athena-1758144.jpg','pexels-godisable-jacob-226636-794062.jpg','pexels-jill-wellington-1638660-40192.jpg','pexels-luizclas-170497-595747.jpg','pexels-yuliya-kosolapova-1535772-3270230.jpg'];
   if (input==="male") {
    return "men/"+ men[Math.floor(Math.random() * men.length )];
    
   } else if(input==="female") {
    
   return "women/"+ women[Math.floor(Math.random() * women.length )];
   
   }
  
    

}


app.listen(port,()=>{
    console.log(`Server running on port ${port}` )
})