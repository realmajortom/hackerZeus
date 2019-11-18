import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Reader from './components/reader/Reader';
import List from './components/feed/List';
import API from './dataHelpers/hnAPI';
import reqs from './dataHelpers/hnReqs'


const storedFontSize = localStorage.getItem('fontSize');
const storedCount = localStorage.getItem('count');
const storedFont = localStorage.getItem('font');

const useMount = mount => useEffect(mount, []);


export default function App() {
  const [font, setFont] = useState(storedFont ? storedFont : "'Open Sans', sans-serif");
  const [fontSize, setFontSize] = useState(storedFontSize ? storedFontSize : '12');
  const [loadCount, setLoadCount] = useState(storedCount ? storedCount : '30');
  const [agent, setAgent] = useState('desktop');

  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(null);
  const [prevID, setPrevID] = useState(null);
  const [itemIDs, setItemIDs] = useState([]);
  const [items, setItems] = useState([]);


  const loadItems = useCallback(async (data, newList) => {
    let itemsInRange = [];
    let count = loadCount < data.length ? loadCount : data.length;

    for (let i = 0; i < count; i++) {
      await API.get(`item/${data[i]}.json`).then(res => {
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


  useEffect(() => {
    if (fontSize < 1 || fontSize > 100) {
      alert('What on earth...');
      localStorage.setItem('fontSize', 12);
      setFontSize(11);
    } else {
      localStorage.setItem('fontSize', fontSize);
    }
  }, [fontSize]);


  useEffect(() => {

    if (prevID && prevID !== reading.id) {
      let prevItem = document.getElementById(prevID);
      if (prevItem) { // Check that prevItem is still loaded in the DOM
        prevItem.classList.remove('ListItemReading');
      }
    }

    if (reading) {
      let newItem =  document.getElementById(reading.id);
      if (newItem) {
        newItem.classList.add('ListItemReading');
      }
      setPrevID(reading.id);
    }

  }, [reading, prevID]);


  useMount(() => getIDs('top'));


  return (
    <div className="App">

      <Nav
        makeReq={getIDs}
        setCount={setLoadCount}
        setFont={setFont}
        updateAgent={setAgent}
        decFont={() => setFontSize(fontSize - 1)}
        incFont={() => setFontSize(Number(fontSize) + 1)}
      />

      <List
        loading={loading}
        items={items}
        setReader={setReading}
        load={loadMore}
        loadingMore={loadingMore}
      />

      <Reader
        data={reading}
        font={font}
        fontSize={fontSize}
        agent={agent}
      />

    </div>
  );
};
