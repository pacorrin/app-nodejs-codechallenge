import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 10 },  // scale up to 10 users
        { duration: '1m', target: 300 },  // scale up to 300 users
        { duration: '1m', target: 1200 },  // scale up to 1200 users
        { duration: '2m', target: 2400 },  // scale up to 2400 users
        { duration: '1m', target: 0 },  // scale down to 0 users
    ]
};

export default function () {
    //get random values
    let randomValue = http.get('http://localhost:3000/transactions/random');
    let randomValueJson = JSON.parse(randomValue.body);
    let response = http.post('http://localhost:3000/graphql', JSON.stringify({
        query: `
            mutation createTransaction($input: CreateTransactionInput!) {
                createTransaction(createTransactionInput: $input)
            }
        `,
        variables: {
            input: randomValueJson
        }
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    check(response, {
        'is status 200': (r) => r.status === 200,
    });

    sleep(1);  // Pausa de 1 segundo entre iteraciones
}