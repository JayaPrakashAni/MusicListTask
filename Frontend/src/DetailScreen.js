import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeBlobUtil from "react-native-blob-util";

export default function SongDetailScreen({ route }) {
  const { song } = route.params;

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Sound.setCategory('Playback');

    const sound = new Sound(song.fileFull, null, (error) => {
      if (error) {
        console.log("Audio Load Error:", error);
      }
    });

    setPlayer(sound);

    return () => {
      if (sound) sound.release();
    };
  }, []);

  const playPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const downloadSong = () => {
    const url = song.fileFull;
    const fileName = `${song.title}.mp3`;

    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        title: fileName,
        mime: "audio/mpeg",
        notification: true,
        mediaScannable: true,
        path: ReactNativeBlobUtil.fs.dirs.MusicDir + "/" + fileName
      }
    })
      .fetch("GET", url)
      .then(() => {
        alert("Downloaded to Music folder!");
      })
      .catch((err) => {
        console.log(err);
        alert("Download failed!");
      });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: song.thumbnailFull }}
        style={styles.image}
      />

      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.singer}>{song.singer}</Text>

      {/* ⭐ Play + Download Row */}
      <View style={styles.row}>
        
        {/* Play Button */}
        <TouchableOpacity style={styles.btn} onPress={playPause}>
          <Icon 
            name={isPlaying ? "pause" : "play"}
            size={28}
            color="#000"
          />
          <Text style={styles.btnText}>{isPlaying ? "Pause" : "Play"}</Text>
        </TouchableOpacity>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadBtn} onPress={downloadSong}>
          <Icon name="download" size={26} color="#1db954" />
        </TouchableOpacity>

      </View>

      {/* ⭐ NEW DESCRIPTION SECTION */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Song Details</Text>

        <Text style={styles.infoText}>🎤 Singer: {song.singer}</Text>
        <Text style={styles.infoText}>🎵 Album: {song.album || "Unknown Album"}</Text>
        <Text style={styles.infoText}>📅 Released: {song.year || "2024"}</Text>

        <Text style={[styles.infoText, { marginTop: 10 }]}>
          📝 {song.description || "No description available. Enjoy the music!"}
        </Text>
      </View>

    </View>
  );
}


// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 40
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 15,
    marginBottom: 30
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700"
  },
  singer: {
    color: "#aaa",
    marginBottom: 20,
    marginTop: 5
  },

  // ⭐ Row for Play + Download
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },

  btn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    gap: 10
  },
  btnText: {
    fontSize: 18,
    color: "#000"
  },

  downloadBtn: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 50
  },

  // ⭐ Description Styles
  infoBox: {
    marginTop: 30,
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    width: "90%"
  },
  infoTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10
  },
  infoText: {
    color: "#ccc",
    fontSize: 15,
    marginTop: 4
  }
});
