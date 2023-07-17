import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const ownerPublicKey = "narfn77NVRRfa4frg1KZykyFrJ1f9eMGnzXeMn2ja1X";

function App() {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const owner = new PublicKey(ownerPublicKey);

      const programAccounts = await connection.getProgramAccounts(owner, {
        commitment: "confirmed",
      });

      const nfts = programAccounts.map((account) => {
        const data = Buffer.from(account.account.data);

        // Extract the required information from the account data
        const image = "YOUR_IMAGE_URI";
        const mintAddress = "YOUR_MINT_ADDRESS";
        const tokenAddress = account.pubkey.toBase58();

        return { image, mintAddress, tokenAddress };
      });

      const firstThreeNFTs = nfts.slice(0, 3);
      setNFTs(firstThreeNFTs);
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>My NFTs</h1>
      {nfts.map((nft, index) => (
        <div key={index}>
          <img src={nft.image} alt="NFT" />
          <p>Mint Address: {nft.mintAddress}</p>
          <p>Token Address: {nft.tokenAddress}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
