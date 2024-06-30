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

const {thor, vendor, wallet, modal} = DAppKitUI

// console.log(wallet)

// const foo = async () => {
//     const res = await wallet.connect();
//     console.log(res);
// }

// foo();

const handleConnected = (address) => {
    if (address) {
        console.log(address);
        // const formattedAddress = `${address.slice(0, 6)}...${address.slice(
        //     -4,
        // )}`;
        // console.log(`Disconnect from ${formattedAddress}`);
    }
    //  else {
    //     console.log('Connect Custom Button');
    // }
};

handleConnected(DAppKitUI.wallet.state.address);

DAppKitUI.modal.onConnectionStatusChange(handleConnected);



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


const webcam = document.getElementById('webcam');
const receiptPopup = document.getElementById('receiptPopup');

const handleClick = () => {
    receiptPopup.classList.toggle('receiptPopupIn');
    if (!receiptPopup.classList.contains('receiptPopupIn')) {
        setTimeout(() => {
            receiptPopup.classList.remove('loading');
        }, 400);
    } else {
        receiptPopup.textContent = 'Claim 2 LOCL';
    }
}

webcam.addEventListener('click', handleClick);

receiptPopup.addEventListener('click', () => {
    receiptPopup.classList.add('loading');

    // take snapshot of webcam
    const canvas = document.createElement('canvas');
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);

    const imageFile = canvas.toDataURL('image/jpeg', 0.8);
    const userAddress = DAppKitUI.wallet.state.address;
    const productId = 6;

    const formData = new FormData();
    formData.append('id', productId);
    formData.append('userAddress', userAddress);

    const imageAsBase64 = imageFile.split(',')[1];
    console.log('imageAsBase64', imageAsBase64);

    formData.append('imageAsBase64', imageAsBase64);

    fetch('http://localhost:8555/verify', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.verified) {
                receiptPopup.textContent = 'Receipt verified successfully!';
            } else {
                if (data.failedVerificationMessage) {
                    receiptPopup.textContent = data.failedVerificationMessage;
                }

                if (data.creditErrorMessage) {
                    receiptPopup.textContent = data.creditErrorMessage;
                }

                if (data.internalMessage) {
                    receiptPopup.textContent = 'Failed to verify receipt. Please try again.'
                }
            }
            receiptPopup.classList.remove('loading');
            setTimeout(() => {
                receiptPopup.classList.remove('receiptPopupIn');
            }, 1300);
        })
        .catch(error => {
            console.error('Error verifying receipt:', error);
            receiptPopup.classList.remove('receiptPopupIn');
        });

})