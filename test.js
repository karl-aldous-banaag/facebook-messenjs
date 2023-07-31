const crypto = require('crypto');

// ä
// Hash gotten: aa3d5e25195e304ca23151c47d57cc033e0b4f4ab13bc7d9087a9ec25674cc42
// Hash calculated: 3a5dd79e64603bf44fefa18ec4bb8ee26ce054894c08be914922a7ce74503ef7

const reqBodyA = `{"object":"page","entry":[{"id":"104729508847954","time":1690801366848,"messaging":[{"sender":{"id":"5060032247406641"},"recipient":{"id":"104729508847954"},"timestamp":1690801360057,"message":{"mid":"m_B10F296TPJx-E46yUT7-w85J_NWotd2sLvbWV9BZaTQqNAgv8IFeK8zei7Ny7bzZaE8-qgc7EkhvPUHBBU5wsQ","text":"\\u00e4"}}]}]}`;
// console.log(reqBodyA);

// Thumbs up emoji
// Hash gotten: f3cdbf2e121c5ec16699297e8b77d15788cb9dbaff2535f446de66ce960f01e3
// Hash calculated: 3ceb9bc2e13f2b1a116bbe099c6542c1b2e860e75b2bfa0ad25dc254fb172026

const reqBodyT = `{"object":"page","entry":[{"id":"104729508847954","time":1690769980578,"messaging":[{"sender":{"id":"5060032247406641"},"recipient":{"id":"104729508847954"},"timestamp":1690768082853,"message":{"mid":"m_5eVQ_WQPOycoCddlYiN9Oc5J_NWotd2sLvbWV9BZaTRKBokQerU7zwVIfFvpq13R4HFzGQb68DJQ06aG15OoWQ",` + 
`"text":"\\u1f44d"}}]}]}`

let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const testFunc = () => {
    for (ln2 in letters) {
        for (ln1 in letters) {
            for (l0 in letters) {
                for (l1 in letters) {
                    for (l2 in letters) {
                        for (l3 in letters) {
                            let testHex = letters[ln2] + letters[ln1] + letters[l0] + letters[l1] + letters[l2] + letters[l3]
                            const reqBodyT = `{"object":"page","entry":[{"id":"104729508847954","time":1690769980578,"messaging":[{"sender":{"id":"5060032247406641"},"recipient":{"id":"104729508847954"},"timestamp":1690768082853,"message":{"mid":"m_5eVQ_WQPOycoCddlYiN9Oc5J_NWotd2sLvbWV9BZaTRKBokQerU7zwVIfFvpq13R4HFzGQb68DJQ06aG15OoWQ",` + 
                                `"text":"\\u${testHex}"}}]}]}`
                            const testHash = crypto
                                .createHmac("sha256", "5108a5c57664bdf8355aa93093952c1f")
                                .update(reqBodyT)
                                .digest("hex");
                            console.log(testHex);
                            if (testHash === "f3cdbf2e121c5ec16699297e8b77d15788cb9dbaff2535f446de66ce960f01e3") {
                                console.log("WE FOUND THE TEXT HEX");
                                console.log(testHex);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
}

// testFunc();

const test = crypto
    .createHmac("sha256", "5108a5c57664bdf8355aa93093952c1f")
    .update(reqBodyT)
    .digest("hex");

console.log(test);