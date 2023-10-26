import * as csvService from './csvService';

describe('csvService', () => {
  const head = ['Name', 'Surname', 'Age'];
  const body = [
    ['John', 'Doe', '28'],
    ['Robert', 'Armstrong', '33']
  ];

  describe('prepareForCsv', () => {
    it('should return valid csv formatted string', () => {
      expect(csvService.prepareForCsv(head, body)).toBe(
        'Name,Surname,Age\n"John","Doe","28"\n"Robert","Armstrong","33"'
      );
    });
  });
});
