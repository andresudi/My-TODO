const axios = require('axios')

const getAllPhoto = (req, res) => {
    axios.get('https://api.unsplash.com/users/andresudi/collections/?client_id=783735337668ef81f6b46e5e9f197be3f37c1e1a07a0fc5361307eb9a5d58238')
    .then(function(response) {
        console.log(response)
        res.status(201).json({
            message: `data collection`,
            data: response.data[0].preview_photos
        })
    })
    .catch(function(err) {
        res.status(400).json({
            message: err.message
        })
    })
}

module.exports = {
    getAllPhoto
}