

// const express = require('express');
// const app = express();
// const cors = require('cors');

// const { Client } = require('xrpl'); 

// app.use(cors());


// app.get('/generateWallet', async (req, res) => {
//     const api = new Client("wss://s.altnet.rippletest.net:51233");
//     try {
//         await api.connect();
//         const fundedWallet = await api.fundWallet();
        
//         // Close connection after done
//         api.disconnect();

//         res.status(200).send({
//             message: "Wallet generated successfully!",
//             walletAddress: fundedWallet.wallet.address,
//             amount: fundedWallet.balance,
//         });
//     } catch (error) {
//         // Close connection in case of errors
//         if (api.isConnected()) {
//             api.disconnect();
//         }

//         res.status(500).send({
//             message: "Error generating wallet!",
//             error: error
//         });
//     }
// });

// // Start the server on port 8000
// app.listen(8000, () => {
//     console.log('Server is running on http://localhost:8000');
// });