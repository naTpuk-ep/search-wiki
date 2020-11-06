import {useEffect, useState} from 'react'
import axios from 'axios'

export const useSearch = (value) => {
	const [state, setState] = useState({
		articles: [],
		status: 'IDLE',
		error: ''
	})

	useEffect(() => {
    axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${value}`)
      .then(function (response) {
        const items = [];
        let data = response.data[1];
        if (Array.isArray(data)) {
          response.data[1].forEach((item, i) => {
            items.push({
              id: response.data[3][i], 
              label: item
            })
          })
        }
        setState({
					articles: items,
					status: 'SUCCESS',
					error: ''
				})
        // console.log(items);
      })
      .catch(function (error) {
				setState({
					articles: [],
					status: 'SUCCESS',
					error: ''
				})
      })
	}, [value])
	
	return state
}