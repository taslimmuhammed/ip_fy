import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNoToInt, HexToDateString } from "./convertions";


export const BlockFunctions = {
    storage: new ThirdwebStorage({
        clientId: "d38b4842e9d041746be46984e4baab53", // You can get one from dashboard settings
    }),
    uploadToIPFS: async (Files, Name, Creator, Description) => {
        if (Files == null) return null;
        if (Files == null) return alert("No files selected")
        try {

            const uri = await BlockFunctions.storage?.upload(
                {
                    name: Name,
                    creator: Creator,
                    descreption: Description,
                    time: Date.now(),
                    files: Files,
                }
            )
            return uri;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getIPData: async (ip) => {
        try {
            let data = await BlockFunctions.storage.downloadJSON(ip.uri);
            data.currentOwner = ip.currenOwner
            data.id = ip.id
            data.selling = ip.selling
            data.lending = ip.lending
            data.lendingPrice = BigNoToInt(ip.lendingPrice)
            data.price = BigNoToInt(ip.price)
            console.log({ ip });
            data.sellingPrice = BigNoToInt(ip.sellingPrice)
            data.date = HexToDateString(ip.time)
            return data;
        } catch (e) {
            return null
        }

    },
    getHistory: async (ip) => {
        try {
            let ipfsData = await BlockFunctions.storage.downloadJSON(ip.uri);
            // data.currentOwner = ip.currenOwner
            // data.date = HexToDateString(ip.time)
            let data = { name: ipfsData.name };
            let owningHistory = [];
            const ownings = ip.owningHistory.length
            if (ip.owningHistory) {
                for (let i = ownings - 1; i >= 0; i--) {
                    const e = ip.owningHistory[i];
                    let temp = {}
                    temp.wallet = e.wallet
                    temp.start = HexToDateString(e.start)
                    temp.end = HexToDateString(e.end)
                    temp.amount = BigNoToInt(e.amount)
                    owningHistory.push(temp)
                }
            }
            const startDate = ownings ? HexToDateString(ip.owningHistory[ownings - 1].end) : HexToDateString(ip.time);
            owningHistory.push({
                wallet: ip.currenOwner,
                start: startDate,
                end: "current",
                amount: '---'
            })
            let lendingHistory = [];
            if (ip.lendingHistory) {
                for (let i = ip.lendingHistory.length - 1; i >= 0; i--) {
                    const e = ip.lendingHistory[i];
                    let temp = {}
                    temp.wallet = e.wallet
                    temp.start = HexToDateString(e.start)
                    temp.end = HexToDateString(e.end)
                    temp.amount = BigNoToInt(e.amount)
                    lendingHistory.push(temp)
                }
            }
            data.owningHistory = owningHistory
            data.lendingHistory = lendingHistory
            console.log({ data });
            return data;
        } catch (e) {
            return null
        }
    },
    
}