import {FlatList } from 'react-native'
import React from 'react'
import CoinItem from '../../components/CoinItem'
import cryptocurrencies from '../../../assets/data/cryptocurrencies.json'
const HomeScreen = () => {
  return (
     <FlatList
        data={cryptocurrencies}
        renderItem={({ item }) => {
          return <CoinItem marketCoin={item} />;
        }}
      />
  )
}

export default HomeScreen