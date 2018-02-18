
import { expect } from 'chai';
import { Person } from '../person';

describe.skip('Person', () => {
    let p: Person;

    beforeEach(() => {
        p = new Person();
    });

    it('constructor() creates a Person with properties as expected', () => {
        // expect(p.name).to.equal('Bob');
        // expect(p.age).to.equal(31);
    })

    it('greet() returns a greeting', () => {
        // expect(p.getGreeting()).to.equal('Hi Bob');
    })

})
