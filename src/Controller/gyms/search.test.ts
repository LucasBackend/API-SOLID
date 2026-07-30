import {expect,describe,it,beforeAll,afterAll} from 'vitest';
import request from 'supertest';
import {app} from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gym (e2e)', ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it('should be able to search gym',async ()=>{
        const {token} = await createAndAuthenticateUser(app,true)        

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '119999999',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: 'TypeScript Gym',
            description: 'Some description',
            phone: '119999999',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const response = await request(app.server)
        .get('/gyms/search')
        .query({
            q: 'JavaScript'
        })
        .set('Authorization',`Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
             })
        ])
        
       
    })
})