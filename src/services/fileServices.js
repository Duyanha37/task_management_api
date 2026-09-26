const supabase = require('../config/supabase');
const crypto = require('crypto');

const uploadcreateTaskFile = async (files) => {
    const documentFiles = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    try {
        for (const file of files) {
            const { originalname, buffer } = file;
            let datapath;
            if (file.mimetype.startsWith('image/')) {
                datapath = `images/${crypto.randomUUID}-${originalname}`
            } else if (file.mimetype.startsWith('video/')) {
                datapath = `videos/${crypto.randomUUID}-${originalname}`
            } else if (documentFiles.includes(file.mimetype)) {
                datapath = `documents/${crypto.randomUUID}-${originalname}`
            }
            const { data, error } = await supabase.storage.from('task-files').upload(datapath, buffer);
            if (error) throw new Error('Error uploading file');
        }
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

const uploadupdateTaskImages = async (files) => {
    try {
        for (const file of files) {
            const { originalname, buffer } = file;
            const datapath = `images/${crypto.randomUUID()}-${originalname}`;
            const { data, error } = await supabase.storage.from('task-files').upload(datapath, buffer);
            if (error) throw new Error('Error uploading file');
        }
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

const uploadupdateTaskVideos = async (files) => {
    try {
        for (const file of files) {
            const { originalname, buffer } = file;
            const datapath = `videos/${crypto.randomUUID()}-${originalname}`;
            const { data, error } = await supabase.storage.from('task-files').upload(datapath, buffer);
            if (error) throw new Error('Error uploading file');
        }
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

const uploadupdateTaskDocuments = async (files) => {
    const documentFiles = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    try {
        for (const file of files) {
            const { originalname, buffer } = file;
            if (!documentFiles.includes(file.mimetype)) {
                throw new Error('Invalid file type');
            }
            const datapath = `documents/${crypto.randomUUID()}-${originalname}`;
            const { data, error } = await supabase.storage.from('task-files').upload(datapath, buffer);
            if (error) throw new Error('Error uploading file');
        }
    } catch (error) {
        throw new Error('Error uploading file');
    }
};

module.exports = { uploadcreateTaskFile, uploadupdateTaskImages, uploadupdateTaskVideos, uploadupdateTaskDocuments };