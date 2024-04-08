import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SolletWalletAdapter,PhantomWalletAdapter,TokenPocketWalletAdapter,  } from '@solana/wallet-adapter-wallets';
import * as Linking from "expo-linking";

import { SolanaMobileWalletAdapter,createDefaultAddressSelector,createDefaultAuthorizationResultCache,createDefaultWalletNotFoundHandler } from '@solana-mobile/wallet-adapter-mobile';

import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';

// require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const deeplink = async () => {
  const url = "https://phantom.app/ul/v1/connect";
  window.open(url, "_self");

};
const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
      () => [
          new SolanaMobileWalletAdapter({
              addressSelector: createDefaultAddressSelector(),
              appIdentity: {
                  name: 'phantomseparate',
                  uri: 'https://phantom.app/ul/v1/connect',
                  icon: 'relative/path/to/icon.png',
              },
              authorizationResultCache: createDefaultAuthorizationResultCache(),
              chain: WalletAdapterNetwork.Devnet,
              onWalletNotFound: createDefaultWalletNotFoundHandler(),
          }),
          new TokenPocketWalletAdapter(),
          new PhantomWalletAdapter(),
          new SolletWalletAdapter(),
      ],
      [],
  );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    return (
        <div className="App">
            <WalletMultiButton />
            <button onClick={deeplink}>HitMe</button>
        </div>
    );
};
