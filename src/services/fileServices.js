const supabase = require('../config/supabase');
const crypto = require('crypto');

const uploadcreateTaskFile = async (files) => {
    const documentFiles = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    try {
        for (const file of files) {
            const { originalname, buffer } = file;
            if (file.mimetype.startsWith('image/')) {
                const { data, error } = await supabase.storage
                    .from('tasks')
                    .upload(`images/${crypto.randomUUID()}-${originalname}`, buffer);
                if (error)
                    throw new Error('Error uploading file');
            } else if (file.mimetype.startsWith('video/')) {
                const { data, error } = await supabase.storage
                    .from('tasks')
                    .upload(`videos/${crypto.randomUUID()}-${originalname}`, buffer);
                if (error)
                    throw new Error('Error uploading file');
            } else if (documentFiles.includes(file.mimetype)) {
                const { data, error } = await supabase.storage
                    .from('tasks')
                    .upload(`documents/${crypto.randomUUID()}-${originalname}`, buffer);
                if (error)
                    throw new Error('Error uploading file');
            }
        }
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

module.exports = { uploadcreateTaskFile };