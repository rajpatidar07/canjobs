// import RingCentral from '@ringcentral/sdk';

// const rc = new RingCentral({
//     server: "https://platform.ringcentral.com ",
//     clientId: "9t2AIV4YWaqfqLm2YOgaTV",
//     clientSecret: "cKraPGnDZ82cTvMQ3dmkUNYWEhvEImjxpcZP6ibr0uSv",
// });
// const platform = rc.platform();

// const CallFunctionRIngCentral = async (phoneNumber) => {
//     try {
//         await platform.login({
//             username: "sham@canpathways.com",
//             password: "Dolphin@23",
//             extension: "101",
//         });

//         const resp = await platform.post('/restapi/v1.0/account/~/extension/~/call-out', {
//             from: { phoneNumber: '+18883445886' },
//             to: { phoneNumber: phoneNumber },
//         })
//         console.log(resp)
//         alert('Call initiated!');
//     } catch (err) {
//         console.log(err)
//     }
//     // try {
//     //   await rc.authorize({
//     //     username: "sham@canpathways.com",
//     //     password: "Dolphin@23",
//     //     extension: "101",
//     //   });
//     //   await rc.post('/restapi/v1.0/account/~/extension/~/call-out', {
//     //     from: { phoneNumber: '+18883445886' },
//     //     to: { phoneNumber: phoneNumber },
//     //   });
//     //   alert('Call initiated!');
//     // } catch (e) {
//     //   console.error(e);
//     //   alert('Error making call.');
//     // };
// };

// export default CallFunctionRIngCentral;