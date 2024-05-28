import React from 'react'
import { View,Text } from './Themed';
import { Image } from 'react-native';

interface Movie {
    title: string;
    poster_path: string
  }
const MovieListItem = ({ movie } : {movie : Movie}) => {
  return (
    <View style={{padding : 10, flex: 1}}>
        <Image source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path 

        }} 
        style={{width : '100%', aspectRatio : 1}}/>
        <Text>
            {movie.title}
        </Text>
    </View>
  )
}

export default MovieListItem