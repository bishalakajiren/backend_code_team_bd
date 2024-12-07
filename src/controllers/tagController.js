const TagModel = require('../models/tagModel');

const TagController = {
  getAlltags: async (req, res) => {
    try {
      const tags = await TagModel.getAllTags();
      res.json({ status: true, message: 'Tags fetched successfully', data: tags });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch tags', error: error.message });
    }
  },

  gettagById: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await TagModel.getTagById(id);

      if (!tag) {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }

      res.json({ status: true, message: 'Tag fetched successfully', data: tag });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to fetch tag', error: error.message });
    }
  },

  createtag: async (req, res) => {
    try {
      const { tagName } = req.body;

      if (!tagName) {
        return res.status(400).json({ status: false, message: 'Tag name is required' });
      }

      const tagExists = await TagModel.getTagByName(tagName);
      if (tagExists) {
        return res.status(409).json({ status: false, message: 'Tag name already exists' });
      }

      await TagModel.createTag(tagName);

      res.status(201).json({
        status: true,
        message: 'Tag created successfully',
        data: { tagName },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to create tag', error: error.message });
    }
  },

  updatetag: async (req, res) => {
    try {
      const { id } = req.params;
      const { tagName } = req.body;

    
      const tagExists = await TagModel.getTagById(id);
      if (!tagExists) {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }

    
      const updatedFields = {};
      if (tagName) updatedFields.tagName = tagName || tagExists.tagName;

   
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ status: false, message: 'No valid fields to update' });
      }

     
      await TagModel.updateTag(id, updatedFields);

      res.json({
        status: true,
        message: 'Tag updated successfully',
        data: { id, ...updatedFields },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to update tag', error: error.message });
    }
  },

  deletetag: async (req, res) => {
    try {
      const { id } = req.params;

      
      const tagExists = await TagModel.getTagById(id);
      if (!tagExists) {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }

      
      await TagModel.deleteTag(id);

      res.status(200).json({ status: true, message: 'Tag deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Failed to delete tag', error: error.message });
    }
  },
};

module.exports = TagController;
