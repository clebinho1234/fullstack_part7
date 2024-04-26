import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export  const useCountry = (name) => {
    const [data, setData] = useState(null)
    const [found, setFound] = useState(false)
  
    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(res => {
                const newData = {
                    name: name,
                    capital: res.data.capital[0],
                    population: res.data.population,
                    flag: res.data.flags.png
                }
                setData(newData)
                setFound(true)
            })
            .catch(error => setFound(false))
    }, [name])
  
    return {
        data,
        found
    }
}