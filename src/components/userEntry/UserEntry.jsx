import React, { useState, useEffect, useRef } from 'react'
import './userEntry.css'

const UserEntry = () => {
    const [cache, setCache] = useState();
    const [insideCache, setInsideCache] = useState();
    const [key, setKey] = useState('');
    const [val, setVal] = useState('');
    const [result, setResult] = useState('');
    const keyRef = useRef();
    const valRef = useRef();
    const capacity = 3;

    useEffect(() => {
        setCache(new Map());
    }, []);

    const handleGet = () => {
        if (!key) return keyRef.current.focus();

        if (!cache.has(key)) return setResult(-1);

        let value = cache.get(key);
        cache.delete(key);
        cache.set(key, value);
        setResult(value);
        setVal('');
        handleCache();
    }

    const handleDelete = () => {
        if (!key) return keyRef.current.focus();
        if (!cache.has(key)) return setResult(-1);

        cache.delete(key);
        setResult('');
        setVal('');
        setKey('');
        handleCache();
    }

    const handlePut = () => {
        if (!key) return keyRef.current.focus();
        if (!val) return valRef.current.focus();

        cache.delete(key);

        if (cache.size === capacity) {
            cache.delete(cache.keys().next().value);
            cache.set(key, val);
        } else {
            cache.set(key, val);
        }
        setResult('');
        handleCache();
    }

    const handleCache = () => {
        let obj = {};
        cache.forEach(item => {
            let key = Array.from(cache.keys()).find(k => cache.get(k) === item);
            let value = item;
            obj[key] = value;
        })

        let objReverse = Object.keys(obj).reverse();
        let outStr = ''
        for (var item in objReverse) {
            outStr = outStr + `, ${objReverse[item]} => ${obj[objReverse[item]]}`;
        }

        setInsideCache(outStr.substring(2));
        console.log(outStr);
    }


    return (
        <div className='ue'>
            <div className="ue-wrapper">
                <div className="ue-input-wrapper">
                    <input ref={keyRef} type="text" className="ue-input" placeholder='key' value={key} onChange={e => setKey(e.target.value)} />
                    <input ref={valRef} type="text" className="ue-input" placeholder='value' value={val} onChange={e => setVal(e.target.value)} />
                </div>
                <div className="ue-button-wrapper">
                    <button className="ue-button" onClick={handleGet}>Get</button>
                    <button className="ue-button" onClick={handlePut}>Put</button>
                    <button className="ue-button" onClick={handleDelete}>Delete</button>
                </div>
                <div className="ue-results-wrapper">
                    <input type="text" className="ue-result" placeholder='Results' value={result} />
                    <textarea rows={5} value={insideCache} className="ue-textarea" />
                </div>
            </div>
        </div>
    )
}

export default UserEntry
