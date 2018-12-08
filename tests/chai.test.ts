import * as testData from '../src/Test'
import { expect } from 'chai'

describe('Test chai', () => {
	it('should be true' , () => {
		expect(testData.result).to.be.equal(true)
	})
})
