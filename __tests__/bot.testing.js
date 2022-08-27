const client = require('../src/bot');

describe('testing users', () => {
    test('gettting users account age', () => {
        const accountAge = client.users.fetch("createdAt", { force: true });

        expect(accountAge).toequal
    })
});