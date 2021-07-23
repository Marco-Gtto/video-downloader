const youtubedl = require('youtube-dl-exec')
var pathFfmpeg = require('ffmpeg-static');
const { remote } = require('electron')
const { path } = require('path')

const downloadMp4 = async(dir, formData) => {
    let options = {
        output: `${dir.filePaths[0]}\\%(title)s.%(ext)s`
    }

    await youtubedl(formData.video_url, options)
    return true
}

const downloadMp3 = async(dir, formData) => {
    const ffmpegPath = pathFfmpeg.replace('app.asar', 'app.asar.unpacked')

    let options = {
        output: `${dir.filePaths[0]}\\%(title)s.%(ext)s`,
        extractAudio: true,
        audioFormat: 'mp3',
        ffmpegLocation: `${ffmpegPath}`
    }
    await youtubedl(formData.video_url, options)
    return true
}



module.exports = {downloadMp4, downloadMp3}