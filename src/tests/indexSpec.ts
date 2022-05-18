import supertest from 'supertest';
import app from '../index';
import fs from 'fs';

const endpoint = supertest(app);

describe('Test if the endpoints', () => {
  it('Test endpoint get / (not found page)', async (): Promise<void> => {
    const response = await endpoint.get('/');
    expect(response.status).toBe(404);
  });

  it('Test endpoint get /api/image (no parameters)', async (): Promise<void> => {
    const response = await endpoint.get('/api/image');

    //first time get 200 status code and if re-request will get redirect 304 code status
    expect([200, 304]).toContain(response.status);
  });

  it('Test endpoint get /api/image/?filename=image1 (image already exist)', async (): Promise<void> => {
    const response = await endpoint.get('/api/image/?filename=image1');

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image/?filename=image20 (image not exist)', async (): Promise<void> => {
    const response = await endpoint.get('/api/image/?filename=image20');

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image/?filename=image1&width=600&height=600 (thumb already exist)', async (): Promise<void> => {
    const response = await endpoint.get(
      '/api/image/?filename=image1&width=600&height=600'
    );

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image?filename=image5&width=600&height=600 (thumb created)', async () => {
    const response = await endpoint.get(
      '/api/image/?filename=image5&width=600&height=600'
    );

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image/?filename=image1&width=-600&height=600 (invalid width less than 1)', async (): Promise<void> => {
    const response = await endpoint.get(
      '/api/image/?filename=image1&width=-600&height=600'
    );

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image/?filename=image1&width=600&height=-600 (invalid height less than 1)', async (): Promise<void> => {
    const response = await endpoint.get(
      '/api/image/?filename=image1&width=600&-height=600'
    );

    expect(response.status).toBe(200);
  });

  it('Test endpoint get /api/image/?filename=image1&width=123456789&height=123456789 (very big width and height)', async (): Promise<void> => {
    const response = await endpoint.get(
      '/api/image/?filename=image1&width=123456789&height=123456789'
    );

    expect(response.status).toBe(200);
  });

  //delete the new file created by test
  afterAll((): void => {
    const path = 'src/public/thumb/image5_600-600.jpg';
    try {
      fs.accessSync(path);
      fs.unlinkSync(path);
    } catch {
      console.log('something went wrong in deleting the test image :(');
    }
  });
});
