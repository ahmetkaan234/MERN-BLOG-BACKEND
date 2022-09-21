const Article = require('../models/articleModal');



exports.getArticle =async (req,res)=>{
    try {
            const article = await Article.find();
           
           
            return res.status(200).json({article})
               

    } catch (error) {
        console.log(error.message);
        return res.json({message:error.message})
    }
}



exports.postArticle = async(req,res)=>{
    try {
        const {title,description} = req.body.data;
        
        const createArticle = await Article.create({
            title,
            description
        })

        return res.status(201).json(createArticle);

    } catch (error) {
        console.log(error.message);
        return res.json({message:error.message})
    }
}


exports.articlePage = async(req,res) =>{
    try {
        const article = await Article.findOne( {slug: req.params.slug})  
        res.status(200).json(article)
            

    } catch (error) {
        console.log(error.message);
        return res.json({message:error.message})
    }

}

exports.deleteArticle = async(req,res)=>{
        try {
            const deleted =await Article.findById({_id:req.params.id})
                
            await Article.deleteOne(deleted);
            return res.status(204).json("deleted correct")

        } catch (error) {
            console.log(error.message);
            return res.json({message:error.message})
        }

}

exports.editArticle =async(req,res)=>{
        try {
                const {title,description,id} = req.body;
                console.log(req.body);
                const editData =await Article.findById({_id:req.body.id})
                console.log(editData);
                editData.title = title;
                editData.description = description;
                editData.save();
                return res.status(201).json("updated")

        } catch (error) {
            console.log(error.message);
            return res.json({message:error.message})
        }

}
