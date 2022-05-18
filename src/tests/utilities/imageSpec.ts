import fs from 'fs';
import {
  checkIfImageExist,
  getAllImagesNames,
  checkIfThumbExist,
  createThumbedImage,
} from '../../routes/utilities/image';

describe('Test all image functions', () => {
  const filename = 'image1'; //check full folder
  const fakeFile = 'fakeName';
  const query = { filename: 'image1', width: '150', height: '150' }; //check thumb folder
  const fakeQuery = { filename: 'FakeName', width: '150', height: '150' }; //check thumb folder

  it('Test image existence in full folder (TRUE FILE)', () => {
    const result = checkIfImageExist(filename);

    expect(result).toBeTruthy();
  });

  it('Test image existence in full folder (FAKE FILE)', () => {
    const result = checkIfImageExist(fakeFile);

    expect(result).toBeFalsy();
  });

  it('Test thumb existence in thumb folder (TRUE FILE)', () => {
    const result = checkIfThumbExist(query);

    expect(result).toBeTruthy();
  });

  it('Test image existence in thumb folder (FAKE FILE)', () => {
    const result = checkIfThumbExist(fakeQuery);

    expect(result).toBeFalsy();
  });

  it('Test to get all the images in full foler', () => {
    const results = getAllImagesNames();

    expect(results).toEqual(['image1', 'image2', 'image3', 'image4', 'image5']);
  });

  it('Test if the thumb will be created', async () => {
    const result = await createThumbedImage({
      filename: 'image5',
      width: '600',
      height: '600',
    });

    expect(result.type).toBe('success');
  });

  it('Test if the thumb will (NOT) be created if the width or heigh are very big', async () => {
    const result = await createThumbedImage({
      filename: 'image5',
      width: '60000000',
      height: '60000000',
    });

    expect(result.type).toBe('error');
  });
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
