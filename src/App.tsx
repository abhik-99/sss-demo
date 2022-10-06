import React, { FormEvent } from 'react';
import './App.css';
const sss = require('shamirs-secret-sharing')


function App() {
  const [walletSeed, setWalletSeed] = React.useState<string>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted", walletSeed)
    const secret = Buffer.from(walletSeed)
    const shares = sss.split(secret, { shares: 10, threshold: 4 })
    const stringShares: string[] = [];
    shares.forEach( (share:Uint8Array) => {
      stringShares.push(share.join("//"))
    })
    
    console.log("Shares", shares);
    console.log("String shares", stringShares);

    const properShare: Uint8Array[] = [];
    stringShares.forEach(share => {
      properShare.push(Uint8Array.from(share.split("//").map( x => parseInt(x))))
    })

    console.log("From String Shares", properShare);

    console.log(shares[0].toString())

    const recovered = sss.combine(shares.slice(3, 7))
    console.log("Recovered", recovered.toString()) // 'secret key'

    const recovered2 = sss.combine(properShare.slice(3,7));
    console.log(recovered2.toString())
  }
  return (
    <div className="App">
      <main className="App-body">
        <h2>Shamir Secret Sharing Demo</h2>
        <form onSubmit={handleSubmit}>
        <input className="form__input" type="text" placeholder='Enter Secret' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletSeed(e.target.value)}/>
        <button type="submit" className='button-32'>
          Create Shards
        </button>
        </form>
      </main>
    </div>
  );
}

export default App;
