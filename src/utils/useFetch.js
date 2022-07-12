import { useState, useEffect } from 'react'
import paginate from './utils'
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(`https://api.github.com/users/${url}/followers?per_page=80`)
    const jsonData = await response.json()
    setData(paginate(jsonData))
    setLoading(false)
  }

  useEffect(() => {
    getProducts();
  }, [url])
  return { loading, data }
}
