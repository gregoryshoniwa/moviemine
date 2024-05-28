import { StyleSheet,Text,FlatList, ActivityIndicator } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import {fetchTopRatedMovies} from '@/api/movies';

interface Movie {
  title: string;
  // Add other properties of the movie object here
}
export default function TabOneScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getMovies();
  },[])

  const getMovies = async () => {
    setIsLoading(true);
    try{
      const movies = await fetchTopRatedMovies();
      setMovies(movies);
      setIsLoading(false);
    }catch(e: any){
      setError(e);
      setIsLoading(false);
    }
   
    
  }

  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.container}>
        <FlatList 
          data={movies}
          renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            </View>
            )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
