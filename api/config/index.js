const Cloud = require('@google-cloud/storage')
const path = require('path')

const serviceKey = path.join(__dirname, './credentials/storage-credentials.json')

const { Storage } = Cloud

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'teacher-student-forum',
})

module.exports = storage