import React, {useState, useEffect, useCallback} from 'react';
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
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(null);
  const [loadCount, setLoadCount] = useState(localStorage.getItem('count') ? localStorage.getItem('count') : 30);
  const [loadingMore, setLoadingMore] = useState(false);


  const loadItems = useCallback(async (data, newList) => {
    let itemsInRange = [];
    let count = loadCount < data.length ? loadCount : data.length;

    for (let i = 0; i < count; i++) {
      await API.get(`${reqs['item']}${data[i]}.json`).then(res => {
        if (res.data !== null) {
          itemsInRange.push(res.data);
        }
      });
    }

    if (items.length < 1 || newList === true) {
      setItems(itemsInRange);
      setLoading(false);
    } else {
      let allItems = await items.concat(itemsInRange);
      setItems(allItems);
      setLoadingMore(false);
    }
  }, [items, loadCount]);


  const getIDs = (listType) => {
    setLoading(true);

    API.get(`${reqs[listType]}`).then(res => {
      if (res.data.length > 0) {
        setItemIDs(res.data);
        loadItems(res.data, true);
      } else {
        setLoading(false);
        alert('Error getting data from server');
      }
    });
  };


  const loadMore = () => {
    setLoadingMore(true);
    loadItems(itemIDs.slice(items.length), false);
  };


  useMount(() => getIDs('top'));


  return (
    <div className="App">

      <Nav makeReq={getIDs} setCount={setLoadCount} />

      <List
        loading={loading}
        items={items}
        setReader={setReading}
        load={loadMore}
        loadingMore={loadingMore}
      />

      <Reader data={reading} />

    </div>
  );
}
