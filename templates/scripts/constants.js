

export const main = document.querySelector('.main');

export const container = document.createElement('div');
export const design = document.createElement('div');
export const login = document.createElement('div');
export const title = document.createElement('h3');
export const textInput1 = document.createElement('div');
export const userIcon = document.createElement('img');
export const usernameInput = document.createElement('input');
export const textInput2 = document.createElement('div');
export const lockIcon = document.createElement('img');
export const passwordInput = document.createElement('input');
export const loginButton = document.createElement('button');
export const head = document.querySelector('header')


export const query = `
query{
        user {
            id
            login
            email
            firstName
            lastName
            auditRatio
            totalDown
            totalUp
        }
        level:transaction(
            where: {
                type: { _eq: "level" },
                path: { _like: "%/dakar/div-01%" }
            }
            order_by:{ 
                amount: desc
            }
            limit:1
        ){
            amount
        }
        xpTotal: transaction_aggregate(
            where: {
                type: {_eq: "xp"}, 
                eventId: {_eq: 56}
            }
        ){
            aggregate {
                sum {
                    amount
                }
            }
        }
        skills: transaction(
            order_by: {
                type: asc, 
                createdAt: desc,
                amount:desc
            }
            distinct_on: [type]
            where: {
                eventId: {_eq: 56}, 
                _and: {type: {_like: "skill_%"}}
            }
        ){
            type
            amount
        }
        xp: transaction(
            order_by: {amount: desc}
            where: {
              type: {_eq: "xp"}
              eventId: {_eq: 56}
              path: { _nlike: "%/dakar/div-01/checkpoint%" }
            }
        ){
            amount
            path
        }
    }
`;




export async function getToken(username, password) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encryptage(credentials);

    const response = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erreur lors de la récupération du token : ${errorMessage}`);
    }

    const data = await response.json();
    return data;
}

export function encryptage(cred){
    const encode = new TextEncoder();
    const encoded = encode.encode(cred);
    let result = '';
    encoded.map(el => result += String.fromCharCode(el));
    return btoa(result)
}