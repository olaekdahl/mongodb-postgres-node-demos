const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db = client.db('test');

async function connect(showInfo) {
    try{
        await client.connect().then(e=>{ showInfo ? console.log(e) : null });
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function getAllSales() {
    try {
        const salesCollection = db.collection('sales');
        await salesCollection.find().toArray().then(data => console.log(data));
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

async function getSaleItem(item) {
    try {
        const filter = { item: item };
        const salesCollection = db.collection('sales');
        await salesCollection.find(filter).toArray().then(data => console.log(data));
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

async function getSaleItemById(id) {
    try {
        const filter = id;
        const salesCollection = db.collection('sales');
        await salesCollection.find(filter).toArray().then(data => console.log(data));
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

async function insertSaleItem(newItem) {
    try {
        const salesCollection = db.collection('sales');
        return await salesCollection.insertOne(newItem);
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

async function updateSaleItem(item, update) {
    try {
        const filter = {item: item};
        const data = {$set: {price: update}}
        const salesCollection = db.collection('sales');
        await salesCollection.updateOne(filter, data).then(status => console.log(status));
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

async function deleteSaleItem(item) {
    try {
        const filter = {item: item};
        const salesCollection = db.collection('sales');
        await salesCollection.deleteOne(filter).then(status => console.log(status));
    } catch (error) {
        console.error(error);
        return error;
    } finally {
        await client.close();
    }
}

connect();
// getAllSales();
// getSaleItem('abc');
const newItem = { 'item': 'NEW', 'price': 10, 'quantity': 200, 'date': new Date('2014-03-01T08:00:00Z') };

// (async () => { 
//     insertSaleItem(newItem).then(status => {
//         id = status.insertedId;
//         console.log(status);
//         connect();
//         getSaleItemById(id);
//     });
// })();

const filter = 'abc', data = 100;
// updateSaleItem(filter, data);
deleteSaleItem(filter);
