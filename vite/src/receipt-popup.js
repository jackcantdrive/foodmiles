// import { DAppKitUI } from '@vechain/dapp-kit-ui';

// const walletConnectOptions = {
//      // Create your project here: https://cloud.walletconnect.com/sign-up
//     projectId: '<PROJECT_ID>',
//     metadata: {
//         name: 'My dApp',
//         description: 'My dApp description',
//         // Your app URL
//         url: window.location.origin, 
//         // Your app Icon
//         icons: [`${window.location.origin}/images/my-dapp-icon.png`], 
//     },
// };

// const vechainWalletKitOptions = {
//     // Required - The URL of the node to connect to
//     node: 'https://testnet.vechain.org/', 
//     // Optional - "main" | "test" | Connex.Thor.Block
//     network: 'test', 
//     // Optional - Wallet connect options
//     walletConnectOptions, 
//     // Optional - Defaults to false. If true, the account and source will be persisted in local storage
//     usePersistence: true, 
// };

// const dappKit = DAppKitUI.configure(vechainWalletKitOptions);

// const {thor, vendor, wallet, modal} = DAppKitUI

// console.log(`DAppKit configured`, dappKit.thor.genesis.id);



import { DAppKitUI } from '@vechain/dapp-kit-ui';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div class="container">
//             <h2>Vanilla JS</h2>
//             <div class="label">kit button:</div>
//             <vdk-button></vdk-button>
//             <div class="label">custom button:</div>
//             <button id="custom-button">Connect Custom Button</button>
//         </div>
// `;

const walletConnectOptions = {
    projectId: 'a0b855ceaf109dbc8426479a4c3d38d8',
    metadata: {
        name: 'Sample VeChain dApp',
        description: 'A sample VeChain dApp',
        url: window.location.origin,
        icons: [`${window.location.origin}/images/logo/my-dapp.png`],
    },
};

const vechainDAppKitOptions = {
    nodeUrl: 'https://testnet.vechain.org/',
    genesis: 'test',
    walletConnectOptions,
    usePersistence: true,
};

DAppKitUI.configure(vechainDAppKitOptions);

// custom button configuration

const customButton = document.getElementById('custom-button');

if (customButton) {
    customButton.addEventListener('click', () => {
        DAppKitUI.modal.open();
    });

    const handleConnected = (address) => {
        if (address) {
            const formattedAddress = `${address.slice(0, 6)}...${address.slice(
                -4,
            )}`;
            customButton.innerText = `Disconnect from ${formattedAddress}`;
        } else {
            customButton.innerText = 'Connect Custom Button';
        }
    };

    handleConnected(DAppKitUI.wallet.state.address);

    DAppKitUI.modal.onConnectionStatusChange(handleConnected);
}




const video = document.getElementById('webcam');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });
} else {
    console.error("getUserMedia not supported by this browser.");
}

// receiptPopup.classList.add('receiptPopupIn')

// receiptPopup.classList.remove('receiptPopupIn')