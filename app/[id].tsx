import { View, Text, ActivityIndicator,Image, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMoive } from '@/api/movies';
import { FontAwesome } from '@expo/vector-icons';
import { addMovieToWatchList } from '@/api/watchlist';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const client = useQueryClient();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMoive(id),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: () => addMovieToWatchList(movie?.id),
    onSuccess: () => {
        client.invalidateQueries({ queryKey: ['watchlist'] });
      alert('Movie added to watchlist');
    }
    })


  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>{error.message}</Text>
  }
  return (
    <View>
        <Stack.Screen options={{ title: movie?.title }} />
         <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
                style={{ width: '100%',height: 300 }}
            />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold',marginVertical: 10}}>{movie.title}</Text>
        <View style={{marginVertical : 10}}>
            {isPending
            ? <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}><FontAwesome name='bookmark' size={24} /><Text>Adding ....</Text></View>
            : <Pressable 
                onPress={() => mutate()} style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <FontAwesome name='bookmark' size={24} />
                <Text>Add to watchlist</Text>
            </Pressable>
            }
            
        </View>
        <Text style={{fontSize: 16}}>{movie.overview}</Text>
      </View>
    </View>
  )
}

export default MovieDetails