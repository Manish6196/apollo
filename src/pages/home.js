import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
{
  collections {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  }
}
`;

function Items({items}) {
  return items.map(({name, price, id}) => (
    <div key={id}>
         <span>{name} </span>
         <span>{price}</span>
    </div>
  ))
    }

function Collections({ history }) {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>; 
  return data.collections.map(({ title, items, id }) => (
    <div key={id}>
      <h2>{title}</h2>
      <Items items={items} />
    </div>
  ));
}

export default Collections
