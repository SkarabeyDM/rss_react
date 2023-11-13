import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const compareSimpleObjects = (obj1: object, obj2: object) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState({
    search: searchParams.get('search'),
    page: +(searchParams.get('page') ?? 1),
  });

  useEffect(() => {
    const newSearchQuery = {
      search: searchParams.get('search'),
      page: +(searchParams.get('page') ?? 1),
    };

    if (!compareSimpleObjects(searchQuery, newSearchQuery)) {
      setSearchQuery(newSearchQuery);
    }
  }, [searchParams, setSearchParams]);

  return { searchQuery, setSearchQuery };
};

export const useCardId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardId, setId] = useState(searchParams.get('cardId'));

  useEffect(() => {
    setId(searchParams.get('cardId'));
  }, [searchParams, setSearchParams]);

  const setCardId = (id: string | null) => {
    if (id === null) {
      searchParams.delete('cardId');
    } else {
      searchParams.set('cardId', id);
    }
    setSearchParams(searchParams)
  };

  return { cardId, setCardId };
};
