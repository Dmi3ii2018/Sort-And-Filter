import { useState, useEffect } from 'react'
import axios from 'axios';

const URL = "http://zar.hosthot.ru/api/v1/pokemons/?limit=10&offset=10.";

export const usePokemonApi = () => {
    const [data, setData] = useState({ pokemons: [] });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
   
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
   
        try {
          const result = await axios(URL);
   
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
   
        setIsLoading(false);
      };
   
      fetchData();
    }, []);
   
    return [data, isLoading, isError];
  }
  