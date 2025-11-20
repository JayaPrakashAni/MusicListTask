import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import axios from "axios";

export default function SongListScreen({ navigation }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const response = await axios.get("http://192.168.1.4:3000/api/songs");

      // ADD FULL URL FOR THUMBNAIL HERE ✔️
      const updated = response.data.map((s) => ({
        ...s,
        thumbnailFull: `http://192.168.1.4:3000/api/songs/thumbnail/${s.thumbnail}`
      }));

      setSongs(updated);
    } catch (error) {
      console.log(error);
      alert("Error loading songs");
    }
  };

  const downloadSong = (item) => {
    const url = `http://192.168.1.4:3000/api/songs/download/${item.id}`;
    const fileName = `${item.title}.mp3`;

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

  const renderSong = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("SongDetail", {
          song: {
            ...item,
            fileFull: `http://192.168.1.4:3000/api/songs/download/${item.id}`
          }
        })
      }
    >
      <Image source={{ uri: item.thumbnailFull }} style={styles.thumbnail} />

      <Text style={styles.title}>{item.title}</Text>

      <TouchableOpacity onPress={() => downloadSong(item)}>
        <Text style={styles.download}>⬇️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10
  },
  thumbnail: {
    width: 55,
    height: 55,
    borderRadius: 8
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    marginLeft: 15
  },
  download: {
    fontSize: 24,
    color: "#1db954"
  }
});
