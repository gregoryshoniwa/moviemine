import { StyleSheet,Text,FlatList, ActivityIndicator } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import {fetchTopRatedMovies} from '@/api/movies';
import { useInfiniteQuery } from '@tanstack/react-query';
import MovieListItem from '@/components/MovieListItem';

// interface Movie {
//   title: string;
//   // Add other properties of the movie object here
// }
export default function TabOneScreen() {
  const { data: movies, isLoading, error, fetchNextPage} = useInfiniteQuery({
    queryKey : ['movies'],
    queryFn : ({ pageParam }) => fetchTopRatedMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length + 1 : undefined
  });

  //console.log(query);

  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   getMovies();
  // },[])

  // const getMovies = async () => {
  //   setIsLoading(true);
  //   try{
  //     const movies = await fetchTopRatedMovies();
  //     setMovies(movies);
  //     setIsLoading(false);
  //   }catch(e: any){
  //     setError(e);
  //     setIsLoading(false);
  //   }
  // }

  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.container}>
        <FlatList 
          data={movies?.pages?.flat() || []}
          numColumns={2}
          contentContainerStyle={{gap : 5, padding: 5}}
          columnWrapperStyle={{gap: 5}}
          renderItem={({item}) => <MovieListItem movie={item}/>}
          onEndReached={() => {
              fetchNextPage();
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});


