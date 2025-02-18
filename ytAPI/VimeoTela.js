import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { buscarVideosVimeo } from './vimeo';

export default function VimeoTela() {
  const [pesquisa, setPesquisa] = useState('');
  const [videos, setVideos] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideosVimeo(pesquisa);
      setVideos(resultados);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (erro) {
      console.error('Ocorreu um erro ao pesquisar vídeos:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={require('./assets/vimeo_logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={pesquisa}
          onChangeText={setPesquisa}
          onSubmitEditing={pesquisar}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={pesquisar}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {videos.map((video) => (
          <Animated.View key={video.uri} style={[styles.videoContainer, { opacity: fadeAnim }]}>
            <Text style={styles.videoTitle}>{video.name}</Text>
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ html: `<iframe width="100%" height="100%" src="https://player.vimeo.com/video/${video.uri.split('/').pop()}" frameborder="0" allowfullscreen></iframe>` }}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#1ab7ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  videoContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 5,
  },
});
