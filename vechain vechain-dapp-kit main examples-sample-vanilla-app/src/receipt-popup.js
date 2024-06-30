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
