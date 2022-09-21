const Article = require("../models/articleModal");

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.find();

    return res.status(200).json({ article });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.postArticle = async (req, res) => {
  try {
    const { title, description } = req.body.data;
    const sameTitle = await Article.findOne({ title: req.body.title });
    if (sameTitle) {
      return res.status(400).json({ message: "Title zaten girilmiş" });
    }

    const createArticle = await Article.create({
      title,
      description,
    });

    return res.status(201).json(createArticle);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

exports.articlePage = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findById({ _id: req.params.id });

    await Article.deleteOne(deleted);
    return res.status(204).json("deleted correct");
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const { title, description } = req.body;

    const editData = await Article.findById({ _id: req.body.id });
    
    if(title ===""  || description===''){
      return res.status(400).json({message:"Title veya description boş olamaz"})
    }
    
    
    editData.title = title;
    editData.description = description;
    editData.save();
    return res.status(201).json(editData);
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
};
