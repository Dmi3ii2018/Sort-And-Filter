import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://zar.hosthot.ru/api/v1/pokemons/?limit=10&offset=10.";

const usePokemonApi = () => {
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
};

export const useData = () => {
  const [data, isLoading, isError] = usePokemonApi();
  console.log("data", data)
  const [updatedData, setUpdatedData] = useState();

  useEffect(() => {
    let result = {
      total: 0,
      items: []
    };
    if (data && data.pokemons.length) {
      data.pokemons.forEach((cur) => {
        const item = {};
        item.id = cur.id
        item.img = cur.img
        item.name = cur.name;
        item.attack = cur.stats.attack;
        item.defense = cur.stats.defense;
        item.hp = cur.stats.hp;
        item.speed = cur.stats.speed;
        result.items.push(item);
      }, []);
      result.total = data.total
    }
    setUpdatedData(result);
  }, [data, setUpdatedData, isLoading, isError]);
  return [updatedData, isLoading, isError];
};
