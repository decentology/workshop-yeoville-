import React, { createContext, FC } from "react";
import {
  WalletConnectConnector,
  defaultChains,
  InjectedConnector,
  Provider as WagmiProvider,
} from "wagmi";
type EthereumContext = {};
const Context = createContext<EthereumContext>({});
Context.displayName = "EthereumContext";

const Provider: FC<any> = ({ children, ...props }) => {
  const infuraId = props.infuraId || "fb9f66bab7574d70b281f62e19c27d49";

  // Chains for connectors to support
  const chains = defaultChains;

  const connectors = ({ chainId }: { chainId?: number }) => {
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
          rpc: {
            1: `https://rinkeby.infura.io/v3/${infuraId}`,
          },
        },
      }),
    ];
  };
  return (
    <Context.Provider value={{}}>
      <WagmiProvider connectors={connectors}>{children}</WagmiProvider>
    </Context.Provider>
  );
};

export default { Context, Provider };