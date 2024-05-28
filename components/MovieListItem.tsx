import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface Movie {
    id: number
  title: string;
  poster_path: string;
  vote_average: number;
}

const RatingCard = ({ rating }: { rating: number }) => {
  return (
    <View style={{zIndex: 1, position: 'absolute', top: 10, left: 10, backgroundColor: 'purple', padding: 5, borderRadius: 5 }}>
      <Text style={{ color: 'white' }}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const MovieListItem = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/${movie.id}`} asChild>
        <Pressable style={{ flex: 1 }}>
            <RatingCard rating={movie.vote_average} />
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={{ width: '100%', aspectRatio: 3 / 5, borderRadius: 10 }}
            />
        </Pressable>
    </Link>
    
  );
};

export default MovieListItem;