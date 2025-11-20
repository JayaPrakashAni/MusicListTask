const fs = require("fs");
const path = require("path");
const songs = require("../data/songs.json");

exports.getSongs = (req, res) => {
  res.json(songs);
};

exports.getSongById = (req, res) => {
  const song = songs.find(s => s.id == req.params.id);
  if (!song) return res.status(404).json({ message: "Song not found" });
  res.json(song);
};

exports.downloadSong = (req, res) => {
  const song = songs.find(s => s.id == req.params.id);

  if (!song) return res.status(404).json({ message: "Song not found" });

  const filePath = path.join(__dirname, "..", "downloads", "mp3", song.file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File missing on server" });
  }

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${song.title}.mp3"`
  );

  res.download(filePath);
};

exports.getThumbnail = (req, res) => {
  const imagePath = path.join(
    __dirname,
    "..",
    "downloads",
    "thumbnails",
    req.params.img
  );

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: "Thumbnail not found" });
  }

  res.sendFile(imagePath);
};
