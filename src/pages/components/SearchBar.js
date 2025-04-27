import React, { useState,  useRef } from 'react';
import { obj } from '../../data/products';
import { debounce } from '../utils/Functions';

export default function SearchBar({chooseSuggest }) {
    const [suggest, setSuggest] = useState([]);
 const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
     const [showSuggest, setShowSuggest] = useState(false);


    const handleSearchChange = e => {
        setSearch(e.target.value);
        debounced(e.target.value);
    };
    const debounced = useRef(
        debounce(val => {
            if (!val) {
                setShowSuggest(false);
                return;
            }
            const filtered = obj.results
                .map((p, i) => ({ ...p, originalIndex: i }))
                .filter(p =>
                    p.productName.toLowerCase().includes(val.toLowerCase())
                );
            setSuggest(filtered);
            setShowSuggest(filtered.length > 0);
        }, 300)
    ).current;
    const handleSearchKey = e => {
        if (e.key === 'Enter') {
            if (!search) {
                setSelected(null);
            } else {
                const index = obj.results.findIndex(
                    p => p.productName.toLowerCase() === search.toLowerCase()
                );
                if (index !== -1) setSelected(index);
            }
            setShowSuggest(false);
        }
    };
    return (
      <div className='search-bar-container'>
            <input
            
                type="text"
                placeholder="Search"
                value={search}
                className='search-bar'
                onChange={handleSearchChange}
                onFocus={() => {
                    if (!search) {
                        setShowSuggest(false);
                    } else if (suggest.length > 0) {
                        setShowSuggest(true);
                    }
                }}
                onKeyDown={handleSearchKey}
                tabIndex="0"
            />
            <div
                id="suggestion-container"
                style={{ display: showSuggest ? 'block' : 'none' }}
            >
                {suggest.map((p, i) => (
                    <div
                        key={i}
                        className="suggestion"
                        tabIndex="0"
                        onMouseDown={() => {
                            chooseSuggest(p.originalIndex);
                            setSearch(p.productName);
                            setShowSuggest(false);
                        }}
                        onKeyDown={e =>
                            e.key === 'Enter' && chooseSuggest(p.originalIndex)
                        }
                    >
                        {p.productName}
                    </div>
                ))}
            </div>

        </div>
    );
}
