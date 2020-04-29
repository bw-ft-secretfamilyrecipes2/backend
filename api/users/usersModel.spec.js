const Users = require('./usersModel');

const db = require('../../data/db-config');

describe('users model', function() {
    describe('test environment', function() {
        it('should run test', function() {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('findById()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('finds user by id', async function() {
            await Users.add(
                {
                    id: 3,
                    username: 'Billy123',
                    password: 'Billy123'
                }
            );
            await Users.add(
                {
                    id: 4,
                    username: 'Sally123',
                    password: 'Sally123'
                }
            );
            await Users.add(
                {
                    id: 5,
                    username: 'Willy123',
                    password: 'Willy123'
                }
            );
            await Users.add(
                {
                    id: 6,
                    username: 'Sam123',
                    password: 'Sam123'
                }
            );
            const users = await db('users');

            expect(users).toHaveLength(4);

            const user = await Users.findById(3)
                expect(user).toEqual(
                    {
                        id: 3,
                        username: 'Billy123',
                        password: 'Billy123'
                    }
                );
        })
    })
})