// __mocks__/axios.js

const mockAxios = {
    get: jest.fn(() => Promise.resolve({ data: [{ _id: '1', name: 'John', age: 30 }] })),
};

export default mockAxios;  