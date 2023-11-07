import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const compareSimpleObjects = (obj1: object, obj2: object) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState({
    str: searchParams.get('search'),
    page: +(searchParams.get('page') ?? 1),
  });
  const [cardId, setCardId] = useState<string | null>(
    searchParams.get('cardId')
  );

  useEffect(() => {
    const newSearchQuery = {
      str: searchParams.get('search'),
      page: +(searchParams.get('page') ?? 1),
    };

    if (!compareSimpleObjects(searchQuery, newSearchQuery)) {
      console.log("Set search query:", searchQuery, newSearchQuery)
      setSearchQuery(newSearchQuery);
    }

    setCardId(searchParams.get('cardId'));
  }, [searchParams, setSearchParams]);

  return { searchQuery, cardId };
};
