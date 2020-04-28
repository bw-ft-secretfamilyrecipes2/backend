const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/db-config');

describe('recipesRouter', () => {
    beforeEach(async () => {
        await db('recipes').truncate();
    })

    describe('GET /', () => {
        it('should return 200 OK', function () {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});

// describe('POST /:id/steps', function () {
//     beforeEach(async () => {
//         await db('recipes').truncate();
//     })

//     it('return 201 on success', function () {
//         return request(server)
//             .post('/:id/steps')
//             .send({ 
//                 recipe_id: 1,
//                 stepNum: 4,
//                 stepInstruction: 'take out the shumai'
//             })
//             .then(res => {
//                 expect(res.status).toBe(201);
//             });
//     });
// })