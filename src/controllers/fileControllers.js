import { uploadTaskFile } from '../services/tasksServices.js';

const uploadFile = async (req, res) => {
    try {
        if (req.files) {
            const files = req.files;
            try {
                await uploadTaskFile(files);
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading file', error });
            }
        }

        if (error) {
            return res.status(500).json({ message: 'Error uploading file', error });
        }

        res.status(200).json({ message: 'File uploaded successfully', data });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { uploadFile };