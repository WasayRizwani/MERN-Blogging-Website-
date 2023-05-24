import React from 'react'
import {useEffect,useState} from 'react'
import {GetCrypto} from '../api/external'
import styles from './pagesStyling/Crypto.module.css'

export default function Crypto() {
    const [crypto,setCrypto]=useState([]);
    useEffect( ()=>{
        (async function getCrypto (){ 
            let crypto1=await GetCrypto() ;
            setCrypto(crypto1);
        })();
        // getCrypto();
        setCrypto([]);
        // console.log("hello1",crypto)
    },[]) 




  return (
    <div> 
        <h1>Crypto Currencies</h1>
        <div className={styles.cryptoWrapper}>
          {/* Make Table */}
            <table className={styles.cryptoTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                        <th>Price Change</th>
                    </tr>
                </thead>
                <tbody>
                    {crypto.map((coin)=>(
                        <tr key={coin.id}>
                            <td>
                                <div className={styles.cryptoContainer}>
                                    <img src={coin.image} alt="crypto"/>
                                    <span>{coin.name}</span>
                                </div>
                            </td>
                            <td>{coin.symbol}</td>
                            <td>${coin.current_price}</td>
                            <td>${coin.market_cap.toLocaleString()}</td>
                            <td>${coin.total_volume.toLocaleString()}</td>
                            <td>{coin.price_change_percentage_24h<0?
                            (<p className={styles.red}>{coin.price_change_percentage_24h.toFixed(2)}%</p>):
                            (<p className={styles.green}>{coin.price_change_percentage_24h.toFixed(2)}%</p>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            </div>
    </div>
  )
}
