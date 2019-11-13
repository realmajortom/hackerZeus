import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './components/Nav';
import Reader from './components/Reader';
import List from './components/List';
import API from './api/API';

const reqs = {
  item: 'item/',
  updates: 'updates.json',
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const useMount = mount => useEffect(mount, []);


export default function App() {
  const [items, setItems] = useState([]);
  const [itemIDs, setItemIDs] = useState([]);
  const [loadCount, setLoadCount] = useState(30);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(null);
  const [listType, setListType] = useState();


  const loadItems = async (first, data) => {
    let itemsInRange = first === 0 ? [] : items;
    let count = first + loadCount < data.length ? loadCount : data.length;

    for (let i = first; i < count; i++) {
      await API.get(`${reqs['item']}${data[i]}.json`).then(res => {
        if (res.data !== null) {
          itemsInRange.push(res.data);
        }
      });
    }

    setItems(itemsInRange);
    setLoading(false);
  }


  const requestIDs = (req) => {
    setLoading(true);
    setListType(req);

    API.get(`${reqs[req]}`).then(res => {
      if (res.data.length > 0) {
        setItemIDs(res.data);
        loadItems(0, res.data);
      } else {
        setLoading(false);
        alert('Error getting data from server');
      }
    });
  }


  useMount(() => requestIDs('new'));

  return (
    <div className="App">
      <Nav makeReq={requestIDs} />
      <List loading={loading} items={items} setReader={setReading} type={listType} />
      <Reader data={reading} />
    </div>
  );
}
