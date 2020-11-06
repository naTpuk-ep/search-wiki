import React, {useState, useEffect} from 'react'
import ReactAutocomplete from 'react-autocomplete'
import axios from 'axios'

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
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
        setItems(items);
        // console.log(items);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [value])


  return (
    <ReactAutocomplete
      items={items}
      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.label}
      renderItem={(item, highlighted) =>
        <div
          key={item.id}
          style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
        >
          {item.label}
        </div>
      }
      value={value}
      onChange={e => setValue(e.target.value)}
      onSelect={value => setValue(value)}
    />
  )
}

export default App;
