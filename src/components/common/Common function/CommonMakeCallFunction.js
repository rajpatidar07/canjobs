export default function CommonMakeCallFunction(phoneNumber) {
    
    // The key is the value stored in the 'phoneNumber' variable passed in
    // It must be the full E.164 number, e.g., '+918001234567'
    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber;

    if (window.RCAdapter) {
        window.postMessage({
            type: "rc-adapter-new-call",
            phoneNumber: formattedPhoneNumber,
            toCall: true 
        }, "*");
    } else {
        alert("RingCentral adapter not loaded yet!");
    }
}
